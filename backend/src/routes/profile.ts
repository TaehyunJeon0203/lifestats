import { Router } from 'express';
import { pool } from '../db';
import { calculateLifeStats } from '../utils/statsCalculator';
import { StatsResponse } from '../types/Stats';

const router = Router();

// POST /api/profile - 프로필 생성
router.post('/', async (req, res) => {
    try {
        console.log('🔍 받은 데이터:', req.body);
        
        const { name, gender, dateOfBirth, sleepHours, coffeeIntake } = req.body;

        // 입력값 검증
        if (!name || !gender || !dateOfBirth || sleepHours === undefined || coffeeIntake === undefined) {
            return res.status(400).json({ 
                success: false,
                error: '모든 필드는 필수입니다. (이름, 성별, 생년월일, 수면시간, 카페인 섭취량)' 
            });
        }

        let formattedDate = dateOfBirth;
        if (dateOfBirth instanceof Date || typeof dateOfBirth === 'object') {
            formattedDate = new Date(dateOfBirth).toISOString().split('T')[0]; // YYYY-MM-DD 형식
        }


        // 데이터베이스에 저장
        const [result] = await pool.execute(
            `INSERT INTO profiles (name, gender, date_of_birth, sleep_hours, coffee_intake) 
             VALUES (?, ?, ?, ?, ?)`,
            [
                name, 
                gender, 
                formattedDate,
                sleepHours, 
                coffeeIntake
            ]
        );

        console.log('✅ 프로필 저장 성공!');

        res.status(201).json({
            success: true,
            message: '프로필이 저장되었습니다!',
            data: { 
                id: (result as any).insertId,
                name,
                gender,
                formattedDate,
                sleepHours: sleepHours,
                coffeeIntake: coffeeIntake
            }
        });

    } catch (error: any) {
        console.error('❌ 프로필 저장 실패:', error);
        
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ 
                success: false,
                error: '이미 존재하는 사용자명입니다.' 
            });
        }

        res.status(500).json({ 
            success: false,
            error: '프로필 저장 중 오류가 발생했습니다.' 
        });
    }
});

// GET /api/profile - 모든 프로필 조회
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM profiles ORDER BY created_at DESC');
        
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('❌ 프로필 조회 실패:', error);
        res.status(500).json({ 
            success: false,
            error: '프로필 조회 중 오류가 발생했습니다.' 
        });
    }
});


router.get('/:id/stats', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute('SELECT name, date_of_birth, sleep_hours, coffee_intake FROM profiles WHERE id = ?', [id]) as any[];
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, error: '프로필을 찾을 수 없습니다.' });
        }
        
        const profile = rows[0];
        const lifeStats = calculateLifeStats({
            dateOfBirth: profile.date_of_birth,
            sleepHours: profile.sleep_hours,
            coffeeIntake: profile.coffee_intake
        });

        const birthDate = new Date(profile.date_of_birth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        const response: StatsResponse = {
            success: true,
            data: lifeStats,
            profile: {
                name: profile.name,
                dateOfBirth: profile.date_of_birth,
                age: age
            }
        };

        res.json(response);
        
    } catch (error) {
        console.error('❌ 라이프 통계 조회 실패:', error);
        res.status(500).json({ success: false, error: '라이프 통계 조회 중 오류가 발생했습니다.' });
    }
});

export default router;
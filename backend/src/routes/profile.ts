import express from 'express';
import { pool } from '../db';
import { Profile } from '../types/Profile';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// 프로필 생성
router.post('/', async (req, res) => {
  const profile: Profile = req.body;
  profile.share_token = uuidv4().split('-')[0]; // 간단 토큰

  try {
    const [result] = await pool.query(
      `INSERT INTO profiles(name, age, gender, birthdate, account_created, last_played, total_assets, share_token)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        profile.name,
        profile.age,
        profile.gender,
        profile.birthdate,
        profile.account_created,
        profile.last_played,
        profile.total_assets,
        profile.share_token
      ]
    );
    res.json({ ...profile, id: (result as any).insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send('DB Error');
  }
});

// 프로필 조회 (토큰)
router.get('/:token', async (req, res) => {
  const token = req.params.token;
  try {
    const [rows] = await pool.query(`SELECT * FROM profiles WHERE share_token = ?`, [token]);
    res.json(rows[0] || null);
  } catch (err) {
    console.error(err);
    res.status(500).send('DB Error');
  }
});

export default router;
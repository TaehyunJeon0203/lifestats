import { Router } from 'express';
import profileRouter from './profile';

const router = Router();

// Profile 라우터 연결
router.use('/profile', profileRouter);

// 나중에 추가될 라우터들
// router.use('/users', userRouter);
// router.use('/stats', statsRouter);

export default router;
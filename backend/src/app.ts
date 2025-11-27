import express from "express";
import cors from "cors";
import { pool, initializeDatabase } from "./db";
import routes from "./routes";

const app = express();

// 미들웨어 설정
app.use(cors({
    origin: 'http://localhost:5173', // Vite 개발 서버
    credentials: true
}));
app.use(express.json()); // JSON 파싱 (중요!)

// API 라우터 연결
app.use('/api', routes);

// 기본 라우트 (서버 상태 확인)
app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS currentTime");
    res.json({
        message: "LifeStats API Server is running!",
        dbTime: rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("DB connection error");
  }
});

// 서버 시작
const startServer = async () => {
    const dbReady = await initializeDatabase();
    
    if (dbReady) {
        app.listen(3000, () => {
            console.log("🚀 Server running on port 3000");
            console.log("📊 Profile API: http://localhost:3000/api/profile");
        });
    } else {
        console.error('❌ Database 초기화 실패');
    }
};

startServer();
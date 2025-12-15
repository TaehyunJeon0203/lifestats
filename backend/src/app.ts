import express from "express";
import cors from "cors";
import { pool, initializeDatabase } from "./db";
import routes from "./routes";

const app = express();

// 임시: 모든 origin 허용 (테스트용)
app.use(cors({
    origin: true,  // 모든 origin 허용
    credentials: true
}));

app.use(express.json());

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

const PORT = Number(process.env.PORT) || 3000;

// 서버 시작
const startServer = async () => {
    const dbReady = await initializeDatabase();
    
    if (dbReady) {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log("📊 Profile API ready");
        });
    } else {
        console.error('❌ Database 초기화 실패');
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};

startServer();
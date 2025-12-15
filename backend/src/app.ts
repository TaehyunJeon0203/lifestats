import express from "express";
import cors from "cors";
import { pool, initializeDatabase } from "./db";
import routes from "./routes";

const app = express();

// CORS 설정 - 모든 Vercel 도메인 허용
app.use(cors({
    origin: function(origin, callback) {
        // 허용할 도메인 목록
        const allowedOrigins = [
            'http://localhost:5173',
            'http://172.20.10.2:5173',
            'https://lifestats-sepia.vercel.app'
        ];
        
        // origin이 없거나 (서버 간 통신), 허용 목록에 있거나, vercel.app으로 끝나면 허용
        if (!origin || allowedOrigins.includes(origin) || (origin && origin.endsWith('.vercel.app'))) {
            callback(null, true);
        } else {
            // 거부할 때는 false만 전달 (Error 객체 대신)
            callback(null, false);
        }
    },
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
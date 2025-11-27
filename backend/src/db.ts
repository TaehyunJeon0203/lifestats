import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'lifestats',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    
    // 외래 키 체크 비활성화
    await connection.execute(`SET FOREIGN_KEY_CHECKS = 0`);
    
    // 기존 테이블들 삭제 (의존성 순서대로)
    await connection.execute(`DROP TABLE IF EXISTS items`);
    await connection.execute(`DROP TABLE IF EXISTS profiles`);
    
    // 외래 키 체크 재활성화
    await connection.execute(`SET FOREIGN_KEY_CHECKS = 1`);
    
    // profiles 테이블 생성
    await connection.execute(`
      CREATE TABLE profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        gender VARCHAR(50) NOT NULL,
        date_of_birth DATE NULL,
        sleep_hours INT DEFAULT 7,
        coffee_intake INT DEFAULT 2,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // items 테이블 재생성 (필요시)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profile_id INT,
        name VARCHAR(100) NOT NULL,
        quantity INT DEFAULT 1,
        value DECIMAL(10,2) DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
      )
    `);
    
    console.log('✅ Profiles table ready');
    console.log('✅ Items table ready');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return false;
  }
};
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'lifestats',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    console.log(`📍 DB Host: ${process.env.DB_HOST}`);
    
    const isProduction = process.env.NODE_ENV === 'production';
    
    // ⚠️ 프로덕션에서는 테이블을 삭제하지 않음!
    if (!isProduction) {
      console.log('🔄 Development mode: Dropping and recreating tables...');
      await connection.execute(`SET FOREIGN_KEY_CHECKS = 0`);
      await connection.execute(`DROP TABLE IF EXISTS items`);
      await connection.execute(`DROP TABLE IF EXISTS profiles`);
      await connection.execute(`SET FOREIGN_KEY_CHECKS = 1`);
    } else {
      console.log('✅ Production mode: Tables will be created if not exist');
    }
    
    // profiles 테이블 생성
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        gender VARCHAR(50) NOT NULL,
        date_of_birth DATE NULL,
        sleep_hours INT DEFAULT 7,
        coffee_intake INT DEFAULT 2,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    // items 테이블 생성
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profile_id INT,
        name VARCHAR(100) NOT NULL,
        quantity INT DEFAULT 1,
        value DECIMAL(10,2) DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
        INDEX idx_profile_id (profile_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
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
import pool from "../config/db.js";

const createUserTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE,
      mobile_number VARCHAR(15) UNIQUE ,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_details (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      username VARCHAR(50) UNIQUE,
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      parents_name VARCHAR(50),
      mobile_number VARCHAR(15) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      standard VARCHAR(20),
      school VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(queryText);
  console.log("✅ Users table created.");
};

export default createUserTables;
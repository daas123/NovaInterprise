import pool from "../config/db.js";
const createFlatTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS flats (
      id SERIAL PRIMARY KEY,
      flat_number VARCHAR(20) NOT NULL UNIQUE,
      owner_id INTEGER REFERENCES users(id),
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  await pool.query(queryText);
  console.log("✅ Flats table created.");
};

export default createFlatTable;
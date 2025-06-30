import pool from "../config/db.js";

const createYearlyExpenceTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS yearly_expense_summary (
      id INT PRIMARY KEY,
      year INT UNIQUE NOT NULL,
      total_amount NUMERIC DEFAULT 0,
      generated_at TIMESTAMP DEFAULT NOW()
    );
  `;
  await pool.query(queryText);
  console.log("✅ Yearly Expense Summary table created.");
};


export default createYearlyExpenceTable
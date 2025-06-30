import pool from "../config/db.js";
const createMonthlyExpenceTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS monthly_expense_records (
      id INT PRIMARY KEY,
      year INT NOT NULL,
      month INT NOT NULL CHECK (month >= 1 AND month <= 12),
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(year, month)
    );
  `;
  await pool.query(queryText);
  console.log("✅ Monthly Expense Records table created.");
};
export default createMonthlyExpenceTable;
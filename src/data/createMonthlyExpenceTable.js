import pool from "../config/db.js";
const createMonthlyExpenceTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS monthly_expense_groups (
      id SERIAL PRIMARY KEY,
      month DATE NOT NULL,
      total_amount NUMERIC DEFAULT 0,
      created_by INTEGER REFERENCES users(id),
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE (month)
    );
  `;
  await pool.query(queryText);
  console.log("✅ Monthly Expense Groups table created.");
};
export default createMonthlyExpenceTable;
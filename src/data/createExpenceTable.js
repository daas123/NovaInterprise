import pool from "../config/db.js";
const createExpenceTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      group_id INTEGER NOT NULL REFERENCES monthly_expense_groups(id) ON DELETE CASCADE,
      title VARCHAR(100) NOT NULL,
      amount NUMERIC NOT NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  await pool.query(queryText);
  console.log("✅ Expenses table created.");
};

export default createExpenceTable;
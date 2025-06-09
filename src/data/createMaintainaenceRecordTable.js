import pool from "../config/db.js";

const createMaintainaenceRecordTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS maintenance_records (
      id SERIAL PRIMARY KEY,
      flat_id INTEGER NOT NULL REFERENCES flats(id) ON DELETE CASCADE,
      group_id INTEGER NOT NULL REFERENCES monthly_expense_groups(id) ON DELETE CASCADE,
      amount_due NUMERIC NOT NULL,
      amount_paid NUMERIC DEFAULT 0,
      payment_date TIMESTAMP,
      penalty NUMERIC DEFAULT 0,
      is_paid BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(flat_id, group_id)
    );
  `;
  await pool.query(queryText);
  console.log("✅ Maintenance Records table created.");
};

export default createMaintainaenceRecordTable;
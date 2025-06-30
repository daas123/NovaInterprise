import pool from "../config/db.js";
export const createExpenceTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      amount NUMERIC NOT NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  await pool.query(queryText);
  console.log("✅ Expenses table created.");
};

export const createExpenseMonthYearTrigger = async () => {
  const triggerFunction = `
    CREATE OR REPLACE FUNCTION set_month_year()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.month_year := TO_CHAR(NEW.created_at, 'MM-YYYY');
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;

  const trigger = `
    CREATE TRIGGER trg_set_month_year
    BEFORE INSERT ON expenses
    FOR EACH ROW
    EXECUTE FUNCTION set_month_year();
  `;

  try {
    await pool.query(triggerFunction);
    await pool.query(trigger);
    console.log("✅ Trigger to auto-set month_year created.");
  } catch (error) {
    console.error("❌ Error creating trigger:", error);
  }
};

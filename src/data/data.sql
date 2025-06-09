CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)

CREATE TABLE IF NOT EXISTS flats (
      id SERIAL PRIMARY KEY,
      flat_number VARCHAR(20) NOT NULL UNIQUE,
      owner_id INTEGER REFERENCES users(id),
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS monthly_expense_groups (
      id SERIAL PRIMARY KEY,
      month DATE NOT NULL,
      total_amount NUMERIC DEFAULT 0,
      created_by INTEGER REFERENCES users(id),
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE (month)
    );

CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      group_id INTEGER NOT NULL REFERENCES monthly_expense_groups(id) ON DELETE CASCADE,
      title VARCHAR(100) NOT NULL,
      amount NUMERIC NOT NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );

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
import pool from "../config/db.js";

const createCommentsTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS comments (
        id BIGSERIAL PRIMARY KEY,
        post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
        user_id INT REFERENCES users(id) NOT NULL,
        content TEXT,
        type VARCHAR(20) CHECK (type IN ('text','question','answer')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_deleted BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS comment_media (
        id BIGSERIAL PRIMARY KEY,
        comment_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
        media_type VARCHAR(10) CHECK (media_type IN ('image','video','file')),
        media_url TEXT NOT NULL,
        sequence INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(queryText);
  console.log("✅Comments tables created.");
};

export default createCommentsTable;

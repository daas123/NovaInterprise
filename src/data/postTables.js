import pool from "../config/db.js";

const createPostTables = async () => {
  const queryText = `

    CREATE TABLE IF NOT EXISTS posts (
        id BIGSERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        subject VARCHAR(100),
        topic VARCHAR(100),
        type VARCHAR(20) CHECK (type IN ('question','discussion','announcement')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_deleted BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS post_media (
        id BIGSERIAL PRIMARY KEY,
        post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
        media_type VARCHAR(10) CHECK (media_type IN ('image','video','file')),
        media_url TEXT NOT NULL,
        sequence INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_saved_posts (
        id BIGSERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) NOT NULL,
        post_id BIGINT REFERENCES posts(id) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, post_id)
    );

    CREATE INDEX idx_user_saved_posts_user_id ON user_saved_posts(user_id);
    CREATE INDEX idx_user_saved_posts_post_id ON user_saved_posts(post_id);

  `;
  await pool.query(queryText);
  console.log("✅ Post table created.");
};

export default createPostTables;
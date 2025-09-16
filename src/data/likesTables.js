import pool from "../config/db.js";


const createLikesTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS post_likes (
        id BIGSERIAL PRIMARY KEY,
        post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
        user_id INT REFERENCES users(id) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(post_id, user_id)  -- prevent duplicate likes by same user
    );

    CREATE INDEX idx_post_likes_post_id ON post_likes(post_id);
    CREATE INDEX idx_post_likes_user_id ON post_likes(user_id);


    CREATE TABLE IF NOT EXISTS comment_likes (
        id BIGSERIAL PRIMARY KEY,
        comment_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
        user_id INT REFERENCES users(id) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(comment_id, user_id)  -- prevent duplicate likes by same user
    );

    CREATE INDEX idx_comment_likes_comment_id ON comment_likes(comment_id);
    CREATE INDEX idx_comment_likes_user_id ON comment_likes(user_id);
    
  `;
  await pool.query(queryText);
  console.log("✅Post Likes table created.");
};

export default createLikesTable;

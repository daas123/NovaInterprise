import pool from "../config/db.js";

// REGISTER USER
export const registerUserService = async (email,phone,password,username) => {
    const result = await pool.query("INSERT INTO users(email,phone,password_hash,username) VALUES($1,$2,$3,$4) RETURNING *",[email,phone,password,username]);
    return result;
}

// LOGIN USER
export const loginUserService = async (email,password) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1 AND password_hash = $2",[email, password]);
    if (!result) {
        throw new Error("Invalid email or password");
    }

    if (!result || !result.rows || result.rows.length === 0) {
        return null; // let the controller handle it
    }
    
    return result.rows[0];
}

// UserDetails

export const profileDetailsService = async (user_id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1",[user_id]);
     if (!result) {
        throw new Error("Something Went Wrong at Profile Service");
    }
    return result.rows[0] || null;
}
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

export const getAllUsersService = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows
}

export const getUsersByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM users where id = $1",[id]);
    return result.rows[0];
}

export const createUserService = async (name,email) => {
    const result = await pool.query("INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *",[name,email]);
    return result.rows[0];
}

export const updateUserService = async (id,name,email) => {
    const result = await pool.query("UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",[name,email,id]);
    return result.rows[0];
}

export const deleteUserService = async (id) => {
     const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *",[id]);
    return result.rows[0];
}
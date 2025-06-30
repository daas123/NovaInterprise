import pool from "../config/db"

export const getExpenceDetails = async (expenceMonth_id,expenceYear_id) => {

}

export const addExpenceDetails = async (expenceMonth_id,expenceTitle,expenceAmount,expenceNotes) => {
    const result = await pool.query(
        "INSERT INTO expenses (month_id,title,amount,notes) VALUES ($1,$2,$3,$4) RETURNING *",[expenceMonth_id,expenceTitle,expenceAmount,expenceNotes]
    );
    return result.rows[0];
}

export const editExpenceDetails = async (id,expenceTitle,expenceAmount,expenceNotes) => {
    const result = await pool.query(
        "UPDATE expenses SET title = $1 ,amount = $2 ,notes = $3 WHERE month_id == $4 RETURNING *" [expenceTitle,expenceAmount,expenceNotes,id]
    );
    return result.rows[0];
}


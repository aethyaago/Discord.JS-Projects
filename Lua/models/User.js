const { pool } = require("../database");

class User {
    static async findOne(userId) {
        const [rows] = await pool.execute("SELECT * FROM users WHERE userId = ?", [userId]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async create(userId) {
        await pool.execute("INSERT INTO users (userId) VALUES (?)", [userId]);
    }

    static async update(userId, field, value) {
        await pool.execute(`UPDATE users SET ${field} = ? WHERE userId = ?`, [value, userId]);
    }

    static async getTopUsers() {
        const [rows] = await pool.execute("SELECT * FROM users ORDER BY rp DESC LIMIT 5");
        return rows;
    }
}

module.exports = User;

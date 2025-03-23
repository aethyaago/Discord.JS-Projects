const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'not my user here too',
    password: 'my password is not here haha',
    database: 'lua_bot',
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0
});

async function connectDB() {
    try {
        await pool.getConnection();
        console.log("✅ Conectado ao MySQL com sucesso!");
    } catch (error) {
        console.error("🔴 Erro ao conectar ao MySQL:", error);
    }
}

module.exports = { pool, connectDB };

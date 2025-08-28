// db.js
require('dotenv').config(); // Carrega as variáveis do .env
const { Pool } = require('pg');

// Cria o pool de conexões usando a URL do .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // necessário para Supabase
  }
});

// Função para testar a conexão
async function testarConexao() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conexão funcionando! Hora do servidor:', res.rows[0].now);
  } catch (err) {
    console.error('Erro ao conectar:', err.message);
  } finally {
    await pool.end();
  }
}

// Exporta o pool para usar em outros arquivos
module.exports = { pool, testarConexao };

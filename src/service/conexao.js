import 'dotenv/config';
import mysql from 'mysql2/promise';

// Cria o pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0
});

// Executa um ping automático para testar a conexão e exibir a mensagem
try {
  await pool.getConnection();
  console.log('🚀 Conexão com o banco de dados MySQL estabelecida com sucesso!');
} catch (erro) {
  console.error('❌ Erro crítico ao conectar no MySQL:', erro.message);
}

export default pool;

import pg from "pg";

const { Pool} = pg;

// Импортируем переменные окружения
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;

// Создаём пул подключений
const pool = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS,
});

export default pool;

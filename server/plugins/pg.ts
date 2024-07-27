import pg from 'pg'

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 5432,
  password: process.env.DB_PASS
})

export const withPG = async (event: any, func: (dbClient: pg.PoolClient) => {}) => {
  const client = await pool.connect()
  const result = func.call(this, client)
  client.release()
  return result
}

export default defineNitroPlugin(async (nitro) => {
  await pool.connect()

  nitro.hooks.hookOnce("close", async () => {
    await new Promise<void>((resolve) => pool.end(() => resolve()))
    console.log("db connection closed")
  })
})
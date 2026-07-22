import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host:               process.env.DB_HOST || 'localhost',
  port:               Number(process.env.DB_PORT) || 3306,
  user:               process.env.DB_USER,
  password:           process.env.DB_PASS,
  database:           process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit:    10,
  charset:            'utf8mb4',
  timezone:           '-03:00',
})

export default {
  dialect: 'mysql',

  async all(sql, params = []) {
    const [rows] = await pool.query(sql, params)
    return rows
  },

  async get(sql, params = []) {
    const [rows] = await pool.query(sql, params)
    return rows[0] || null
  },

  async run(sql, params = []) {
    const [r] = await pool.query(sql, params)
    return { insertId: r.insertId, affectedRows: r.affectedRows }
  },

  async upsertSettings(entries) {
    if (!entries.length) return
    const sql = 'INSERT INTO site_settings (`key`,`value`) VALUES ? ON DUPLICATE KEY UPDATE `value`=VALUES(`value`)'
    await pool.query(sql, [entries.map(([k, v]) => [k, String(v)])])
  },
}

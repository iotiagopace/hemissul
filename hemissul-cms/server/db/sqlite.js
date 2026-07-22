// Adapter SQLite (libsql) — funciona com Turso (DB_URL=libsql://...)
// ou banco local em arquivo (DB_URL=file:./hemissul.db).
import { createClient } from '@libsql/client'

const client = createClient({
  url:       process.env.DB_URL || 'file:./hemissul.db',
  authToken: process.env.DB_TOKEN || undefined,
})

// Crases (`) → identificadores entre aspas duplas (compatível com SQLite)
const norm = q => q.replace(/`([^`]+)`/g, '"$1"')

export default {
  dialect: 'sqlite',

  async all(sql, params = []) {
    const r = await client.execute({ sql: norm(sql), args: params })
    return r.rows.map(row => ({ ...row }))
  },

  async get(sql, params = []) {
    const r = await client.execute({ sql: norm(sql), args: params })
    return r.rows[0] ? { ...r.rows[0] } : null
  },

  async run(sql, params = []) {
    const r = await client.execute({ sql: norm(sql), args: params })
    return {
      insertId: Number(r.lastInsertRowid ?? 0) || null,
      affectedRows: r.rowsAffected ?? 0,
    }
  },

  async upsertSettings(entries) {
    if (!entries.length) return
    for (const [k, v] of entries) {
      await client.execute({
        sql: 'INSERT INTO site_settings ("key","value") VALUES (?,?) ON CONFLICT("key") DO UPDATE SET "value"=excluded."value", updated_at=CURRENT_TIMESTAMP',
        args: [k, String(v)],
      })
    }
  },
}

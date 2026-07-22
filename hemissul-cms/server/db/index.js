// Driver selector. Interface única expõe:
//   db.all(sql, params)     → array de rows
//   db.get(sql, params)     → row única ou null
//   db.run(sql, params)     → { insertId, affectedRows }
//   db.upsertSettings(arr)  → upsert key/value específico
//   db.dialect              → 'mysql' | 'postgres' | 'sqlite'
//
// Em todos os drivers, use `?` como placeholder. Para Postgres,
// o adapter traduz automaticamente para `$1, $2, ...`.

import 'dotenv/config'

const driver = (process.env.DB_DRIVER || 'mysql').toLowerCase()

let db
if (driver === 'mysql')         db = (await import('./mysql.js')).default
else if (driver === 'postgres') db = (await import('./postgres.js')).default
else if (driver === 'supabase') db = (await import('./postgres.js')).default
else if (driver === 'sqlite')   db = (await import('./sqlite.js')).default
else if (driver === 'turso')    db = (await import('./sqlite.js')).default
else throw new Error(`DB_DRIVER inválido: ${driver}. Use mysql | postgres | supabase | sqlite | turso`)

console.log(`✓ Banco de dados: ${db.dialect}`)

export default db

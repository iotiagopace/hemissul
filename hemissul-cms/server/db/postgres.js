// Adapter Postgres — funciona com Supabase (use a connection string do "Connection Pooling").
// String de conexão em DB_URL ou variáveis DB_HOST/DB_USER/DB_PASS/DB_NAME/DB_PORT.
import postgres from 'postgres'

const sql = process.env.DB_URL
  ? postgres(process.env.DB_URL, { prepare: false, max: 10 })
  : postgres({
      host:     process.env.DB_HOST,
      port:     Number(process.env.DB_PORT) || 5432,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      max:      10,
      prepare:  false,
    })

// Converte placeholders `?` → `$1, $2, ...`
// Atenção: não usar `?` literal dentro de strings nos queries do CMS.
function toPg(q) {
  let i = 0
  return q.replace(/\?/g, () => `$${++i}`)
    // troca crases por aspas duplas (identificadores)
    .replace(/`([^`]+)`/g, '"$1"')
}

// Acrescenta RETURNING id em INSERTs (para obter insertId)
function withReturning(q) {
  return /^\s*INSERT/i.test(q) && !/RETURNING/i.test(q) ? `${q} RETURNING id` : q
}

export default {
  dialect: 'postgres',

  async all(query, params = []) {
    return await sql.unsafe(toPg(query), params)
  },

  async get(query, params = []) {
    const rows = await sql.unsafe(toPg(query), params)
    return rows[0] || null
  },

  async run(query, params = []) {
    const q = withReturning(toPg(query))
    const rows = await sql.unsafe(q, params)
    return {
      insertId: rows[0]?.id ?? null,
      affectedRows: rows.count ?? rows.length ?? 0,
    }
  },

  async upsertSettings(entries) {
    if (!entries.length) return
    // upsert linha a linha — simples e barato pra ~20 chaves
    for (const [k, v] of entries) {
      await sql.unsafe(
        'INSERT INTO site_settings ("key","value") VALUES ($1,$2) ON CONFLICT ("key") DO UPDATE SET "value"=EXCLUDED."value", updated_at=CURRENT_TIMESTAMP',
        [k, String(v)]
      )
    }
  },
}

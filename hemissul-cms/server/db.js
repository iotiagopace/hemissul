// Re-export do driver selecionado (mysql | postgres/supabase | sqlite/turso).
// A escolha é feita pela env DB_DRIVER, dentro de ./db/index.js
export { default } from './db/index.js'

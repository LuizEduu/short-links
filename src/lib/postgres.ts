import postgres from 'postgres'

const sql = postgres(
  'postgresql://docker:dockerpostgres@localhost:5432/shortlinks',
)

export { sql }

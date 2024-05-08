import { Connection } from 'mysql2/promise'
import { getMigrations } from './migrations'
import { getMigrationHistory } from './getMigrationHistory'

export const executeMigrations = async (mysqlConnection: Connection) => {
  if (process.env.ENV === 'dev') {
    console.log('📢 Skipping migrations in dev mode 📢')
    return
  }
  console.log('⏳ Executing db migrations...')

  const migrations = getMigrations(mysqlConnection)
  const migrationHistory = await getMigrationHistory(mysqlConnection)

  for (const migration of migrations) {
    if (migrationHistory.has(migration.name)) continue

    await migration.up()
    await mysqlConnection.query(`INSERT INTO migration_history (name) VALUES ('${migration.name}')`)
    console.log(`✅ Migration executed : ${migration.name}`)
  }

  console.log('🚀 Migrations executed')
}

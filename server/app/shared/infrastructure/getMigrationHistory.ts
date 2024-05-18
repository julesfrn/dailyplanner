import { Connection, RowDataPacket } from 'mysql2/promise'

interface MigrationHistoryElement extends RowDataPacket {
  name: string
}

export const getMigrationHistory = async (mysqlConnection: Connection): Promise<Set<string>> => {
  const migrationHistoryTable = 'migration_history'

  mysqlConnection.query(
    `CREATE TABLE IF NOT EXISTS ${migrationHistoryTable} (name VARCHAR(255) PRIMARY KEY)`
  )
  const [executedMigrations] = await mysqlConnection.query<MigrationHistoryElement[]>(
    `SELECT * FROM ${migrationHistoryTable}`
  )

  return new Set(executedMigrations.map((migration) => migration.name))
}

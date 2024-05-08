import { Connection } from 'mysql2/promise'

export abstract class AbstractMigration {
  constructor(protected readonly mysqlConnection: Connection) {}

  abstract name: string

  abstract up(): Promise<void>

  abstract down(): Promise<void>
}

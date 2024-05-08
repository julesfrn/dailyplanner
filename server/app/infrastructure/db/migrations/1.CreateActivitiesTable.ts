import { AbstractMigration } from '../AbstractMigration'

export class CreateActivitiesTable extends AbstractMigration {
  name = 'create-activities-table'

  async up(): Promise<void> {
    await this.mysqlConnection.query(
      `CREATE TABLE activities (id VARCHAR(255) PRIMARY KEY, text VARCHAR(255) NOT NULL)`
    )
  }

  async down(): Promise<void> {
    await this.mysqlConnection.query(`DROP TABLE activities`)
  }
}

import { AbstractMigration } from '../AbstractMigration'

export class CreateEventsTable extends AbstractMigration {
  name = 'create-events-table'

  async up(): Promise<void> {
    await this.mysqlConnection.query(
      `CREATE TABLE events (
        id VARCHAR(36) PRIMARY KEY,
        activity_id VARCHAR(36) NOT NULL,
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP NOT NULL,
        is_done BOOLEAN NOT NULL,
        FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
      )`
    )
  }

  async down(): Promise<void> {
    await this.mysqlConnection.query(`DROP TABLE activities`)
  }
}

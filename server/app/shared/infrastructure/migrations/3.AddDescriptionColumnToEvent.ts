import { AbstractMigration } from '../AbstractMigration'

export class AddDescriptionColumnToEvent extends AbstractMigration {
  name = 'add-description-column-to-event'

  async up(): Promise<void> {
    await this.mysqlConnection.query(`ALTER TABLE events ADD description TEXT`)
  }

  async down(): Promise<void> {
    await this.mysqlConnection.query(`REMOVE COLUMN description FROM events`)
  }
}

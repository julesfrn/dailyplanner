import { Connection as MysqlConnection } from 'mysql2/promise'
import { ActivityDTO } from './dtos/ActivityDTO'
import { Activity } from '../domain/Activity'

export class MySQLActivityDataSource {
  constructor(private connection: MysqlConnection) {}

  private readonly tableName = 'activities'

  async getActivities(): Promise<ActivityDTO[]> {
    const [rows] = await this.connection.query<ActivityDTO[]>(`SELECT * FROM ${this.tableName}`)

    return rows
  }

  async createOne(activity: Activity): Promise<void> {
    await this.connection.execute(`INSERT INTO ${this.tableName} (id, name) VALUES (?, ?)`, [
      activity.id,
      activity.name
    ])
  }

  async deleteOne(id: string): Promise<void> {
    await this.connection.execute(`DELETE FROM ${this.tableName} WHERE id = ?`, [id])
  }
}

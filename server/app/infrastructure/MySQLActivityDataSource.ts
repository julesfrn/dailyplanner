import { Connection as MysqlConnection } from 'mysql2/promise'
import { ActivityDTO } from './dtos/ActivityDTO'

export class MySQLActivityDataSource {
  constructor(private connection: MysqlConnection) {}

  private readonly tableName = 'activities'

  async getActivities(): Promise<ActivityDTO[]> {
    const [rows] = await this.connection.query<ActivityDTO[]>(`SELECT * FROM ${this.tableName}`)

    return rows
  }
}

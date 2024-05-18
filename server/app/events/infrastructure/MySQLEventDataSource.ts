import { Connection as MysqlConnection } from 'mysql2/promise'
import { Event } from '../domain/Event'
import { EventDTO } from './dtos/EventDTO'

export class MySQLEventDataSource {
  constructor(private connection: MysqlConnection) {}

  private readonly tableName = 'events'

  async createOne(event: Event): Promise<void> {
    await this.connection.execute(
      `INSERT INTO ${this.tableName}
        (id, activity_id, start_date, end_date, is_done)
        VALUES (?, ?, ?, ?, ?)
      `,
      [event.id, event.activityId, event.startDate, event.endDate, event.isDone]
    )
  }

  async deleteOne(eventId: string): Promise<void> {
    await this.connection.execute(`DELETE FROM ${this.tableName} WHERE id = ?`, [eventId])
  }

  async findOne(eventId: string): Promise<EventDTO | null> {
    const [rows] = await this.connection.execute<EventDTO[]>(`SELECT * FROM ${this.tableName} WHERE id = ?`, [eventId])
    return rows[0] || null
  }

  async updateOne(event: Event): Promise<void> {
    await this.connection.execute(
      `UPDATE ${this.tableName}
        SET start_date = ?, end_date = ?, is_done = ?
        WHERE id = ?
      `,
      [event.startDate, event.endDate, event.isDone, event.id]
    )
  }

  async findAllInPeriod(start: Date, end: Date): Promise<EventDTO[]> {
    const [rows] = await this.connection.execute<EventDTO[]>(
      `SELECT * FROM ${this.tableName}
        WHERE start_date <= ? AND end_date >= ?
      `,
      [end, start]
    )
    return rows
  }
}

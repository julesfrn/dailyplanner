import { RowDataPacket } from 'mysql2/promise'

export interface EventDTO extends RowDataPacket {
  id: string
  activity_id: string
  start_date: Date
  end_date: Date
  is_done: 1 | 0
  description?: string
}

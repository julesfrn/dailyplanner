import { RowDataPacket } from 'mysql2/promise'

export interface ActivityDTO extends RowDataPacket {
  id: number
  text: string
}

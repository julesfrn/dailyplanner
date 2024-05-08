import { Connection } from 'mysql2/promise'
import { CreateActivitiesTable } from './1.CreateActivitiesTable'

export const getMigrations = (mysqlConnection: Connection) => [
  new CreateActivitiesTable(mysqlConnection)
]

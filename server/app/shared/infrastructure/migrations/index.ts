import { Connection } from 'mysql2/promise'
import { CreateActivitiesTable } from './1.CreateActivitiesTable'
import { CreateEventsTable } from './2.CreateEventsTable'

export const getMigrations = (mysqlConnection: Connection) => [
  new CreateActivitiesTable(mysqlConnection),
  new CreateEventsTable(mysqlConnection)
]

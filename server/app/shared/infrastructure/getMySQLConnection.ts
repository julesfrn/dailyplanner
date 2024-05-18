import mysql from 'mysql2/promise'
import { executeMigrations } from './executeMigrations'

export const getMySQLConnection = async () => {
  const { MYSQL_HOST, MYSQL_USER, MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_PORT } = process.env
  if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_DATABASE || !MYSQL_PASSWORD || !Number(MYSQL_PORT))
    throw new Error('Missing MySQL environment variables')

  const mysqlConnection = await mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    database: MYSQL_DATABASE,
    password: MYSQL_PASSWORD,
    port: Number(MYSQL_PORT)
  })

  await executeMigrations(mysqlConnection)

  return mysqlConnection
}

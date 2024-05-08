import { RetreiveAllActivitiesUseCase } from './domain/use-cases/RetreiveAllActivitiesUseCase'
import { ActivityRepository } from './infrastructure/ActivityRepository'
import { MySQLActivityDataSource } from './infrastructure/MySQLActivityDataSource'
import { getMySQLConnection } from './infrastructure/db/getMySQLConnection'
import { ActivitiesController } from './presentation/ActivitiesController'
import { Route } from './presentation/Route'
import { getActivitiesRoutes } from './presentation/getActivitiesRoutes'

export const injectDendencies = async (): Promise<Route[]> => {
  const mySQLConnection = await getMySQLConnection()
  const mySQLActivityDataSource = new MySQLActivityDataSource(mySQLConnection)
  const activityRepository = new ActivityRepository(mySQLActivityDataSource)
  const retreiveAllActivitiesUseCase = new RetreiveAllActivitiesUseCase(activityRepository)
  const activitiesController = new ActivitiesController(retreiveAllActivitiesUseCase)
  return [...getActivitiesRoutes(activitiesController)]
}

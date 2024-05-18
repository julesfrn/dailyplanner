import { CreateActivityUseCase } from './app/activities/CreateActivityUseCase'
import { DeleteActivityUseCase } from './app/activities/DeleteActivityUseCase'
import { RetreiveAllActivitiesUseCase } from './app/activities/RetreiveAllActivitiesUseCase'
import { ActivityRepository } from './app/activities/infrastructure/ActivityRepository'
import { MySQLActivityDataSource } from './app/activities/infrastructure/MySQLActivityDataSource'
import { getMySQLConnection } from './app/shared/infrastructure/getMySQLConnection'
import { ActivitiesController } from './app/activities/presentation/ActivitiesController'
import { Route } from './app/shared/presentation/Route'
import { getActivitiesRoutes } from './app/activities/presentation/getActivitiesRoutes'
import { MySQLEventDataSource } from './app/events/infrastructure/MySQLEventDataSource'
import { EventRepository } from './app/events/infrastructure/EventRepository'
import { CreateEventUseCase } from './app/events/CreateEventUseCase'
import { EventController } from './app/events/presentation/EventController'
import { getEventsRoutes } from './app/events/presentation/getEventsRoutes'
import { DeleteEventUseCase } from './app/events/DeleteEventUseCase'
import { ToggleEventIsDoneUseCase } from './app/events/ToggleEventIsDoneUseCase'
import { RetreiveEventsForPeriodUseCase } from './app/events/RetreiveEventsForPeriodUseCase'
import { RetreiveActivityUseCase } from './app/activities/RetreiveActivityUseCase'

export const injectDendencies = async (): Promise<Route[]> => {
  const mySQLConnection = await getMySQLConnection()

  const mySQLActivityDataSource = new MySQLActivityDataSource(mySQLConnection)
  const mySQLEventDataSource = new MySQLEventDataSource(mySQLConnection)

  const activityRepository = new ActivityRepository(mySQLActivityDataSource)
  const eventRepository = new EventRepository(mySQLEventDataSource)

  const retreiveAllActivitiesUseCase = new RetreiveAllActivitiesUseCase(activityRepository)
  const retreiveActivityUseCase = new RetreiveActivityUseCase(activityRepository)
  const createActivityUseCase = new CreateActivityUseCase(activityRepository)
  const deleteActivityUseCase = new DeleteActivityUseCase(activityRepository)
  const createEventUseCase = new CreateEventUseCase(eventRepository)
  const deleteEventUseCase = new DeleteEventUseCase(eventRepository)
  const toggleEventIsDoneUseCase = new ToggleEventIsDoneUseCase(eventRepository)
  const retreiveEventsForPeriodUseCase = new RetreiveEventsForPeriodUseCase(eventRepository)

  const activitiesController = new ActivitiesController(
    retreiveAllActivitiesUseCase,
    retreiveActivityUseCase,
    createActivityUseCase,
    deleteActivityUseCase
  )
  const eventsController = new EventController(
    createEventUseCase,
    deleteEventUseCase,
    toggleEventIsDoneUseCase,
    retreiveEventsForPeriodUseCase
  )



  return [...getActivitiesRoutes(activitiesController), ...getEventsRoutes(eventsController)]
}

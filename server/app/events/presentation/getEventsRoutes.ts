import { EventController } from './EventController'
import { Route } from '../../shared/presentation/Route'

export const getEventsRoutes = (eventsController: EventController): Route[] => {
  return [
    {
      method: 'post',
      path: '/events',
      handler: eventsController.createEvent.bind(eventsController)
    },
    {
      method: 'delete',
      path: '/events/:eventId',
      handler: eventsController.deleteEvent.bind(eventsController)
    },
    {
      method: 'put',
      path: '/events/:eventId/is-done',
      handler: eventsController.updateEventIsDone.bind(eventsController)
    },
    {
      method: 'get',
      path: '/events',
      handler: eventsController.retreiveEventsForPeriod.bind(eventsController)
    }
  ]
}

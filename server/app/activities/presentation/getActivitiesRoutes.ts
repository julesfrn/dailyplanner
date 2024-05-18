import { ActivitiesController } from './ActivitiesController'
import { Route } from '../../shared/presentation/Route'

export const getActivitiesRoutes = (activitiesController: ActivitiesController): Route[] => {
  return [
    {
      method: 'post',
      path: '/activities',
      handler: activitiesController.createActivity.bind(activitiesController)
    },
    {
      method: 'get',
      path: '/activities',
      handler: activitiesController.getActivities.bind(activitiesController)
    },
    {
      method: 'delete',
      path: '/activities/:id',
      handler: activitiesController.deleteActivity.bind(activitiesController)
    }
  ]
}

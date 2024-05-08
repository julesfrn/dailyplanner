import { ActivitiesController } from './ActivitiesController'
import { Route } from './Route'

export const getActivitiesRoutes = (activitiesController: ActivitiesController): Route[] => {
  return [
    {
      method: 'get',
      path: '/activities',
      handler: activitiesController.getActivities.bind(activitiesController)
    }
  ]
}

import { HTTPRequest } from '../../shared/presentation/Route'

export type CreateEventRequest = HTTPRequest<
  {
    activityId: string
    startDate: Date
    endDate: Date
  },
  undefined,
  undefined
>

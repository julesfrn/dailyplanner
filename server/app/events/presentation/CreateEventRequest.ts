import { HTTPRequest } from '../../shared/presentation/Route'

export type CreateEventRequest = HTTPRequest<
  {
    activityId: string
    startDate: Date
    endDate: Date
    description?: string
  },
  undefined,
  undefined
>

import { HTTPRequest, HTTPResponse } from '../../shared/presentation/Route'
import { CreateEventUseCase } from '../CreateEventUseCase'
import { DeleteEventUseCase } from '../DeleteEventUseCase'
import { RetreiveEventsForPeriodUseCase } from '../RetreiveEventsForPeriodUseCase'
import { ToggleEventIsDoneUseCase } from '../ToggleEventIsDoneUseCase'
import { CreateEventRequest } from './CreateEventRequest'
import { EventDTO } from './EventDTO'

export class EventController {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly deleteEventUseCase: DeleteEventUseCase,
    private readonly toggleEventIsDoneUseCase: ToggleEventIsDoneUseCase,
    private readonly retreiveEventsForPeriodUseCase: RetreiveEventsForPeriodUseCase
  ) {}

  async createEvent(request: CreateEventRequest) {
    try {
      const event = await this.createEventUseCase.execute(
        request.payload.activityId,
        new Date(request.payload.startDate),
        new Date(request.payload.endDate)
      )
      return {
        status: 201,
        body: {
          id: event.id,
          activityId: event.activityId,
          startDate: event.startDate,
          endDate: event.endDate,
          isDone: event.isDone
        }
      }
    } catch (error) {
      return { status: 500, body: error }
    }
  }

  async deleteEvent(request: HTTPRequest<undefined, undefined, { eventId: string }>) {
    try {
      await this.deleteEventUseCase.execute(request.params.eventId)
      return { status: 204 }
    } catch (error) {
      return { status: 500, body: error }
    }
  }

  async updateEventIsDone(request: HTTPRequest<undefined, undefined, { eventId: string }>) {
    try {
      const isDone = await this.toggleEventIsDoneUseCase.execute(request.params.eventId)
      return { status: 200, body: { isDone } }
    } catch (error) {
      return { status: 500, body: error }
    }
  }

  async retreiveEventsForPeriod(
    request: HTTPRequest<undefined, { startDate: string; endDate: string }>
  ): Promise<HTTPResponse<EventDTO[]>> {
    try {
      const events = await this.retreiveEventsForPeriodUseCase.execute(
        new Date(request.query.startDate),
        new Date(request.query.endDate)
      )
      return {
        status: 200,
        body: events.map((event) => ({
          id: event.id,
          activityId: event.activityId,
          startDate: event.startDate.toISOString(),
          endDate: event.endDate.toISOString(),
          isDone: event.isDone
        }))
      }
    } catch (error) {
      return { status: 500, body: error }
    }
  }
}

import { Event } from './domain/Event'
import { IEventRepository } from './domain/repositories/IEventRepository'

export class CreateEventUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(activityId: string, start: Date, end: Date, description?: string): Promise<Event> {
    const event = Event.create(activityId, start, end, description || null)
    await this.eventRepository.create(event)
    return event
  }
}

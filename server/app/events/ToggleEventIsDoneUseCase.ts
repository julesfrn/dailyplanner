import { IEventRepository } from './domain/repositories/IEventRepository'

export class ToggleEventIsDoneUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(eventId: string): Promise<boolean> {
    const event = await this.eventRepository.findById(eventId)
    if (!event) throw new Error('Event not found')
    event.toggleIsDone()
    await this.eventRepository.update(event)
    return event.isDone
  }
}

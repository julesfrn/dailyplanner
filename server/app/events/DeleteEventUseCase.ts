import { IEventRepository } from './domain/repositories/IEventRepository'

export class DeleteEventUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(eventId: string): Promise<void> {
    await this.eventRepository.delete(eventId)
  }
}

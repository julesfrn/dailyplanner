import { IEventRepository } from './domain/repositories/IEventRepository'

export class RetreiveEventsForPeriodUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(start: Date, end: Date) {
    return this.eventRepository.findEventsInPeriod(start, end)
  }
}

import { Event } from '../domain/Event'
import { IEventRepository } from '../domain/repositories/IEventRepository'
import { MySQLEventDataSource } from './MySQLEventDataSource'

export class EventRepository implements IEventRepository {
  constructor(private readonly eventDataSource: MySQLEventDataSource) {}

  async create(event: Event): Promise<void> {
    await this.eventDataSource.createOne(event)
  }

  async delete(eventId: string): Promise<void> {
    await this.eventDataSource.deleteOne(eventId)
  }

  async findById(eventId: string): Promise<Event | null> {
    const eventDTO = await this.eventDataSource.findOne(eventId)
    return eventDTO
      ? new Event(
          eventDTO?.id,
          eventDTO.activity_id,
          eventDTO.start_date,
          eventDTO.end_date,
          Boolean(eventDTO.is_done)
        )
      : null
  }

  async update(event: Event): Promise<void> {
    await this.eventDataSource.updateOne(event)
  }

  async findEventsInPeriod(start: Date, end: Date): Promise<Event[]> {
    const eventDTOs = await this.eventDataSource.findAllInPeriod(start, end)
    return eventDTOs.map(
      (eventDTO) =>
        new Event(
          eventDTO.id,
          eventDTO.activity_id,
          eventDTO.start_date,
          eventDTO.end_date,
          Boolean(eventDTO.is_done)
        )
    )
  }
}

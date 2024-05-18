import { Event } from '../Event'

export interface IEventRepository {
  create(event: Event): Promise<void>
  delete(eventId: string): Promise<void>
  findById(eventId: string): Promise<Event | null>
  update(event: Event): Promise<void>
  findEventsInPeriod(start: Date, end: Date): Promise<Event[]>
}

export class Event {
  constructor(
    public readonly id: string,
    public readonly activityId: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public isDone: boolean
  ) {}

  toggleIsDone(): void {
    this.isDone = !this.isDone
  }

  static create(activityId: string, startDate: Date, endDate: Date): Event {
    return new Event(crypto.randomUUID(), activityId, startDate, endDate, false)
  }
}

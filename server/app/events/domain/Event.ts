export class Event {
  constructor(
    public readonly id: string,
    public readonly activityId: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public isDone: boolean,
    public readonly description: string | null
  ) {}

  toggleIsDone(): void {
    this.isDone = !this.isDone
  }

  static create(
    activityId: string,
    startDate: Date,
    endDate: Date,
    description: string | null
  ): Event {
    return new Event(crypto.randomUUID(), activityId, startDate, endDate, false, description)
  }
}

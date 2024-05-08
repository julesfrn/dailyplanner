import { Activity } from './Activity'

export class Event {
  constructor(
    public readonly id: number,
    public readonly activity: Activity,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly isDone: boolean = false
  ) {}
}

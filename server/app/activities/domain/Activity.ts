export class Activity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly color: string
  ) {}
  
  static create(name: string, color: string): Activity {
    return new Activity(crypto.randomUUID(), name, color)
  }
}

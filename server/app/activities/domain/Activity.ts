export class Activity {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) {}
  
  static create(name: string): Activity {
    return new Activity(crypto.randomUUID(), name)
  }
}

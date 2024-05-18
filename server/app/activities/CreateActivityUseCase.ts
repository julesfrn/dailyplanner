import { Activity } from './domain/Activity'
import { IActivityRepository } from './domain/repositories/IActivityRepository'

export class CreateActivityUseCase {
  constructor(private readonly activityRepository: IActivityRepository) {}

  async execute(name: string): Promise<Activity> {
    const activity = Activity.create(name)
    await this.activityRepository.create(activity)
    return activity
  }
}

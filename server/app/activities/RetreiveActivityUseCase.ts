import { Activity } from './domain/Activity'
import { IActivityRepository } from './domain/repositories/IActivityRepository'

export class RetreiveActivityUseCase {
  constructor(private readonly activityRepository: IActivityRepository) {}

  async execute(id: string): Promise<Activity> {
    const activity = await this.activityRepository.findById(id)
    if (!activity) throw new Error('Activity not found')
    return activity
  }
}

import { Activity } from './domain/Activity'
import { IActivityRepository } from './domain/repositories/IActivityRepository'

export class RetreiveAllActivitiesUseCase {
  constructor(private readonly activityRepository: IActivityRepository) {}

  async execute(): Promise<Activity[]> {
    return this.activityRepository.findAll()
  }
}

import { Activity } from '../Activity'
import { IActivityRepository } from '../repositories/IActivityRepository'

export class RetreiveAllActivitiesUseCase {
  constructor(private readonly activityRepository: IActivityRepository) {}

  async execute(): Promise<Activity[]> {
    return this.activityRepository.findAll()
  }
}

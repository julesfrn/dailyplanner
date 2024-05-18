import { IActivityRepository } from './domain/repositories/IActivityRepository'

export class DeleteActivityUseCase {
  constructor(private readonly activitiesRepository: IActivityRepository) {}

  async execute(id: string) {
    await this.activitiesRepository.delete(id)
  }
}

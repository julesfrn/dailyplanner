import { RetreiveAllActivitiesUseCase } from '../domain/use-cases/RetreiveAllActivitiesUseCase'
import { HTTPResponse } from './HTTPResponse'

export class ActivitiesController {
  constructor(private retreiveAllActivitiesUseCase: RetreiveAllActivitiesUseCase) {}

  async getActivities(): Promise<HTTPResponse> {
    const activities = this.retreiveAllActivitiesUseCase.execute()
    return {
      status: 200,
      body: activities
    }
  }
}

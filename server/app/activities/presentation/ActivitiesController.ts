import { CreateActivityUseCase } from '../CreateActivityUseCase'
import { RetreiveAllActivitiesUseCase } from '../RetreiveAllActivitiesUseCase'
import { RetreiveActivityUseCase } from '../RetreiveActivityUseCase'
import { DeleteActivityUseCase } from '../DeleteActivityUseCase'
import { HTTPRequest, HTTPResponse } from '../../shared/presentation/Route'
import { ActivityDTO } from './ActivityDTO'

export class ActivitiesController {
  constructor(
    private readonly retreiveAllActivitiesUseCase: RetreiveAllActivitiesUseCase,
    private readonly retreiveActivityUseCase: RetreiveActivityUseCase,
    private readonly createActivityUseCase: CreateActivityUseCase,
    private readonly deleteActivityUseCase: DeleteActivityUseCase
  ) {}

  async getActivities(): Promise<HTTPResponse<ActivityDTO[]>> {
    try {
      const activities = await this.retreiveAllActivitiesUseCase.execute()
      return { status: 200, body: activities }
    } catch (error) {
      return { status: 500, body: error }
    }
  }

  async getActivity(
    request: HTTPRequest<undefined, undefined, { id: string }>
  ): Promise<HTTPResponse<ActivityDTO>> {
    try {
      const activity = await this.retreiveActivityUseCase.execute(request.params.id)
      return { status: 200, body: activity }
    } catch (error) {
      return { status: 500, body: error }
    }
  }

  async createActivity(request: HTTPRequest<{ name: string; color: string }>) {
    try {
      const activity = await this.createActivityUseCase.execute(
        request.payload.name,
        request.payload.color
      )
      return { status: 201, body: { id: activity.id, name: activity.name, color: activity.color } }
    } catch (error) {
      return { status: 500, body: error }
    }
  }

  async deleteActivity(request: HTTPRequest<undefined, undefined, { id: string }>) {
    try {
      await this.deleteActivityUseCase.execute(request.params.id)
      return { status: 204 }
    } catch (error) {
      return { status: 500, body: error }
    }
  }
}

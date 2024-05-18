import { CreateActivityUseCase } from '../CreateActivityUseCase'
import { RetreiveAllActivitiesUseCase } from '../RetreiveAllActivitiesUseCase'
import { DeleteActivityUseCase } from '../DeleteActivityUseCase'
import { HTTPRequest } from '../../shared/presentation/Route'

export class ActivitiesController {
  constructor(
    private readonly retreiveAllActivitiesUseCase: RetreiveAllActivitiesUseCase,
    private readonly createActivityUseCase: CreateActivityUseCase,
    private readonly deleteActivityUseCase: DeleteActivityUseCase
  ) {}

  async getActivities() {
    try {
      const activities = await this.retreiveAllActivitiesUseCase.execute()
      return { status: 200, body: activities }
    } catch (error) {
      return { status: 500, body: error }
    }
  }

  async createActivity(request: HTTPRequest<{ name: string }>) {
    try {
      const activity = await this.createActivityUseCase.execute(request.payload.name)
      return { status: 201, body: { id: activity.id, name: activity.name } }
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

import { Activity } from '../domain/Activity'
import { IActivityRepository } from '../domain/repositories/IActivityRepository'
import { MySQLActivityDataSource } from './MySQLActivityDataSource'

export class ActivityRepository implements IActivityRepository {
  constructor(private readonly activityDataSource: MySQLActivityDataSource) {}

  async findAll(): Promise<Activity[]> {
    const rows = await this.activityDataSource.getActivities()
    return rows.map((row) => new Activity(row.id, row.name))
  }

  async create(activity: Activity): Promise<void> {
    await this.activityDataSource.createOne(activity)
  }

  async delete(id: string): Promise<void> {
    await this.activityDataSource.deleteOne(id)
  }
}

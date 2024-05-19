import { Activity } from '../domain/Activity'
import { IActivityRepository } from '../domain/repositories/IActivityRepository'
import { MySQLActivityDataSource } from './MySQLActivityDataSource'

export class ActivityRepository implements IActivityRepository {
  constructor(private readonly activityDataSource: MySQLActivityDataSource) {}

  async findAll(): Promise<Activity[]> {
    const rows = await this.activityDataSource.findAll()
    return rows.map((row) => new Activity(row.id, row.name, row.color))
  }

  async findById(id: string): Promise<Activity | null> {
    const activityDTO = await this.activityDataSource.findOneByPK(id)
    return activityDTO ? new Activity(activityDTO.id, activityDTO.name, activityDTO.color) : null
  }

  async create(activity: Activity): Promise<void> {
    await this.activityDataSource.createOne(activity)
  }

  async delete(id: string): Promise<void> {
    await this.activityDataSource.deleteOne(id)
  }
}

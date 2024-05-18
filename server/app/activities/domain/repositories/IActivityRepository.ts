import { Activity } from '../Activity'

export interface IActivityRepository {
  findAll(): Promise<Activity[]>
  create(activity: Activity): Promise<void>
  delete(id: string): Promise<void>
}

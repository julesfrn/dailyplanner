import { Activity } from '../Activity'

export interface IActivityRepository {
  findAll(): Promise<Activity[]>
  findById(id: string): Promise<Activity | null>
  create(activity: Activity): Promise<void>
  delete(id: string): Promise<void>
}

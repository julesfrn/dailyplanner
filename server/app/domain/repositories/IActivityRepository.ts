import { Activity } from '../Activity'

export interface IActivityRepository {
  findAll(): Promise<Activity[]>
}

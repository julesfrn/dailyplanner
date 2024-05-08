import { HTTPResponse } from './HTTPResponse'

export type Route = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  path: `/${string}`
  handler: () => Promise<HTTPResponse>
}

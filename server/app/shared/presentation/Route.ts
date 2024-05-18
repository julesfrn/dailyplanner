export type HTTPResponse<Body = any> = {
  status: number
  body?: Body | unknown
}

export type HTTPRequest<Payload = any, Query = any, Params = any> = {
  payload: Payload
  query: Query
  params: Params
}

export type HTTPHandler = (request: HTTPRequest) => Promise<HTTPResponse>

export type Route = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  path: `/${string}`
  handler: HTTPHandler
}

import { H3Event, EventHandlerRequest } from 'h3'
import { injectDendencies } from '../injectDependencies'
import { HTTPHandler, HTTPRequest } from '../app/shared/presentation/Route'

export default defineNitroPlugin(async (nitroApp) => {
  const routes = await injectDendencies()

  const isPayloadMethod = (method: string) =>
    ['post', 'put', 'patch', 'delete'].includes(method.toLowerCase())

  const wrapHandler = (handler: HTTPHandler) => async (event: H3Event<EventHandlerRequest>) => {
    const request: HTTPRequest = {
      payload: isPayloadMethod(event.method) ? await readBody(event) : undefined,
      query: getQuery(event),
      params: getRouterParams(event)
    }
    const { status, body } = await handler(request)
    setResponseStatus(event, status)
    return body
  }

  routes.forEach(({ path, handler, method }) => {
    nitroApp.router.use(`/api${path}`, defineEventHandler(wrapHandler(handler)), method)
  })
})

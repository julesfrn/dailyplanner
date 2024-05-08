import { injectDendencies } from '../app/injectDependencies'

export default defineNitroPlugin(async (nitroApp) => {
  const routes = await injectDendencies()

  routes.forEach(({ path, handler, method }) => {
    nitroApp.router.use(
      `/api${path}`,
      defineEventHandler(async (event) => {
        const { status, body } = await handler()
        setResponseStatus(event, status)
        return body
      }),
      method
    )
  })
})

import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ValidateUserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const userExist = await User.findBy('email', ctx.request.cookie('email'))

    if (!userExist) {
      return ctx.response.status(401).json({ message: 'User not found' })
    }

    const output = await next()
    return output
  }
}

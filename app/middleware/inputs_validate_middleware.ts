import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import validator from 'validator'

export default class InputsValidateMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const registerData = ctx.request.body()

    if (!registerData.email || !registerData.password) {
      return ctx.response.status(400).json({ message: 'Email or password are required' })
    }

    if (registerData.email && !validator.isEmail(registerData.email)) {
      return ctx.response.status(400).json({ message: 'Invalid email' })
    }

    if (registerData.password.length < 8) {
      return ctx.response.status(400).json({ message: 'Password must have at least 8 characters' })
    }

    const output = await next()
    return output
  }
}

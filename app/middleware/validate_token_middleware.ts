import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { verifyToken } from '../../utils/jwt.js'

export default class ValidateTokenMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const token = ctx.request.header('Authorization')

    if (!token) {
      return ctx.response.send('Token não informado')
    }

    const extractedToken = token.replace('Bearer ', '')

    const { email } = verifyToken(extractedToken) as any
    console.log(email)

    if (!email) {
      return ctx.response.send('Token inválido')
    }

    ctx.request.body().email = email

    const output = await next()
    return output
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { verifyToken } from '../../utils/jwt.js'

export default class ValidateTokenMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const token = ctx.request.header('Authorization')

    if (!token) {
      return ctx.response.status(401).send('Token não informado')
    }

    const extractedToken = token.replace('Bearer ', '')

    const { email } = verifyToken(extractedToken)

    if (!email) {
      return ctx.response.status(401).send('Token inválido')
    }

    ctx.response.cookie('email', email, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      domain: 'localhost',
    })

    const output = await next()
    return output
  }
}

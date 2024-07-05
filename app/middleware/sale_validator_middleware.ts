import Client from '#models/client'
import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SaleValidatorMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      const salesData = ctx.request.body()

      const clientExists = await Client.findBy('id', salesData.clientId)

      if (!clientExists) {
        return ctx.response.status(404).json({ message: 'Cliente não encontrado' })
      }

      const productExists = await Product.findBy('id', salesData.productId)
      if (!productExists) {
        return ctx.response.status(404).json({ message: 'Produto não encontrado' })
      }

      if (productExists.quantity < salesData.totalQuantity) {
        return ctx.response.status(400).json({ message: 'Quantidade insuficiente em estoque' })
      }
      const output = await next()
      return output
    } catch (error) {
      return ctx.response.status(400).json({ message: error.message })
    }
  }
}

import Product from '#models/product'
import Sale from '#models/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const allSales = await Sale.query()
        .select('user_id', 'client_id', 'product_id', 'total_quantity', 'total_price')
        .preload('user', (query) => {
          query.select('email')
        })
        .preload('client', (query) => {
          query.select('name')
        })
        .preload('product', (query) => {
          query.select('product', 'price')
        })

      return response.status(200).json(allSales)
    } catch (error) {
      console.log(error.message)

      return response.status(404).json({ message: 'Vendas não encontradas' })
    }
  }

  /**
   * Display form to create a new record
   */
  async create({ request, response }: HttpContext) {
    try {
      const salesData = request.only(['userId', 'clientId', 'productId', 'totalQuantity']) as any
      const product = (await Product.findBy('id', salesData.productId)) as any

      const totalPrice = (product.price * salesData.totalQuantity) as number

      salesData.totalPrice = totalPrice

      await Sale.create(salesData)
      return response.status(201).json({ message: 'Venda registrada com sucesso' })
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao registrar venda' })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const sale = await Sale.query()
        .select('user_id', 'client_id', 'product_id', 'total_quantity', 'total_price')
        .where('id', params.id)
        .preload('user', (query) => {
          query.select('email')
        })
        .preload('client', (query) => {
          query.select('name')
        })
        .preload('product', (query) => {
          query.select('product', 'price')
        })

      return response.status(200).json(sale)
    } catch (error) {
      return response.status(404).json({ message: 'Venda não encontrada' })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      await Sale.query().where('id', params.id).update(request.body())
      return response.status(200).json({ message: 'Venda atualizada com sucesso' })
    } catch (error) {
      return response.status(404).json({ message: 'Venda não encontrada' })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const sale = await Sale.findBy('id', params.id)
      console.log(sale)

      if (!sale) {
        return response.status(404).json({ message: 'Venda não encontrada' })
      }
      const saleDeleted = await sale.delete()
      console.log(saleDeleted)
      return response.status(204).json({ message: 'Venda deletada com sucesso' })
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }
}

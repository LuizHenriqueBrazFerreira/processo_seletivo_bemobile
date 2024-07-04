import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const allProducts = await Product.query()
        .select('product', 'description', 'price', 'quantity')
        .orderBy('product', 'asc')
      return response.status(200).json(allProducts)
    } catch (error) {
      return response.status(404).json({ message: 'Products não encontrados' })
    }
  }

  /**
   * Display form to create a new record
   */
  async create({ request, response }: HttpContext) {
    try {
      const productData = request.body()
      const product = await Product.create(productData)
      return response.status(201).json({ message: `Product ${product.product} criado com sucesso` })
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao criar product' })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const product = await Product.query()
        .select('product', 'description', 'price', 'quantity')
        .where('id', params.id)

      return response.status(200).json(product)
    } catch (error) {
      return response.status(404).json({ message: 'Product não encontrado' })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const productData = request.body()
      const product = await Product.findOrFail(params.id)
      if (!product) {
        return response.status(404).json({ message: 'Product não encontrado' })
      }
      await product.merge(productData).save()
      return response.status(200).json({ message: `Product atualizado com sucesso` })
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao atualizar product' })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      if (!product) {
        return response.status(404).json({ message: 'Product não encontrado' })
      }
      await product.delete()
      return response.status(200).json({ message: `Product deletado com sucesso` })
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao deletar product' })
    }
  }
}

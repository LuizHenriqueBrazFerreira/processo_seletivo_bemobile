import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  // Busca todos os produtos
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

  // Cria um novo produto
  async create({ request, response }: HttpContext) {
    try {
      const productData = request.only(['product', 'description', 'price', 'quantity'])
      const product = await Product.create(productData)
      return response.status(201).json({ message: `Product ${product.product} criado com sucesso` })
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao criar product' })
    }
  }

  // Mostra um produto em especifico
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

  // Atualiza os dados de um produto
  async update({ params, request, response }: HttpContext) {
    try {
      const productData = request.only(['product', 'description', 'price', 'quantity'])
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

  // Gera um soft delete de um produto
  async soft_destroy({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      if (!product) {
        return response.status(404).json({ message: 'Product não encontrado' })
      }
      await product.merge({ available: false }).save()
      return response.status(200).json({
        message: `Realizado soft-delete do produto, coluna available "settada" como false`,
      })
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao gerar o soft-delete do product' })
    }
  }
}

import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientsController {
  // Método que busca todos os clientes cadastrados
  async index({ response }: HttpContext) {
    const allClients = await Client.query()
      .select('name', 'cpf', 'address', 'city', 'country', 'phoneNumber')
      .orderBy('id', 'asc')
    return response.status(201).json({ message: allClients })
  }

  //Método que busca um cliente específico com as vendas relacionadas a ele
  async show({ request, response }: HttpContext) {
    const qs = request.qs()
    // Se não houver um id para busca, retorna um STATUS 400
    if (!qs.id) {
      return response.status(400).json({ message: 'Missing id in URL' })
    }

    // Se houver um filtro por data, retorna as vendas do cliente com base nesse filtro
    if (qs.filter_by) {
      const client = await Client.query()
        .select('id', 'name', 'cpf', 'address', 'city', 'country', 'phoneNumber')
        .where('id', qs.id)
        .preload('sales', (query) => {
          switch (qs.value) {
            case 'less':
              query.whereRaw('DATE_FORMAT(created_at, "%Y-%m") < ?', qs.filter_by)
              break
            case 'greater':
              query.whereRaw('DATE_FORMAT(created_at, "%Y-%m") > ?', qs.filter_by)
              break
            default:
              query.whereRaw('DATE_FORMAT(created_at, "%Y-%m") = ?', qs.filter_by)
              break
          }
        })
      return response.status(200).json(client)
    }

    // Caso contrário, retorna todas as vendas do cliente em específico
    const client = await Client.query()
      .select('id', 'name', 'cpf', 'address', 'city', 'country', 'phoneNumber')
      .where('id', qs.id)
      .preload('sales')
    return response.status(201).json({ message: client })
  }

  // Método para criar um cliente
  async store({ request, response }: HttpContext) {
    try {
      const clientData = request.body()
      const client = await Client.create(clientData)
      return response.status(201).json({ message: `Cliente ${client.name} cadastrado com sucesso` })
    } catch (error) {
      return response.status(409).json({ message: 'Cliente já cadastrado' })
    }
  }

  // Método para atualizar um cliente
  async update({ params, request, response }: HttpContext) {
    try {
      const clientData = request.body()

      const client = await Client.findByOrFail('id', params.id)
      if (!client) {
        return response.status(404).json({ message: 'Cliente não encontrado' })
      }
      await client.merge(clientData).save()

      return response.status(200).json({ message: `Cliente foi atualizado com sucesso` })
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao atualizar cliente' })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const client = await Client.findByOrFail('id', params.id)
      await client.delete()
      return response.status(200).json({ message: 'Cliente deletado com sucesso' })
    } catch (error) {
      console.log(error.message)

      return response.status(400).json({ message: 'Erro ao deletar cliente' })
    }
  }
}

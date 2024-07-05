import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { createToken } from '../../../utils/jwt.js'
import { getTokenByHttp } from '#tests/utils'

test.group('Client client controller', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Get all clients', async ({ client }) => {
    const token = await getTokenByHttp(client)
    const response = await client
      .request('clients', 'GET')
      .bearerToken(token)
      .cookie('email', 'email@email.com')

    response.assertStatus(200)
    response.assertBody({
      message: [
        {
          name: 'Cliente 1',
          cpf: '12345678901',
          address: 'Rua teste',
          city: 'Cidade teste',
          country: 'Brasil',
          phoneNumber: '12345678901',
        },
        {
          name: 'Cliente 2',
          cpf: '12345678901',
          address: 'Rua teste',
          city: 'Cidade teste',
          country: 'Brasil',
          phoneNumber: '12345678901',
        },
      ],
    })
  })

  test('Get client by id', async ({ client }) => {
    const token = await getTokenByHttp(client)

    const response = await client
      .request('clients/info', 'GET')
      .bearerToken(token)
      .cookie('email', 'email@email.com')
      .qs({
        id: 1,
      })

    response.assertStatus(200)
    response.assertBody([
      {
        id: 1,
        name: 'Cliente 1',
        cpf: '12345678901',
        address: 'Rua teste',
        city: 'Cidade teste',
        country: 'Brasil',
        phoneNumber: '12345678901',
        sales: [
          {
            id: 1,
            userId: 1,
            clientId: 1,
            productId: 1,
            totalPrice: '300.00',
            totalQuantity: 3,
            createdAt: '2024-07-05T19:05:16.000+00:00',
            updatedAt: '2024-07-05T19:05:16.000+00:00',
          },
        ],
      },
    ])
  })

  test('Fail to GET client without id', async ({ client }) => {
    const token = await getTokenByHttp(client)
    const response = await client
      .request('clients/info', 'GET')
      .bearerToken(token)
      .cookie('email', 'email@email.com')
      .qs({
        id: '',
        filter_by: '2024-07',
      })

    response.assertStatus(400)
    response.assertBody({ message: 'Missing id on URL' })
  })

  test('GET client by id with filter by date', async ({ client }) => {
    const token = await getTokenByHttp(client)
    const response = await client
      .request('clients/info', 'GET')
      .bearerToken(token)
      .cookie('email', 'email@email.com')
      .qs({
        id: 1,
        filter_by: '2024-07',
      })

    response.assertStatus(200)
    response.assertBody([
      {
        id: 1,
        name: 'Cliente 1',
        cpf: '12345678901',
        address: 'Rua teste',
        city: 'Cidade teste',
        country: 'Brasil',
        phoneNumber: '12345678901',
        sales: [
          {
            id: 1,
            userId: 1,
            clientId: 1,
            productId: 1,
            totalPrice: '300.00',
            totalQuantity: 3,
            createdAt: '2024-07-05T19:05:16.000+00:00',
            updatedAt: '2024-07-05T19:05:16.000+00:00',
          },
        ],
      },
    ])
  })

  test('GET client by id with filter by date greater than', async ({ client }) => {
    const token = await getTokenByHttp(client)
    const response = await client
      .request('clients/info', 'GET')
      .bearerToken(token)
      .cookie('email', 'email@email.com')
      .qs({
        id: 1,
        filter_by: '2024-08',
        value: 'greater',
      })

    response.assertStatus(200)
    response.assertBody([
      {
        id: 1,
        name: 'Cliente 1',
        cpf: '12345678901',
        address: 'Rua teste',
        city: 'Cidade teste',
        country: 'Brasil',
        phoneNumber: '12345678901',
        sales: [],
      },
    ])
  })

  test('Create a new client', async ({ client }) => {
    const token = await getTokenByHttp(client)
    const response = await client
      .request('clients/register', 'POST')
      .bearerToken(token)
      .cookie('email', 'email@email.com')
      .json({
        name: 'Cliente 4',
        cpf: '12345678901',
        address: 'Rua teste',
        city: 'Cidade teste',
        country: 'Brasil',
        phoneNumber: '12345678901',
      })

    response.assertStatus(201)
    response.assertBody({
      message: 'Cliente Cliente 4 cadastrado com sucesso',
    })
  })

  test('Update a client', async ({ client }) => {
    const token = await getTokenByHttp(client)
    const response = await client
      .request('clients/update/1', 'PUT')
      .bearerToken(token)
      .cookie('email', 'email@email.com')
      .json({
        name: 'Cliente 1',
        cpf: '12345678901',
        address: 'Rua teste',
        city: 'Cidade teste',
        country: 'Brasil',
        phoneNumber: '12345678901',
      })

    response.assertStatus(200)
    response.assertBody({ message: 'Cliente foi atualizado com sucesso' })
  })

  test('Fail to update a inexistent client', async ({ client }) => {
    const token = await getTokenByHttp(client)
    const response = await client
      .request('clients/update/9999999', 'PUT')
      .bearerToken(token)
      .cookie('email', 'email@email.com')
      .json({
        name: 'Cliente 99',
        cpf: '12345678901',
        address: 'Rua teste',
        city: 'Cidade teste',
        country: 'Brasil',
        phoneNumber: '12345678901',
      })

    response.assertStatus(404)
    response.assertBody({ message: 'Cliente não encontrado' })
  })

  test('Delete a client', async ({ client }) => {
    const token = await getTokenByHttp(client)
    const response = await client
      .request('clients/delete/1', 'DELETE')
      .bearerToken(token)
      .cookie('email', 'email@email.com')

    response.assertStatus(200)
    response.assertBody({ message: 'Cliente deletado com sucesso' })
  })
})

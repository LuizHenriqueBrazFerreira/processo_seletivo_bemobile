import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { createToken } from '../../../utils/jwt.js'

test.group('Client client controller', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Get all clients', async ({ client }) => {
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })
    const response = await client
      .request('clients', 'GET')
      .bearerToken(token)
      .cookie('email', 'email@email.com')

    response.assertStatus(200)
  })

  test('Get client by id', async ({ client }) => {
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })

    const response = await client
      .request('clients/info', 'GET')
      .bearerToken(token)
      .cookie('email', 'email@email.com')
      .qs({
        id: 1,
      })

    response.assertStatus(200)
  })

  test('Fail to GET client without id', async ({ client }) => {
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })
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
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })
    const response = await client
      .request('clients/info', 'GET')
      .bearerToken(token)
      .cookie('email', 'email@email.com')
      .qs({
        id: 1,
        filter_by: '2024-07',
      })

    response.assertStatus(200)
  })

  test('GET client by id with filter by date greater than', async ({ client }) => {
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })
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
  })

  test('Create a new client', async ({ client }) => {
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })
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
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })
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
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })
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
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })
    const response = await client
      .request('clients/delete/1', 'DELETE')
      .bearerToken(token)
      .cookie('email', 'email@email.com')

    response.assertStatus(200)
    response.assertBody({ message: 'Cliente deletado com sucesso' })
  })
})

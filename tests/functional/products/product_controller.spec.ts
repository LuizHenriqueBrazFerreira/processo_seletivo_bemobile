import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { createToken } from '../../../utils/jwt.js'

test.group('Products product controller', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('GET All products', async ({ client }) => {
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })

    const response = await client
      .request('/products', 'GET')
      .bearerToken(token)
      .cookie('email', 'email@email.com')

    response.assertStatus(200)
    response.assertBody([
      {
        product: 'Produto 1',
        description: 'Phone description',
        price: '100.00',
        quantity: 15,
      },
      {
        product: 'Produto 2',
        description: 'Laptop description',
        price: '200.00',
        quantity: 10,
      },
      {
        product: 'Produto 3',
        description: 'Desktop description',
        price: '300.00',
        quantity: 10,
      },
    ])
  })

  test('GET product by id', async ({ client }) => {
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })

    const response = await client
      .request('/products/1', 'GET')
      .bearerToken(token)
      .cookie('email', 'email@email.com')

    response.assertStatus(200)
    response.assertBody([
      {
        product: 'Produto 1',
        description: 'Phone description',
        price: '100.00',
        quantity: 15,
      },
    ])
  })

  test('POST create a product', async ({ client }) => {
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })

    const response = await client
      .request('/products/register', 'POST')
      .bearerToken(token)
      .cookie('email', 'email@email.com')
      .json({
        product: 'Produto 4',
        description: 'Tablet description',
        price: '150.00',
        quantity: 10,
      })

    response.assertStatus(201)
    response.assertBody({ message: 'Product Produto 4 criado com sucesso' })
  })

  test('UPDATE a product', async ({ client }) => {
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })

    const response = await client
      .request('/products/update/1', 'PUT')
      .bearerToken(token)
      .cookie('email', 'email@email.com')
      .json({
        product: 'Produto 1',
        description: 'Phone description',
        price: '100.00',
        quantity: 30,
      })

    response.assertStatus(200)
    response.assertBody({ message: 'Product atualizado com sucesso' })
  })

  test('DELETE a product', async ({ client }) => {
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })

    const response = await client
      .request('/products/delete/1', 'DELETE')
      .bearerToken(token)
      .cookie('email', 'email@email.com')

    response.assertStatus(200)
    response.assertBody({
      message: 'Realizado soft-delete do produto, coluna available "settada" como false',
    })
  })
})

import { test } from '@japa/runner'
import { createToken } from '../../../utils/jwt.js'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('Sales sales controller', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('Create a Sale', async ({ client }) => {
    await client.request('users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })

    const token = createToken({ email: 'email@email.com' })

    const response = await client
      .request('/sales/register', 'POST')
      .bearerToken(token)
      .cookie('email', 'email@email.com')
      .json({
        userId: 1,
        clientId: 1,
        productId: 1,
        totalQuantity: 1,
      })

    response.assertStatus(201)
    response.assertBody({
      message: 'Venda registrada com sucesso',
    })
  })
})

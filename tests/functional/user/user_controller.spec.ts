import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User user controller', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('Signup successfully', async ({ client }) => {
    const response = await client.request('/users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })
    console.log(response)

    response.assertStatus(201)
    response.assertBody({
      message: 'Usuário cadastrado com sucesso',
      data: 'email@email.com',
    })
  })

  test('Signup with invalid email', async ({ client }) => {
    const response = await client.request('/users/register-user', 'POST').json({
      email: 'email',
      password: '12345678',
    })

    response.assertStatus(400)
    response.assertBody({
      message: 'Invalid email',
    })
  })

  test('Signup with invalid password', async ({ client }) => {
    const response = await client.request('/users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '123',
    })

    response.assertStatus(400)
    response.assertBody({
      message: 'Password must have at least 8 characters',
    })
  })

  test('Signup with missing email', async ({ client }) => {
    const response = await client.request('/users/register-user', 'POST').json({
      password: '12345678',
    })

    response.assertStatus(400)
    response.assertBody({
      message: 'Email or password are required',
    })
  })

  test('Fail to create a user with an existing email', async ({ client }) => {
    await client.request('/users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '12345678',
    })
    const response = await client.request('/users/register-user', 'POST').json({
      email: 'email@email.com',
      password: '123456789',
    })

    response.assertStatus(400)
    response.assertBody({
      message: 'Email já cadastrado',
    })
  })
})

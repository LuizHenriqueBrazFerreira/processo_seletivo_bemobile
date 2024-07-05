import { createToken } from '../utils/jwt.js'

export const getTokenByHttp = async (client: any) => {
  await client.request('users/register-user', 'POST').json({
    email: 'email@email.com',
    password: '12345678',
  })

  const token = createToken({ email: 'email@email.com' })
  return token
}

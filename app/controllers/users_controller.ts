import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { createToken } from '../../utils/jwt.js'

export default class UserController {
  // Método index responsável por buscar um usuário para realizar o login
  async index({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'password'])

      const userExists = await User.findBy('email', data.email)

      if (!userExists) {
        return response.status(404).json({ message: 'Usuário não encontrado' })
      }

      const validadePassword = await hash.verify(userExists.password, data.password)

      if (!validadePassword) {
        return response.status(401).json({ message: 'Senha inválida' })
      }

      const jwtToken = createToken({ email: data.email })

      return response.status(200).json({ token: `Bearer ${jwtToken}` })
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao buscar usuário' })
    }
  }

  // Método create responsável por criar um novo usuário
  async create({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'password'])

      const userExists = await User.findBy('email', data.email)

      if (userExists) {
        return response.status(400).json({ message: 'Email já cadastrado' })
      }

      const newUser = await User.create({
        email: data.email,
        password: await hash.make(data.password),
      })

      return response
        .status(201)
        .json({ message: 'Usuário cadastrado com sucesso', data: newUser.email })
    } catch (error) {
      console.log(error.message)

      return response.status(400).json({ message: 'Erro ao cadastrar usuário' })
    }
  }
}

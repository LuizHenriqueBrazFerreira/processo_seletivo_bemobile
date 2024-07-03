import Clients from '#enum/client'
import Products from '#enum/product'
import Users from '#enum/user'
import Client from '#models/client'
import Product from '#models/product'
import Sale from '#models/sale'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

const password = process.env.DB_PASSWORD as string

export default class extends BaseSeeder {
  async run() {
    // Criando o seeder que vai popular a model users

    await User.create({
      email: 'teste@email.com',
      password: await hash.make(password),
    })

    // Criando o seeder que vai popular a model clients

    await Client.createMany([
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
    ])

    // Criando o seeder que vai popular a model products

    await Product.createMany([
      {
        product: 'Produto 1',
        description: 'Phone description',
        price: 100.0,
        quantity: 15,
      },
      {
        product: 'Produto 2',
        description: 'Laptop description',
        price: 200.0,
        quantity: 10,
      },
      {
        product: 'Produto 3',
        description: 'Desktop description',
        price: 300.0,
        quantity: 10,
      },
    ])

    // Criando o seeder que vai popular

    await Sale.createMany([
      {
        userId: Users.USER,
        clientId: Clients.NEWCLIENT,
        productId: Products.Phone,
        totalQuantity: 3,
        totalPrice: 300.0,
      },
      {
        userId: Users.USER,
        clientId: Clients.OLDCLIENT,
        productId: Products.Laptop,
        totalQuantity: 2,
        totalPrice: 400.0,
      },
    ])
  }
}

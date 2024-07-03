import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Clients extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name', 20).notNullable()
      table.integer('cpf', 11).notNullable()
      table.string('address', 20).notNullable()
      table.string('city', 20).notNullable()
      table.string('country', 8).notNullable()
      table.integer('phoneNumber', 12).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

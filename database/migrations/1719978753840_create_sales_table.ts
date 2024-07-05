import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Sales extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE') // Relacionamento com a tabela users

      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onDelete('CASCADE')
        .onUpdate('CASCADE') // Relacionamento com a tabela clients

      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
        .onUpdate('CASCADE') // Relacionamento com a tabela products

      table.decimal('total_price', 10, 2).notNullable()

      table.integer('total_quantity').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

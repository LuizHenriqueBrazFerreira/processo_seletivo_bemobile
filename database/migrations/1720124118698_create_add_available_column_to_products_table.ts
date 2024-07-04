import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.boolean('available').defaultTo(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Sale from './sale.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare product: string

  @column()
  declare price: number

  @column()
  declare quantity: number

  @column()
  declare description: string

  @hasMany(() => Sale, {
    foreignKey: 'productId',
  })
  declare sales: HasMany<typeof Sale>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

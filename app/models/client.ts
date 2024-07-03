import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Sale from './sale.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: number

  @column()
  declare address: string

  @column()
  declare city: string

  @column()
  declare country: string

  @hasMany(() => Sale, {
    foreignKey: 'clientId',
  })
  declare sales: HasMany<typeof Sale>

  @column()
  declare phoneNumber: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

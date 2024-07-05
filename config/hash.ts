import { defineConfig, drivers } from '@adonisjs/core/hash'

const SALT_ROUNDS = process.env.HASH_SALT_ROUNDS || 10

const hashConfig = defineConfig({
  default: 'bcrypt',

  list: {
    bcrypt: drivers.bcrypt({
      rounds: Number(SALT_ROUNDS),
      saltSize: 16,
    }),
  },
})

export default hashConfig

/**
 * Inferring types for the list of hashers you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface HashersList extends InferHashers<typeof hashConfig> {}
}

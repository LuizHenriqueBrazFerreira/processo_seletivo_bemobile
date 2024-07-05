/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const SalesController = () => import('#controllers/sales_controller')
const ProductsController = () => import('#controllers/products_controller')
const ClientsController = () => import('#controllers/clients_controller')
const UsersController = () => import('#controllers/users_controller')

router.post('/register-user', [UsersController, 'create'])
router.post('/login', [UsersController, 'index'])

router
  .group(() => {
    router.get('/', [ClientsController, 'index']).as('/')
    router.get('/info', [ClientsController, 'show']).as('/info?id=')
    router.post('/create', [ClientsController, 'store']).as('/create')
    router.put('/update/:id', [ClientsController, 'update']).as('/update/:id')
    router.delete('/delete/:id', [ClientsController, 'destroy']).as('/delete/:id')
  })
  .prefix('clients')
  .as('clients')
  .use([middleware.validateToken(), middleware.validateuser()])

router
  .group(() => {
    router.get('/', [ProductsController, 'index']).as('/')
    router.get('/:id', [ProductsController, 'show']).as('/:id')
    router.post('/register', [ProductsController, 'create']).as('/register')
    router.put('/update/:id', [ProductsController, 'update']).as('/update/:id')
    router.delete('/delete/:id', [ProductsController, 'soft_destroy']).as('/delete/:id')
  })
  .prefix('products')
  .as('products')
  .use([middleware.validateToken(), middleware.validateuser()])

router
  .group(() => {
    router.get('/', [SalesController, 'index']).as('/')
    router.get('/:id', [SalesController, 'show']).as('/:id')
    router
      .post('/register', [SalesController, 'create'])
      .as('/register')
      .use(middleware.saleValidator())
    router
      .put('/update/:id', [SalesController, 'update'])
      .as('/update/:id')
      .use(middleware.saleValidator())
    router.delete('/delete/:id', [SalesController, 'destroy']).as('/delete/:id')
  })
  .prefix('sales')
  .as('sales')
  .use([middleware.validateToken(), middleware.validateuser()])

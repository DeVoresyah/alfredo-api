'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Helpers = use('Helpers')

// Consumer
Route.group(() => {
  Route.get('/', () => {
    return { greeting: 'Hello world in JSON' }
  })

  // Auth
  Route.post('/account/sign-up', 'UserController.store').validator('Register')
  Route.post('/account/sign-in', 'UserController.auth').validator('Login')

  // Account
  Route.get(`/account/profile`, 'UserController.profile').middleware(['userSession'])
  
  // Validate
  Route.post('/validate/username', 'ValidateController.username')
  Route.post('/validate/email', 'ValidateController.email')

  // Products
  Route.get('/products', 'ProductController.index')
  Route.get('/products/:slug', 'ProductController.show')

  // Category
  Route.get('/category', 'CategoryController.index')
  Route.get('/category/:slug', 'CategoryController.show')

  // Order
  Route.get(`/order`, 'OrderController.index').middleware(['userSession'])
  Route.post(`/order`, 'OrderController.store').middleware(['userSession'])
  Route.post(`/order/confirm`, 'OrderController.confirm').middleware(['userSession'])
  Route.get(`/order/:invoice`, 'OrderController.show').middleware(['userSession'])
  Route.patch(`/order/:invoice`, 'OrderController.update').middleware(['userSession'])
}).prefix('api/v1').middleware(['httpAuth'])

// Admin API
Route.group(() => {
  Route.post(`/account/sign-in`, 'AdminController.auth')
  Route.post(`/account/sign-up`, 'AdminController.store')
}).prefix('api/admin/v1').middleware(['httpAuth'])

Route.group(() => {
  Route.get('/products', 'ProductController.index')
  Route.get('/category', 'CategoryController.index')
  Route.get(`/order`, 'OrderController.index')
}).prefix('api/admin/v1').middleware(['httpAuth', 'adminAuth'])

// Public API
Route.get(`/uploads/confirmation/:file`, async({ response, params}) => {
  return response.download(Helpers.tmpPath(`uploads/confirmation/${params.file}`))
})
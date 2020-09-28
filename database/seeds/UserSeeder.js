'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    const users = await Factory.model('App/Models/User').createMany(3)

    for (const user of users) {
      const address = await Factory.model('App/Models/Address').make()
      await user.address().save(address)
    }
  }
}

module.exports = UserSeeder

'use strict'

/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class AdminSeeder {
  async run () {
    await Factory.model('App/Models/Admin').create({
      username: 'admin',
      password: 'admin',
      role: 'admin'
    });

    await Factory.model('App/Models/Admin').createMany(3);
  }
}

module.exports = AdminSeeder

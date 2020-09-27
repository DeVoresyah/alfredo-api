'use strict'

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Database = use('Database');

class ProductSeeder {
  async run () {
    const products = await Factory.model('App/Models/Product').createMany(20);

    for (const product of products) {
      const category = await Factory.model('App/Models/Category').create();

      await Factory.model('App/Models/Categories').create({
        category_id: category.id,
        product_id: product.id
      });
    }
  }
}

module.exports = ProductSeeder

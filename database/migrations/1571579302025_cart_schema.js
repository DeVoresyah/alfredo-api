'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartSchema extends Schema {
  up () {
    this.create('cart', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.integer('product_id').unsigned().notNullable()
      table.integer('qty').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cart')
  }
}

module.exports = CartSchema

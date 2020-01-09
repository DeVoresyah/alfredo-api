'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('order', (table) => {
      table.increments()
      table.string('invoice_id').notNullable().unique()
      table.integer('product_id').unsigned().notNullable()
      table.integer('qty').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.float('total', 0, 0).notNullable()
      table.string('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('order')
  }
}

module.exports = OrderSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RelationPhaseOneSchema extends Schema {
  up () {
    this.table('address', (table) => {
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
    })

    this.table('categories', (table) => {
      table
        .foreign('category_id')
        .references('id')
        .inTable('category')
        .onDelete('cascade')

      table
        .foreign('product_id')
        .references('id')
        .inTable('product')
        .onDelete('cascade')
    })

    this.table('cart', (table) => {
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')

      table
        .foreign('product_id')
        .references('id')
        .inTable('product')
        .onDelete('cascade')
    })

    this.table('order', (table) => {
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')

      table
        .foreign('product_id')
        .references('id')
        .inTable('product')
    })

    this.table('confirmation', (table) => {
      table.foreign('user_id')
        .references('id')
        .inTable('users')

      table.foreign('invoice_id')
        .references('invoice_id')
        .inTable('order')
    })
  }

  down () {
    this.table('address', (table) => { })

    this.table('categories', (table) => { })

    this.table('cart', (table) => { })

    this.table('order', (table) => { })

    this.table('confirmation', (table) => { })
  }
}

module.exports = RelationPhaseOneSchema

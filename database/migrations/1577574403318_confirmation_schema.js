'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConfirmationSchema extends Schema {
  up () {
    this.create('confirmation', (table) => {
      table.increments()
      table.string('invoice_id').notNullable().unique()
      table.integer('user_id').unsigned().notNullable()
      table.string('sender_name').notNullable()
      table.string('sender_bank').notNullable()
      table.float('amount', 0, 0).notNullable()
      table.string('image').notNullable()
      table.string('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('confirmation')
  }
}

module.exports = ConfirmationSchema

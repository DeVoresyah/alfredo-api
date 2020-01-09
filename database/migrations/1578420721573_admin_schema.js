'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminSchema extends Schema {
  up () {
    this.create('admins', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('name').notNullable()
      table.string('phone_number', 16).notNullable()
      table.string('email', 254).notNullable().unique()
      table.enu('role', ['admin', 'sales']).notNullable()
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('admins')
  }
}

module.exports = AdminSchema

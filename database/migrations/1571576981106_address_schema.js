'use strict'

const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('address', (table) => {
      table.increments()
      table.string('address').notNullable()
      table.integer('zip_code').unsigned().notNullable()
      table.string('state').notNullable()
      table.string('city').notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('address')
  }
}

module.exports = AddressSchema

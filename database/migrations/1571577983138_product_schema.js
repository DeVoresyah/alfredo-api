'use strict'

const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('product', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('thumbnail').notNullable()
      table.text('desc', 'mediumtext').notNullable()
      table.float('price', 12, 2).notNullable()
      table.integer('stock').notNullable()
      table.string('slug').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('product')
  }
}

module.exports = ProductSchema

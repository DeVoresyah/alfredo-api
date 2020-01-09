'use strict'

const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('category', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.text('desc', 'mediumtext').notNullable()
      table.string('thumbnail')
      table.string('slug').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('category')
  }
}

module.exports = CategorySchema

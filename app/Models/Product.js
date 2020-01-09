'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    static get table () {
        return 'product'
    }

    category() {
        return this.hasMany('App/Models/Categories', 'id', 'product_id')
    }
}

module.exports = Product

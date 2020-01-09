'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categories extends Model {
    product() {
        return this.belongsToMany('App/Models/Product', 'id', 'product_id')
    }

    category() {
        return this.hasOne('App/Models/Category', 'category_id', 'id')
    }
}

module.exports = Categories

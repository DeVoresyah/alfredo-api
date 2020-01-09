'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    static get table () {
        return 'category'
    }

    static get pivot() {
        return falase
    }

    product() {
        return this.belongsToMany('App/Models/Product').pivotTable('categories')
    }

    categories() {
        return this.hasOne('App/Models/Categories', 'id', 'category_id')
    }
}

module.exports = Category

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    static boot() {
        super.boot()

        this.addTrait('@provider:Lucid/OptionalQueries')
    }
    
    static get table () {
        return 'order'
    }

    static get pivot() {
        return falase
    }

    static scopeByEncodedKeyword(query, keyword) {
        keyword = `%${decodeURIComponent(keyword)}%`
    
        return query
            .where('invoice_id', 'like', keyword)
    }

    product() {
        return this.belongsTo('App/Models/Product', 'product_id', 'id')
    }
}

module.exports = Order

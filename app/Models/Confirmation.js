'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Confirmation extends Model {
    static get table () {
        return 'confirmation'
    }
}

module.exports = Confirmation

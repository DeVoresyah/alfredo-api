'use strict'

const BaseController = use('BaseController')

class StaticDataController extends BaseController {
    constructor() {
        super()
    }

    async statusOrder({ request, response }) {
        const data = [{
            id: 'waiting_payment',
            name: 'Menunggu Pembayaran'
        }, {
            id: 'process',
            name: 'Sedang Diproses'
        }, {
            id: 'done',
            name: 'Selesai'
        }]

        await this.sendResponse({ data, request, response })
    }

    async statusConfirmation({ request, response }) {
        const data = [{
            id: 'unpaid',
            name: 'Belum Dibayar'
        }, {
            id: 'paid',
            name: 'Dibayar'
        }]

        await this.sendResponse({ data, request, response })
    }
}

module.exports = StaticDataController

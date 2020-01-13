'use strict'

const BaseController = use('BaseController')
const Order = use('App/Models/Order')
const Confirmation = use('App/Models/Confirmation')
const User = use('App/Models/User')

class DashboardController extends BaseController {
    constructor() {
        super()
    }

    async index({ decoded, request, response }) {
        const users = await User.query()
            .select('username', 'name', 'email')
            .limit(5)
            .orderBy('created_at', 'desc')
            .fetch()
        const orders = await Order.query()
            .select('invoice_id', 'created_at', 'total', 'status')
            .limit(5)
            .orderBy('created_at', 'desc')
            .fetch()
        const sales = await Confirmation.query()
            .where('status', 'paid')
            .fetch()

        const allUser = await User.all()
        const allOrder = await Order.all()

        let totalUser = allUser.toJSON().length
        let totalOrder = allOrder.toJSON().length
        let earnings = 0
        
        if (sales) {
            sales.toJSON().map((item) => {
                earnings = earnings + item.amount
            })
        }

        const dataToSend = {
            totalUser,
            totalOrder,
            users,
            orders,
            earnings
        }

        await this.findResponse({ data: dataToSend, request, response })
    }
}

module.exports = DashboardController

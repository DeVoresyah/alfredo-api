'use strict'

const BaseController = use('BaseController')
const Helpers = use('Helpers')
const Confirmation = use('App/Models/Confirmation')
const Order = use('App/Models/Order')

class ConfirmationController extends BaseController {
  constructor() {
    super()
  }

  async index ({ request, response, view }) {
    const { page, limit, q } = request.get()

    let keyword = `%${decodeURIComponent(q)}%`
    let query = Confirmation.query()

    if (q) {
      query.where('invoice_id', 'like', keyword)
        .orWhere('sender_name', 'like', keyword)
        .orWhere('sender_bank', 'like', keyword)
        .orWhere('status', 'like', keyword)
    }

    const confirms = await query.orderBy('created_at', 'desc').paginate(page ? page : 1, limit ? limit : 10)
    await this.sendResponse({ data:confirms, request, response })
  }

  async accept({ params, request, response }) {
    const { id } = params

    const confirms = await Confirmation.find(id)
    const order = await Order.findBy('invoice_id', confirms.invoice_id)
    order.status = "process"
    confirms.status = "paid"

    order.save()
    confirms.save()
    await this.sendResponse({ data: { msg: 'Payment confirmation has been accepted.' }, request, response })
  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = ConfirmationController

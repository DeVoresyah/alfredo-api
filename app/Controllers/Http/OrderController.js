'use strict'

const BaseController = use('BaseController')
const Helpers = use('Helpers')
const Order = use('App/Models/Order')
const Product = use('App/Models/Product')
const Confirmation = use('App/Models/Confirmation')

class OrderController extends BaseController {
  constructor() {
    super()
  }

  async index ({ request, response }) {
    const { uid } = request.decoded
    const { page, q } = request.get()

    let keyword = `%${decodeURIComponent(q)}%`

    const orders = await Order.query()
      .where('user_id', uid)
      .optional(query => query
        .where('invoice_id', 'like', keyword)
      )
      .with('product')
      .setHidden(['product_id'])
      .paginate(page ? page : 1, 10)
    
      await this.sendResponse({ data: orders, request, response })
  }

  async store ({ request, response }) {
    const { uid } = request.decoded
    const data = request.post()

    const product = await Product.query()
      .where('id', data.product_id)
      .first()

    const randomString = (length, chars) => {
      var mask = '';
      if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
      if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (chars.indexOf('#') > -1) mask += '0123456789';
      if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
      var result = '';
      for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
      return result;
    }
    

    const total = product.price * data.qty

    const dataToSend = {
      ...data,
      invoice_id: `INV-${randomString(7, '#A')}`,
      user_id: uid,
      total,
      status: 'waiting_payment',
    }

    try {
      await Order.create(dataToSend)
      await this.createdResponse({ data: dataToSend, request, response })
    } catch(e) {
      await this.createdResponse({ data: null, errorMsg: "Can't buy product.", request, response })
    }
  }

  async show ({ params, request, response }) {
    const { invoice } = params
    const { uid } = request.decoded

    const order = await Order.query()
      .where({
        invoice_id: invoice,
        user_id: uid
      })
      .first()

    if (order) {
      await this.findResponse({
        data: order,
        request,
        response
      })
    } else {
      await this.findResponse({
        data: null,
        errorMsg: "Cannot find order, please check again.",
        request,
        response
      })
    }
  }

  async confirm ({ request, response }) {
    const { uid } = request.decoded
    const { invoice_id, sender_name, sender_bank, amount } = request.post()

    const img = request.file('proof[proof]', {
      types: ['image'],
      size: '2mb'
    })

    const newName = `${new Date().getTime()}_confirm-${invoice_id}.jpg`

    await img.move(Helpers.tmpPath('uploads/confirmation'), {
      name: newName,
      overwrite: true
    })

    const dataToSave = {
      invoice_id,
      user_id: uid,
      sender_name,
      sender_bank,
      amount,
      image: newName,
      status: 'pending'
    }

    try {
      if (!img.moved()) {
        await this.createdResponse({
          data: null,
          errorMsg: "Failed to upload image, please try again.",
          request,
          response,
        })
      }

      await Confirmation.create(dataToSave)
      await this.createdResponse({ data: dataToSave, request, response })
    } catch(e) {
      await this.createdResponse({
        data: null,
        errorMsg: "Failed to upload confirmation payment, please try again.",
        request,
        response,
      })
    }
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = OrderController

'use strict'

const BaseController = use('BaseController')
const Product = use('App/Models/Product')

class ProductController extends BaseController {
    constructor() {
        super()
    }

    async index({ request, response }) {
        const { page } = request.get()
        const products = await Product.query().paginate(page, 8)
        await this.sendResponse({ data:products, request, response })
    }

    async show({ params, request, response }) {
        const { slug } = params

        const product = await Product.query()
            .where('slug', slug)
            .first()

        if (product) {
            await this.findResponse({ data: product, request, response })
        } else {
            await this.findResponse({ 
                data: null, 
                errorMssg: "Can't find product detail.",
                request,
                response
            })
        }
    }
    
}

module.exports = ProductController

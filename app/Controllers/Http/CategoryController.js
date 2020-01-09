'use strict'

const BaseController = use('BaseController')
const Category = use('App/Models/Category')
const Product = use('App/Models/Product')
const Categories = use('App/Models/Categories')

class CategoryController extends BaseController {
    constructor() {
        super()
    }

    async index({ request, response }) {
        const category = await Category.all()
        await this.sendResponse({ data:category, request, response })
    }
    
    async show({ params, request, response }) {
        const { slug } = params
        
        const data = await Category.query()
                    .where('slug', slug)
                    .with('product')
                    .paginate(1, 6)
        // const data = fetch.toJSON()
        
        // data.product = data.product.map((item) => ({
        //     ...item,
        //     pivot: null
        // }))
        
        await this.sendResponse({ data, request, response })
    }
}

module.exports = CategoryController

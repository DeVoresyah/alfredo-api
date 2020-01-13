'use strict'

const BaseController = use('BaseController')
const Product = use('App/Models/Product')
const Categories = use('App/Models/Categories')
const Helpers = use('Helpers')
const fs = use('fs')

class ProductController extends BaseController {
    constructor() {
        super()
    }

    async index({ request, response }) {
        const { page, q, limit } = request.get()

        let keyword = `%${decodeURIComponent(q)}%`

        let query = Product.query()

        if (q) {
            query.where('title', 'like', keyword)
        }

        const products = await query.orderBy('created_at', 'desc').paginate(page ? page : 1, limit ? limit : 8)
        await this.sendResponse({ data:products, request, response })
    }

    async show({ params, request, response }) {
        const { slug } = params

        const product = await Product.query()
            .where('slug', slug)
            .with('category')
            .first()

        const dataToSend = {
            ...product.toJSON(),
            category: product.toJSON().category[0].category_id
        }

        if (product) {
            await this.findResponse({ data: dataToSend, request, response })
        } else {
            await this.findResponse({ 
                data: null, 
                errorMssg: "Can't find product detail.",
                request,
                response
            })
        }
    }
    
    async store({ request, response }) {
        const data = request.post()

        const slug = data.title.toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')

        const img = request.file('thumbnail[thumbnail]', {
            types: ['image'],
            size: '2mb'
        })
      
        const newName = `${new Date().getTime()}_${slug}.jpg`

        await img.move(Helpers.tmpPath('uploads/thumbnail'), {
            name: newName,
            overwrite: true
        })

        const saveProduct = {
            title: data.title,
            desc: data.desc,
            thumbnail: newName,
            price: data.price,
            stock: data.stock,
            slug
        }

        const product = await Product.create(saveProduct)
        await Categories.create({
            category_id: data.category,
            product_id: product.id
        })

        await this.createdResponse({ data: product, request, response })
    }

    async update({ params, request, response }) {
        const { id } = params
        const data = request.post()

        const slug = data.title.toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')

        let newName = `${new Date().getTime()}_${slug}.jpg`

        const img = request.file('thumbnail[thumbnail]', {
            types: ['image'],
            size: '2mb'
        })

        if(img) {
            await fs.unlink(Helpers.tmpPath(`uploads/thumbnail/${data.thumbnail}`), async () => {
                await img.move(Helpers.tmpPath('uploads/thumbnail'), {
                    name: newName,
                    overwrite: true
                })
            })
        }

        const product = await Product.findBy('id', id)
        const category = await Categories.findBy('product_id', id)
        
        product.title = data.title
        product.desc = data.desc
        product.thumbnail = img ? newName : data.thumbnail
        product.price = data.price
        product.stock = data.stock
        product.slug = slug

        category.category_id = data.category

        await product.save()
        await category.save()

        await this.sendResponse({ data: { msg: 'Product has been updated.' }, request, response })
    }

    async destroy({ params, request, response }) {
        const { id } = params

        const product = await Product.find(id)
        const vm = this
        await fs.unlink(Helpers.tmpPath(`uploads/thumbnail/${product.thumbnail}`), async () => {
            await product.delete()

            const dataToSend = {
                msg: 'Product has been deleted.'
            }
    
            await vm.sendResponse({ data: dataToSend, request, response })
        })
    }
}

module.exports = ProductController

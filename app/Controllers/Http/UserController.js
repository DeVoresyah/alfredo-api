'use strict'

const Hash = use('Hash')
const BaseController = use('BaseController')
const User = use('App/Models/User')
const Token = use('App/Models/Token')

class UserController extends BaseController {
    constructor() {
        super()
    }

    async index({ request, response }) {
        const { page, limit, q } = request.get()

        let keyword = `%${decodeURIComponent(q)}%`
        let query = User.query()

        if (q) {
            query.where('username', 'like', keyword)
                .orWhere('name', 'like', keyword)
                .orWhere('phone_number', 'like', keyword)
                .orWhere('email', 'like', keyword)
        }

        const users = await query.setHidden(['password']).orderBy('created_at', 'desc').paginate( page ? page : 1, limit ? limit : 10)

        await this.findResponse({ data: users, request, response })
    }

    async show({ params, request, response }) {
        const { uid } = params

        const user = await User.findBy("id", uid)
        if (!user) {
            await this.findResponse({
                data: null,
                request,
                response
            })
        } else {
            await this.findResponse({ data: user, request, response })
        }
    }

    async store({ auth, request, response }) {
        // const { name, username, phone, email, password } = request.post()
        const data = request.post()

        await User.create(data)

        const getUser = await User.findBy('email', data.email)
        const jwtToken = await auth.generate(getUser)

        const tokenToSave = {
            user_id: getUser.id,
            token: jwtToken.token,
            type: jwtToken.type,
            is_revoked: 0
        }

        await Token.create(tokenToSave)

        await this.createdResponse({ data: jwtToken, request, response })
    }

    async auth({ auth, request, response }) {
        const { email, password } = request.post()

        const user = await User.query()
            .where('email', email)
            .first()

        if (user) {
            const passwordVerified = await Hash.verify(password, user.password)

            if (passwordVerified) {
                try {
                    const attempt = await auth.attempt(email, password)

                    await Token.query()
                        .where('user_id', user.id)
                        .update({ token: attempt.token, type: attempt.type })

                    await this.loginResponse({ data: attempt, request, response })
                } catch(e) {
                    await this.loginResponse({ data: null, errorMsg: "Invalid email or password, please try again.", request, response })
                }
            } else {
                await this.loginResponse({ data: null, errorMsg: "Invalid password, please try again.", request, response })
            }
        } else {
            await this.loginResponse({ data: null, errorMsg: "User doesn't exists.", request, response })
        }

        auth.attempt(email, password)
    }

    async profile({ request, response }) {
        const { uid } = request.decoded

        const user = await User.query()
            .where('id', uid)
            .first()

        const data = {
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone_number
        }
        
        if (user) {
            await this.findResponse({ data, request, response })
        } else {
            await this.findResponse({
                data: null,
                errorMsg: "Cannot find user profile.",
                request,
                response
            })
        }
    }

    async update({ params, request, response }) {
        const { uid } = params
        const { user } = request.post()

        console.log(user)

        const findUser = await User.findBy('id', uid)
        if (!findUser) {
            await this.findResponse({
                data: null,
                errorMsg: 'Cannot find user.',
                request,
                response
            })
        } else {
            const { name, phone_number, email } = user

            findUser.name = name
            findUser.phone_number = phone_number
            findUser.email = email
            await findUser.save()
            const updatedUser = await User.findBy('id', uid)

            await this.sendResponse({
                data: updatedUser,
                request,
                response
            })
        }
    }

    async destroy({ params, request, response }) {
        const { uid } = params

        const user = await User.findBy('id', uid)
        if (!user) {
            await this.findResponse({
                data: null,
                errorMsg: 'Cannot find user.',
                request,
                response
            })
        } else {
            await user.delete()
            await this.deleteResponse({ request, response })
        }
    }
}

module.exports = UserController

'use strict'

const Hash = use('Hash')
const BaseController = use('BaseController')
const User = use('App/Models/User')
const Token = use('App/Models/Token')

class UserController extends BaseController {
    constructor() {
        super()
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
}

module.exports = UserController

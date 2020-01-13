'use strict'

const Hash = use('Hash')
const BaseController = use('BaseController')
const Admin = use('App/Models/Admin')
const Token = use('App/Models/AdminToken')

class AdminController extends BaseController {
  constructor() {
    super()
  }

  async auth ({ auth, request, response }) {
    const { username, password } = request.post()

    const user = await Admin.query()
        .where('username', username)
        .first()

    if (user) {
        const passwordVerified = await Hash.verify(password, user.password)

        if (passwordVerified) {
            const attempt = await auth.authenticator("admin").attempt(username, password)
            try {
                await Token.query()
                    .where('user_id', user.id)
                    .update({ token: attempt.token, type: attempt.type })

                await this.loginResponse({ data: attempt, request, response })
            } catch(e) {
                await this.loginResponse({ data: null, errorMsg: "Invalid username or password, please try again.", request, response })
            }
        } else {
            await this.loginResponse({ data: null, errorMsg: "Invalid password, please try again.", request, response })
        }
    } else {
        await this.loginResponse({ data: null, errorMsg: "Admin doesn't exists.", request, response })
    }
  }

  async store ({ auth, request, response }) {
    const data = request.post()

    const admin = await Admin.create(data)

    const getUser = await Admin.findBy('email', data.email)
    const jwtToken = await auth.authenticator("admin").generate(getUser)

    const tokenToSave = {
        user_id: getUser.id,
        token: jwtToken.token,
        type: jwtToken.type,
        is_revoked: 0
    }

    await Token.create(tokenToSave)

    await this.createdResponse({ data: jwtToken, request, response })
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = AdminController

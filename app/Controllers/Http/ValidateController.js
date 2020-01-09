'use strict'

const BaseController = use('BaseController')
const User = use('App/Models/User')

class RegisterController extends BaseController {
  constructor() {
    super()
  }

  async username({ request, response }) {
    const { username } = request.post()

    const user = await User.findBy('username', username)
    
    if (user) {
      this.loginResponse({ 
        data: null, 
        errorMsg: 'Username has been taken.',
        request,
        response
      })
    } else {
      this.loginResponse({
        data: {
          message: 'Username is available.'
        },
        request,
        response
      })
    }
  }
  
  async email({ request, response }) {
    const { email } = request.post()

    const user = await User.findBy('email', email)
    
    if (user) {
      this.loginResponse({ 
        data: null, 
        errorMsg: 'Email has been taken.',
        request,
        response
      })
    } else {
      this.loginResponse({
        data: {
          message: 'Email is available.'
        },
        request,
        response
      })
    }
  }
}

module.exports = RegisterController

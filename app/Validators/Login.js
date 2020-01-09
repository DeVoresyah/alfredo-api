'use strict'

const BaseController = use('BaseController')

class Login extends BaseController {
  constructor() {
    super()
  }
  
  get rules () {
    return {
      'email': 'required|email',
      'password': 'required'
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'password.required': 'You must provide a password'
    }
  }

  async fails (errorMsg) {
    const { request, response } = this.ctx

    await this.loginResponse({ data: null, errorMsg, request, response })
  }
}

module.exports = Login

'use strict'

const BaseController = use('BaseController')

class Register extends BaseController {
  constructor() {
    super()
  }

  get rules () {
    return {
      name: 'required',
      username: 'required|unique:users,username',
      phone_number: 'required',
      email: 'required|email|unique:users,email',
      password: 'required'
    }
  }

  get validateAll () {
    return true
  }

  get messages () {
    return {
      'name.required': 'You must provide a full name.',
      'username.required': 'You must provide a username',
      'username.unique': 'This username has been taken.',
      'phone_number.required': 'You must provide a phone number.',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password'
    }
  }

  async fails (errorMsg) {
    const { request, response } = this.ctx

    await this.createdResponse({ data: null, errorMsg, request, response })
  }
}

module.exports = Register

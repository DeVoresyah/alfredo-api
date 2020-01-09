'use strict'

const Env = use('Env')
const Encryption = use('Encryption')
const HttpStatus = require('http-status-codes')

class HttpAuth {
  async handle ({ request, response }, next) {
    const { authorization } = request.headers()

    const decrypt = Encryption.decrypt(authorization.split(' ')[1])

    if (decrypt != Env.get('APP_KEY')) {
      return response.status(401).json({
        response: {
          status: 401,
          message: HttpStatus.getStatusText(401),
          url: request.hostname() + request.originalUrl()
        },
        data: {
          message: HttpStatus.getStatusText(401)
        }
      })
    }

    await next()
  }
}

module.exports = HttpAuth

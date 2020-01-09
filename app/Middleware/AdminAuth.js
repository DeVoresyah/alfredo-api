'use strict'

const Env = use('Env')
const Encryption = use('Encryption')
const HttpStatus = require('http-status-codes')
const jwt = require('jsonwebtoken')

class UserSession {
  async handle ({ ctx, request, response }, next) {
    const headers = request.headers()

    try {
        jwt.verify(headers['x-auth-token'].split(' ')[1], Env.get('APP_KEY'), function(err, decoded) {
            if (err) {
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
            } else {
                request.decoded = decoded
            }
        })
    } catch(e) {
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

module.exports = UserSession

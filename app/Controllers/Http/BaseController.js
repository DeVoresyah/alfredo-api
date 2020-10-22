'use strict'

const HttpStatus = require('http-status-codes')

class BaseController {
    constructor() {
    }

    async sendResponse({ data, request, response }) {
        if (data === null) {
            response.status(422).json({
                response: {
                    status: 422,
                    message: HttpStatus.getStatusText(422),
                    url: request.hostname() + request.originalUrl()
                },
                data: {
                    message: HttpStatus.getStatusText(422)
                }
            })
        } else {
            response.status(200).json({
                response: {
                    status: 200,
                    message: HttpStatus.getStatusText(200),
                    url: request.hostname() + request.originalUrl()
                },
                data
            })
        }
    }

    async createdResponse({ data, errorMsg, request, response }) {
        if (data === null) {
            response.status(422).json({
                response: {
                    status: 422,
                    message: HttpStatus.getStatusText(422),
                    url: request.hostname() + request.originalUrl()
                },
                data: {
                    message: errorMsg
                }
            })
        } else {
            response.status(201).json({
                response: {
                    status: 201,
                    message: HttpStatus.getStatusText(201),
                    url: request.hostname() + request.originalUrl()
                },
                data
            })
        }
    }

    async loginResponse({ data, errorMsg, request, response }) {
        if (data === null) {
            response.status(422).json({
                response: {
                    status: 422,
                    message: HttpStatus.getStatusText(422),
                    url: request.hostname() + request.originalUrl()
                },
                data: {
                    message: errorMsg
                }
            })
        } else {
            response.status(200).json({
                response: {
                    status: 200,
                    message: HttpStatus.getStatusText(200),
                    url: request.hostname() + request.originalUrl()
                },
                data
            })
        }
    }

    async findResponse({ data, errorMsg, request, response }) {
        if (data == null) {
            response.status(404).json({
                response: {
                    status: 404,
                    message: HttpStatus.getStatusText(404),
                    url: request.hostname() + request.originalUrl()
                },
                data: {
                    message: errorMsg
                }
            })
        } else {
            response.status(200).json({
                response: {
                    status: 200,
                    message: HttpStatus.getStatusText(200),
                    url: request.hostname() + request.originalUrl()
                },
                data
            })
        }
    }

    async deleteResponse({ request, response }) {
        response.status(204).json({
            response: {
                status: 204,
                message: HttpStatus.getStatusText(204),
                url: request.hostname() + request.originalUrl()
            }
        })
    }
}

module.exports = BaseController

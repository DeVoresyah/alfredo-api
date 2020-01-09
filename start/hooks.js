const { hooks } = require('@adonisjs/ignitor')
const HttpStatus = require('http-status-codes')

hooks.after.providersBooted(() => {
  const Exception = use('Exception')

  Exception.handle('UserNotFoundException', async (error, {response, session}) => {
    response.status(422).json({
        response: {
            status: 422,
            message: HttpStatus.getStatusText(422),
            url: request.hostname() + request.originalUrl()
        },
        message: "User doesn't exists"
    })
  })

  Exception.handle('PasswordMisMatchException', async (error, {response, session}) => {
    response.status(422).json({
        response: {
            status: 422,
            message: HttpStatus.getStatusText(422),
            url: request.hostname() + request.originalUrl()
        },
        message: "Invalid email or password"
    })
  })
})
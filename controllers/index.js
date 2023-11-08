const register = require('./RegisterController')
const login = require('./LoginController')
const getUserById = require('./getUser')

module.exports = {
    register,
    login,
    getUserById
}
const User = require('../Models/User')

const getUserById = async (req, res) => {
    const { userId } = req.params

    if (userId.length === 24) {
        User.findById(userId).then((user) => {
            if (!user) {
                return res.json({ message: "Usuario no encontrado" })
            } else {
                const { _id, password, __v, ...rest } = user._doc
                res.json(rest)
            }
        })
    } else {
        res.json({ message: 'Contraseña incorrecta' })
    }
}


module.exports = getUserById
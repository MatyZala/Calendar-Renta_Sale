const bcrypt = require('bcrypt')
const User = require('../Models/User')

const login = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body);
    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.json({ message: 'Usuario no encontrado' })
        }
        bcrypt.compare(password, user.password).then((isValid) => {
            if (isValid) {
                const { id, name } = user
                return res.status(200).json({
                    message: "Usuario logeado",
                    user: {
                        id, name
                    }
                });
            } else {
                return res.json({ message: 'Contraseña incorrecta' })
            }
        })
    })

}


module.exports = login
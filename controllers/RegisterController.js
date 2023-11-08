const bcrypt = require('bcrypt')
const User = require('../Models/User')

const register = async (req, res) => {
    const { name, email, password } = req.body

    User.findOne({ email }).then((user) => {
        if (user) {
            return res.json({ message: "Usuario Existente" })
        } else if (!name || !email || !password) {
            return res.json({ message: "Campos faltantes" })
        } else {
            bcrypt.hash(password, 10, (error, hashedPassword) => {
                if (error) res.json(error)
                else {
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword
                    })
                    newUser.save().then((user) => {
                        res.json({ message: "Usuario creado correctamente", user })
                    })
                        .catch((error) => console.log(error))
                }
            })
        }
    })
}


module.exports = register
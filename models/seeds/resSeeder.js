const bcrypt = require('bcryptjs')
const { users, restaurants } = require('../seedData')
const Res = require('../resModel')
const User = require('../user')

// const resList = require('../../restaurant.json')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('../../config/mongoose')

db.once('open', () => {

    Promise.all(
        users.map((user, index) =>
            bcrypt.genSalt(10)
                .then(salt => bcrypt.hash(user.password, salt))
                .then(hash =>
                    User.create({
                        name: user.name,
                        email: user.email,
                        password: hash,
                    })
                )
                .then((user) => {
                    const userId = user._id

                    return Promise.all(
                        Array.from(
                            restaurants.slice(index * 3, (index + 1) * 3),
                            restaurant => Res.create({ ...restaurant, userId })
                        )
                    )
                })
                .catch(err => console.log(err))
        )
    )
        .then(() => {
            console.log('done')
            process.exit()
        })

})


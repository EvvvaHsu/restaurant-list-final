const Res = require('../resModel')
const resList = require('../../restaurant.json')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('../../config/mongoose')

db.once('open', () => {
    Res.create(resList.results)
    console.log('done')
})


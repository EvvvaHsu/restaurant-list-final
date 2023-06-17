const express = require("express")
const router = express.Router()
const Res = require('../../models/resModel')   //載入model

router.get('/', (req, res) => {
    // console.log(req.query)

    const keyword = req.query.keyword.trim().toLowerCase()

    if (!keyword) {
        return res.redirect('/')
    }

    Res.find({})
        .lean()
        .then(restaurants => {
            const filteredRestaurant = restaurants.filter(data => data.name.toLowerCase().includes(keyword) || data.name_en.toLowerCase().includes(keyword) || data.category.toLowerCase().includes(keyword))

            res.render('index', { restaurants: filteredRestaurant, keyword })
        })
        .catch(error => console.log(error))


})

module.exports = router
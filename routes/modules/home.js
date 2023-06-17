const express = require("express")
const router = express.Router()
const Res = require('../../models/resModel')   //載入model

router.get('/', (req, res) => {

    const userId = req.user._id
    //拿到所有的餐廳資料
    Res.find({ userId })
    .lean()
    .then( restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error)) 
})

module.exports = router
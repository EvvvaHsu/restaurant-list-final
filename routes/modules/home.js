const express = require("express")
const router = express.Router()
const Res = require('../../models/resModel')   //載入model

router.get('/', (req, res) => {

    //拿到所有的餐廳資料
    Res.find()
    .lean()
    .then( restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error)) 
})

module.exports = router
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

router.post('/', (req, res) =>{
    
    const userId = req.user._id
    const order = req.body.alphabeticalOrder
    // console.log(req.body)

    let sortQuery = {}
    if (order === 'A-Z') {
        sortQuery = { name_en: 1 }
    } else if (order === 'Z-A') {
        sortQuery = { name_en: -1 }
    } else if (order === 'sortCategory') {
        sortQuery = { category: 1 }
    } else if (order === 'sortLocation') {
        sortQuery = { location: 1 }
    }

    return Res
    .find({ userId })
    .lean()
    .sort(sortQuery)
    .then((restaurants) => 
        res.render('index', { restaurants, order })
    )
    .catch(error => console.error(error))
})

module.exports = router
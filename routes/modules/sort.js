const express = require("express")
const router = express.Router()
const Res = require('../../models/resModel')   //載入model


router.get("/:sort", (req, res) => {
    const userId = req.user._id

    const sortOption = req.params.sort

    let sortQuery = {}
    if (sortOption === 'sortAtoZ') {
        sortQuery = { name_en: 1 }
    } else if (sortOption === 'sortZtoA') {
        sortQuery = { name_en: -1 }
    } else if (sortOption === 'sortCategory') {
        sortQuery = { category: 1 }
    } else if (sortOption === 'sortLocation') {
        sortQuery = { location: 1 }
    }

    return Res
        .find({ userId})
        .lean()
        .sort(sortQuery)
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))


    //    if (sortOption === "sortAtoZ"){
    //     return Res.find()
    //     .lean()
    //     .sort({name_en: "asc"})
    //     .then(restaurants => res.render("index", {restaurants}))
    //     .catch(err => console.log("err!"))
    //    } else if (sortOption === "sortZtoA"){
    //     return Res.find()
    //     .lean()
    //     .sort({name_en: "desc"})
    //     .then(restaurants => res.render("index", {restaurants}))
    //     .catch(err => console.log("err!"))
    //    } else if (sortOption === "sortCategory") {
    //     return Res.find()
    //     .lean()
    //     .sort({category: -1})
    //     .then(restaurants => res.render("index", {restaurants}))
    //     .catch(err => console.log("err!"))
    //    } else if (sortOption ==="sortLocation"){
    //     return Res.find()
    //     .lean()
    //     .sort({location: 1})
    //     .then(restaurants => res.render("index", {restaurants}))
    //     .catch(err => console.log("err!"))
    //    }


})



module.exports = router
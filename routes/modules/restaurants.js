const express = require("express")
const router = express.Router()
const Res = require('../../models/resModel')   //載入model


router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const phone = req.body.phone
    const location = req.body.location
    const rating = req.body.rating
    const image = req.body.image
    const google_map = req.body.google_map
    const description = req.body.description

    const restaurant = new Res({ name, name_en, category, phone, location, rating, image, google_map, description })
    return restaurant.save()
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {

    const id = req.params.id
    return Res.findById(id)
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(error => console.log(error))

})

router.get('/:id/edit', (req, res) => {

    const id = req.params.id
    return Res.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => console.log(error))

})

router.put('/:id', (req, res) => {
    const id = req.params.id
    let { name, name_en, category, phone, location, rating, image, google_map, description } = req.body

    return Res.findById(id)
        .then(restaurant => {
            restaurant.name = name,
                restaurant.name_en = name_en,
                restaurant.category = category,
                restaurant.image = image,
                restaurant.rating = rating,
                restaurant.location = location,
                restaurant.phone = phone,
                restaurant.google_map = google_map,
                restaurant.description = description

            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    return Res.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


module.exports = router
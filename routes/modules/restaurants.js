const express = require("express")
const router = express.Router()
const Res = require('../../models/resModel')   //載入model


router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    const userId = req.user._id
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const phone = req.body.phone
    const location = req.body.location
    const rating = req.body.rating
    const image = req.body.image
    const google_map = req.body.google_map
    const description = req.body.description

    const restaurant = new Res({ userId, name, name_en, category, phone, location, rating, image, google_map, description })
    return restaurant.save()
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Res.findOne({ _id, userId})
        .lean()
        .then(restaurant => res.render('show', { restaurant }))
        .catch(error => console.log(error))

})

router.get('/:id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Res.findOne({ _id, userId})
        .lean()
        .then(restaurant => res.render('edit', { restaurant, userId }))
        .catch(error => console.log(error))

})

router.put('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Res.findByIdAndUpdate({ _id, userId }, req.body)
      .then(() => res.redirect(`/restaurants/${_id}`))
      .catch(error => console.log(error))
  })

router.delete('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id

    return Res.findOne({ _id, userId})
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//其他寫法:
// router.delete('/:id', (req, res) => {
//     const userId = req.user._id
//     const _id = req.params.id
//     Res.findByIdAndDelete({ _id, userId })
//       .then(() => res.redirect("/"))
//       .catch(error => console.log(error))
//   })


module.exports = router
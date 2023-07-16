const express = require("express")
const router = express.Router()
const Res = require('../../models/resModel')   //載入model


router.get('/new', (req, res) => {
    return res.render('new', { errors: '' })
})

router.post('/', (req, res) => {
    const userId = req.user._id
    return Restaurants.create({ ...req.body, userId })
        .then(() => {
            return res.redirect('/')
        })
        .catch(error => next(error))
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
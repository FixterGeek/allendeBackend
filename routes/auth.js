const router                         = require('express').Router()
const User                           = require('../models/User')
const passport                       = require('passport')
const { verifyToken, generateToken } = require('../helpers/jwt')
const bcrypt                         = require('bcrypt')
const mailer                         = require('../helpers/mailer')
const QRCode                         = require('qrcode')

router.post('/signup', (req, res, next) => {
  const {email} = req.body
  let h4$hP4$$ = bcrypt.hashSync(email, bcrypt.genSaltSync(7))
  User.register(req.body, h4$hP4$$)
  //User.register(req.body, req.body.password)
  .then(user => {
    const {_id} = user
    link = `https://backendallende.herokuapp.com//profile/${_id}`
    //link = `http://localhost:3001/profile/${_id}`
    //link = `https://${req.headers.host}/profile/${_id}`
    QRCode.toDataURL(link, (err, QR) => {
      if (err) throw err
      User.findByIdAndUpdate(_id, { QR }, { new: true })
      .then(user => {
        mailer.welcomeMail(user.business_name, user.email, h4$hP4$$)
        res.status(201).json(user)
      })
      .catch(err => console.log(err))
    })
  })
  .catch(err => next(err))
})

router.post('/change_password', (req, res, next) => {
  const {email} = req.body 
  if (email) {
    User.findOne({email}) 
    .then(user => {
      return user.setPassword(req.body.password)
    })
    .then(user => {
      user.save()
      return User.findByIdAndUpdate(user._id, { active: true }, { new: true })
    })
    .then(user => res.json(user))
    .catch(e=>next(e));
  } else {
    res.json({ message: `You've already changed your password` })
  }
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const {user} = req
  const token = generateToken(user)
  res.status(200).json({ user, token })
})

router.get('/profile/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => next(err))
})

module.exports = router
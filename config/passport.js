const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/user')


module.exports = app => {

    app.use(passport.initialize())
    app.use(passport.session())

    passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return done(null, false, req.flash('warning_msg', "這個 Email 還沒有被註冊過!"))
                }

                return bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return done(null, false, req.flash('warning_msg', "帳號和密碼不相符!"))
                        }
                        return done(null, user)
                    })
            })
            .catch(err => done(err, false))
    }))


    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
    },
        (accessToken, refreshToken, profile, done) => {
            // console.log(profile)

            const { name, email } = profile._json

            User.findOne({ email })
                .then(user => {
                    if (user) return done(null, user)

                    const randomPassword = Math.random().toString(36).slice(-8)

                    bcrypt.genSalt(10)
                        .then(salt => bcrypt.hash(randomPassword, salt))
                        .then(hash => User.create({
                            name,
                            email,
                            password: hash
                        }))
                        .then(user => done(null, user))
                        .catch(err => done(err, false))
                })

        }
    ));


    //用user去找id, 將使用者資料, 如userId存去session中
    passport.serializeUser((user, done) => {
        // console.log(user)
        done(null, user.id)
    })

    //用id去找user
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .lean()
            .then(user => done(null, user))
            .catch(err => done(err, null))
    })
}

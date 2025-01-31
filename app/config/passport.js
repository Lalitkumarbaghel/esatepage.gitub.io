const LocalStrategy = require('passport-local').Strategy;
const User = require('../modals/user');
const bcrypt = require('bcrypt');
function init(passport){
    passport.use(new LocalStrategy({usernameField:'email', passwordField : 'password'}, async (email,password, done)=>{
       const user = await User.findOne({email:email})
       //console.log(user);
       if(!user){
        return done(null, false, {message: 'NO User with this Email'})
       }
       bcrypt.compare(password, user.password).then(match=>{
        if(match){
            return done(null, user, {message: 'Logged in successfully'})
        }
        return done(null, false, {message: 'wrong email or passsword'});
    }).catch(err=>{
        return done(null, false, {message: 'something went wrong'});
    })
       
    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    passport.deserializeUser( async(id,done)=>{
        await User.findOne({_id:id})
        .then((result, err)=>{
            done(err,result);
        }).catch((err)=>{
            console.log(err)
        })
    })
}

module.exports = init;
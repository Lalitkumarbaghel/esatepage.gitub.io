const User = require('../../modals/user')
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController(){
    return{
        login(req,res){
            res.render('login')
        },
        postlogin(req,res,next){
            passport.authenticate('local', (err,user,info)=>{
                const {email, password} = req.body;
                if(!email || !password){
                    req.flash('error', 'All fields are required');
                    return res.redirect('/login'); 
                }
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err)=>{
                    if(err){
                       req.flash('error', info.message)
                       return next(err) 
                    }
                    return res.redirect('/');
                })
            })(req,res,next)
        },
        register(req,res){
            res.render('signup');
        },
    
        async postregister(req,res){
            const {name, email, password, re_password} = req.body
            if(!name || !email || !password || !re_password){
                req.flash('info', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);
                req.flash('password', password);
                return res.redirect('/signup');
            }
            if(password !== re_password){
                req.flash('name', name);
                req.flash('email', email);
                req.flash('info', 'Password is not match');
                return res.redirect('/signup');   
            }
            // User.exists({email:email}).then((result)=>{
            //     if(result){
            //         req.flash('info', 'Email Taken Already');
            //         req.flash('name', name);
            //         return res.redirect('/signup')
            //     }
            // }).catch((err)=>{
            //         req.flash('info', 'Email went wrong');
            //         req.flash('name', name);
            //         return res.redirect('/signup')
            // })
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({
                name:name,
                email:email,
                password:hashedPassword,
                re_password:hashedPassword
            })
            
            user.save().then(()=>{
                return res.redirect('/');
            }).catch((err)=>{
                req.flash('info', 'Something went wrong');
                return res.redirect('/signup');
            })
        },
        logout(req, res){
            req.logout(()=> {res.redirect('/');
            });
            
        }
    }
}

module.exports = authController;
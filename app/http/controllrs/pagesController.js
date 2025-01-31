function pagesController(){
    return{
        about(req,res){
            res.render('about-us')
        },
        contactus(req,res){
            res.render('contact-us')
        },
        terms(req,res){
            res.render('terms-condition')
        },
        dis(req,res){
            res.render('disclaimer')
        }
    }
}

module.exports = pagesController;
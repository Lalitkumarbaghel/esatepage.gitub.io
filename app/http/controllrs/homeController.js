const news = require('../../modals/news')
function homeController(){
    return{
        async index(req,res){
            const News = await news.find({category:'0News', }).sort({_id:-1}).limit(2);
            //const Articles = await news.find({category:'0News', }).sort({_id:-1}).limit(2);
            res.render('index', {News:News})
        }
    }
}
module.exports = homeController;
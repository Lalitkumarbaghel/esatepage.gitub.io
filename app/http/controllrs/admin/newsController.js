const newsPosts = require('../../../modals/news')
const cloudinary = require('cloudinary');
function newsInit(){
    return{
        newss(req,res){
                    res.render('news')
                },
                news(req,res){
                    res.render('news-post')
                },
                newspost(req,res){
                   const { addNewsType, category, title, description} = req.body;
                   if(!req.files){
                        req.flash('error', 'No image uploaded!');
                        return res.redirect('/news-post')
                   }
                    const file = req.files.img;
                    if(!addNewsType || !category || !title || !description){
                        req.flash('error', 'All fields are required');
                        return res.redirect('/news-post')
                    }
                    
                    cloudinary.uploader.upload(file.tempFilePath, (result,err)=>{
                            const News = new newsPosts({
                                    addNewsType:addNewsType,
                                    category:category,
                                    title:title,
                                    description:description,
                                    img:result.url
                                })
                                News.save()
                                .then(()=>{
                                    return res.redirect('/dashboard');
                                })
                                .catch((err)=>{
                                    req.flash('error', 'Something went wrong');
                                    return res.redirect('/news-post');
                                })
                             })
                    
                    
                },
        async editnews(req,res){
            const news = await newsPosts.findById(req.params.id)
            // const polls = await pollspost.find()
            // const ringtone = await ringtonePost.find()
            // const newsJoin =  news.concat(polls, ringtone)
            
            // for(let i =0; i<newsJoin.length;i++){
            //     if(newsJoin[i]._id == req.params.id){
            //         return res.render('news-post-edit', {news:newsJoin[i]})
            //     }
            // }
            if(news){
                return res.render('news-post-edit', {news:news})   
            }
            return res.send('not found id')

            //const newId = newsJoin.
            
        },
        async editnewspost(req,res){
            let id = req.params.id;
             await newsPosts.findByIdAndUpdate(id,
                {
                    title:req.body.title,
                    description:req.body.description
                }
             )
             .then((result)=>{
                return res.redirect('/dashboard')
             })
             .catch((err)=>{
                return res.json(err)
             })
          
            

        },
        async deletenews(req,res){
            
            await newsPosts.findByIdAndDelete({_id:req.params.id})
            .then((result)=>{
                return res.redirect('/dashboard')
            })
            .catch((err)=>{
                return res.json(err)
            })
        }
    }
}

module.exports = newsInit;
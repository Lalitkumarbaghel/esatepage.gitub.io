const newsPosts = require('../../../modals/news')
const pollspost = require('../../../modals/polls')

const cloudinary = require('cloudinary');
// cloudinary.config({
//     cloud_name: 'da1rvqpxk',
//     api_key: '232498318747879',
//     api_secret: 'bYfbuMAhMZcVuh0E412NBNuyCW8',
    
// });
// require('dotenv').config();

function dashController(){
    return{
        async dashboard(req,res){
            
            
            const news = await newsPosts.find().sort({'_id':-1})
            // const polls = await pollspost.find()
            // const ringtone = await ringtonePost.find()
            
            // const newsJoin =  news.concat(polls, ringtone)
            // newsJoin.sort((a, b) => b.createdAt - a.createdAt);
            
            
            return res.render('dashboard', {news:news})
        },
        
        postpoll(req,res){
            
            res.render('post-polls')
        },
        pollpost(req,res){
            const {question, optionA, optionB, optionC, optionD} = req.body
            if(!question || !optionA || !optionB || !optionC || !optionD){
                req.flash('error', 'All fields are required');
                return res.redirect('/post-polls'); 
            }
            const Polls = new pollspost({
                question:question,
                optionA:optionA,
                optionB:optionB,
                optionC:optionC,
                optionD:optionD
            })
            Polls.save()
            .then(()=>{
                return res.redirect('/polls');
            })
            .catch(()=>{
                req.flash('error', 'Something went wrong');
                return res.redirect('/post-polls');
            })
            //res.render('post-polls')
        },
        async geteditpoll (req,res){
            const polls = await pollspost.find().sort({_id:-1})
            return res.render('edit-polls', {polls:polls})
        },
       async pollsedit (req,res){
            const getPolls = await pollspost.findById(req.params.id);
            if(getPolls == null){
                return res.redirect('/post-polls')
            }
            return res.render('polls-edit', {getPolls:getPolls})
        },
        async Deletepolls(req,res){
            await pollspost.findByIdAndDelete({_id:req.params.id})
            .then(result =>{
                return res.redirect('/polls')
            })
            .catch(err=>{
                return res.json(err)
            })
        },
        async pollseditpost (req,res){
            let id = req.params.id;
            await pollspost.findByIdAndUpdate(id,
                {
                    question:req.body.question,
                    optionA:req.body.optionA,
                    optionB:req.body.optionB,
                    optionC:req.body.optionC,
                    optionD:req.body.optionD
                }
            )
            .then(result =>{
                return res.redirect('/polls')
            })
            .catch(err=>{
                return res.json(err)
            })
        },
        logindash(req,res){
            res.render('admin/login')
        },
        async polls(req,res){
            const getPolls =await pollspost.find();
            res.render('polls', {polls:getPolls})
        },
        

    }
}

module.exports = dashController;
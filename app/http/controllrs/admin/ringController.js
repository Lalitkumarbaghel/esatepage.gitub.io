const ringtonePost = require('../../../modals/ringtone');
const cloudinary = require('cloudinary');
function ringInit(){
    return{
        ringtone(req,res){
                    res.render('ringtone')
                },
                postringtone(req,res){
                    res.render('post-ringtone')
                },
                ringtonepost(req,res){
                    const {category, title, name} = req.body;
                    const fileRing = req.files.ring
                    console.log(fileRing)
                    cloudinary.uploader.upload(fileRing.tempFilePath, 
                        {resource_type: "raw"},
                         (result,err)=>{
                        // req.body.song.audio = result.secure_url;
                        // console.log(req.body.song.audio)
                        console.log(result)
                    })
                    //const file2 = req.files.ring;
                    //console.log(file2)
                    // const ringFile = req.files.ring;
                    // const file2 = req.files.img;
                    // console.log(file)
                    // if(!category || !title || !name){
                    //     req.flash('error', 'All Fields are required')
                    //     return res.redirect('/post-ringtone')
                    // }
                    // const Ringtone =  new ringtonePost({
                    //     category:category,
                    //     title:title,
                    //     name:name,
                    //     ring:ring
                    // })
                    // Ringtone.save()
                    // .then(()=>{
                    //     return res.redirect('/dashboard')
                    // })
                    // .catch((err)=>{
                    //     req.flash('error', `${err}`)
                    // })
                }
    }
}
module.exports = ringInit;
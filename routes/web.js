const homeController = require('../app/http/controllrs/homeController');
const authController = require('../app/http/controllrs/authController');
const pagesController = require('../app/http/controllrs/pagesController');
const dashController = require('../app/http/controllrs/admin/dashboardController')
const guest = require('../app/http/middleware/guest')
const guestAuth = require('../app/http/middleware/guestAuth')
const ringController = require('../app/http/controllrs/admin/ringController')
const newsController = require('../app/http/controllrs/admin/newsController')
function routInit(app){
    app.get('/', homeController().index)
    app.get('/about-us', pagesController().about)
    app.get('/contact-us', pagesController().contactus)
    app.get('/terms-condition', pagesController().terms)
    app.get('/disclaimer', pagesController().dis)
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postlogin)
    app.get('/signup', guest, authController().register)
    app.post('/signup', authController().postregister)
    app.post('/logout', authController().logout)
    //admin
    app.get('/dashboard', guestAuth, dashController().dashboard)
    app.get('/news', guestAuth, newsController().newss)
    app.get('/news-post', guestAuth, newsController().news)
    app.post('/news-post', guestAuth, newsController().newspost)
    app.get('/post-polls',guestAuth, dashController().postpoll)
    app.post('/post-polls',guestAuth, dashController().pollpost)
    app.get('/polls', guestAuth, dashController().polls)
    app.get('/ringtone', guestAuth, ringController().ringtone)
    app.get('/post-ringtone', guestAuth, ringController().postringtone)
    app.post('/post-ringtone', guestAuth, ringController().ringtonepost)
    app.get('/admin/login', dashController().logindash)
    app.get('/edit-polls',guestAuth, dashController().geteditpoll)
    //edit pages
    app.get('/news-post/edit/:id?', guestAuth, newsController().editnews)
    app.post('/news-post/edit/:id?', guestAuth, newsController().editnewspost)
    app.get('/news-post/delete/:id?', guestAuth, newsController().deletenews)
    app.get('/polls/edit/:id?',guestAuth, dashController().pollsedit)
    app.post('/polls/edit/:id?',guestAuth, dashController().pollseditpost)
    app.get('/polls/delete/:id?',guestAuth, dashController().Deletepolls)
}

module.exports = routInit;
const Course = require('../Models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
    // [GET] news
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('home',
                    {
                        courses: mutipleMongooseToObject(courses)
                    });
            })
            .catch(err => next.err);
        // res.render('home');
    }
    // [GET] /search
    search(req, res) {
        res.render('search')
    }
}
module.exports = new SiteController;
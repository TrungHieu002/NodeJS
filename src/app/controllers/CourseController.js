const Course = require('../Models/Course')
const { mongooseToObject } = require('../../util/mongoose')
class CourseController {
    // [GET] /show
    show(req, res,next) {
        Course.findOne({slug: req.params.slug})
        .then(courses => {
            res.render('courses/show',{
                courses: mongooseToObject(courses)
            })
        })
        .catch(err => next.err)
    }
    create(req, res,next) {
       res.render('courses/create')
    }
}
module.exports = new CourseController;
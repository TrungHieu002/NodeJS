const Course = require('../Models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')
class MeController {

    StoredCourses(req, res, next) {
        let courseQuery = Course.find({})
        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/storedcourses', {
                    deletedCount, 
                    courses: mutipleMongooseToObject(courses)
                }))
            .catch(err => next.err)
    }
    CrashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses =>
                //render folder
                res.render('me/trashcourses', {
                    courses: mutipleMongooseToObject(courses)
                })
            )
            .catch(err => next.err)
    }
}
module.exports = new MeController();
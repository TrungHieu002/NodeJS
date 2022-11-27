const Course = require('../Models/Course')
const { mongooseToObject } = require('../../util/mongoose')
class CourseController {
    // [GET] /show
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(courses => {
                res.render('courses/show', {
                    courses: mongooseToObject(courses)
                })
            })
            .catch(err => next.err)
    }
    create(req, res, next) {
        res.render('courses/create')
    }
    // [POST]
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.idVideo}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLASKzlP1M97je9EL0hFupOzQs23qg`
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect(`/me/stored/courses`))
            .catch(err => next.err)
    }
    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(courses => {
                res.render('courses/edit', {
                    courses: mongooseToObject(courses)
                })
            })
            .catch(err => next.err)
    }
    // [PUT]
    update(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.idVideo}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLASKzlP1M97je9EL0hFupOzQs23qg`
        Course.findByIdAndUpdate(req.params.id, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(err => next.err)
    }
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(err => next.err)
    }
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(err => next.err)
    }
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(err => next.err)
    }
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))
                    .catch(err => next.err)
                break;
            default:
                req.json({ message: 'Action is invalid!' });
        }
    }
}
module.exports = new CourseController();
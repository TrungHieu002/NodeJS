const express = require('express')
const router = express.Router()
const courseController = require('../app/controllers/CourseController')

router.get('/create',courseController.create);
router.post('/store',courseController.store);
router.post('/handle-form-actions',courseController.handleFormActions);
router.delete('/:id',courseController.delete);
router.get('/:id/edit',courseController.edit);
router.patch('/:id/restore',courseController.restore);
router.delete('/:id/force',courseController.forceDelete);
router.put('/:id',courseController.update);
router.get('/:slug',courseController.show);

module.exports = router;
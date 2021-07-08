const router = require('express').Router();
const schoolController = require('../app/controllers/SchoolController');
const multer = require('multer');
const fileUploader = require('../app/middleware/uploadMiddleware');

router.post(
    '/',
    fileUploader.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
    ]),
    schoolController.create
);

router.post(
    '/:id',
    fileUploader.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
    ]),
    schoolController.update
);

router.use(multer().none());
router.get('/search/location', schoolController.searchByLocation);
router.get('/search/code', schoolController.searchByCode);

router.get('/test', schoolController.test);
router.get('/search', schoolController.searchByName);
router.get('/filter', schoolController.filter);
router.get('/:id', schoolController.getById);
router.get('/:id/reviews', schoolController.getReviewsByIdSchool);
router.get('/', schoolController.getAll);
router.get('/:id/number-of-reviews', schoolController.countReviewsByIdSchool);
router.get('/:id/type-of-schools', schoolController.filterByTypeOfSchool);
router.delete('/:id', schoolController.delete);

module.exports = router;

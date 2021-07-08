const router = require('express').Router();
const postController = require('../app/controllers/PostController');
const authMiddleWare = require('../app/middleware/auth');
const multer = require('multer');

router.use(multer().none());

router.get('/', postController.getAll);
router.get('/report', postController.getAllReportedPost)
router.get('/:id', postController.getById);


//router.get('/:id/comments', postController.getCommentsByIdReview);
router.use(authMiddleWare);

router.post('/', postController.create);
router.post('/:id/report', postController.report);
router.post('/:id/decline', postController.decline);
router.delete('/:id', postController.delete);

// router.post('/auth', threadController.createAuth);

router.put('/:id', postController.update);


// router.patch('/:id/upvote', reviewController.upvote);

// router.patch('/:id/downvote', reviewController.downvote);

// router.delete('/:id', reviewController.delete);

module.exports = router;

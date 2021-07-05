const router = require('express').Router();
const reviewController = require('../app/controllers/ReviewController');
const authMiddleWare = require('../app/middleware/auth');
const multer = require('multer');

router.use(multer().none());

router.get('/', reviewController.getAll);

router.get('/reported', reviewController.getReported);

router.get('/users/:id', reviewController.getReviewsByIdUser);

router.get('/:id', reviewController.getById);

router.get('/:id/comments', reviewController.getCommentsByIdReview);

router.post('/anonymous', reviewController.createAnonymous);

// router.use(authMiddleWare);

router.post('/auth', reviewController.createAuth);

router.post('/:idReview/report', reviewController.report);

router.post('/:idReview/decline-report', reviewController.declineReport);

router.put('/:id', reviewController.update);

router.patch('/:id/upvote', reviewController.upvote);

router.patch('/:id/downvote', reviewController.downvote);

router.delete('/:id', reviewController.delete);

router.delete('/:_id/user', reviewController.deteleUserReview);

module.exports = router;

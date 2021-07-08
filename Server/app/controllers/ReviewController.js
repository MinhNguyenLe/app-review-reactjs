const Review = require("../models/Review");
const Comment = require("../models/Comment");
const User = require("../models/User");

const reviewCtrl = {
  getReviewsByIdUser: async (req, res) => {
    try {
      let id = req.params.id;
      let reviews = await Review.find({ idUser: id })
        .populate("idUser")
        .populate("idSchool");
      for (let i = 0; i < reviews.length; i++) {
        let comments = await Comment.find({ idReview: reviews[i]._id });
        reviews[i] = { ...reviews[i]._doc, comments: comments.length };
      }
      return res.json(reviews);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAll: async (req, res) => {
    try {
      let reviews = await Review.find({})
        .populate("idUser")
        .populate("idSchool");
      for (let i = 0; i < reviews.length; i++) {
        let comments = await Comment.find({ idReview: reviews[i]._id });
        reviews[i] = { ...reviews[i]._doc, comments: comments.length };
      }

      return res.json(reviews);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getReported: async (req, res) => {
    try {
      let reviews = await Review.find({})
        .populate("idUser")
        .populate("idSchool");
      reviews = reviews.filter((review) => {
        return review.report != undefined && review.report.count > 0;
      });
      return res.json(reviews);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getById: async (req, res) => {
    try {
      let id = req.params.id;
      let reviews = await Review.findById(id)
        .populate("idUser")
        .populate("idSchool");
      let comments = await Comment.find({ idReview: id });
      reviews = { ...reviews._doc, comments: comments.length };
      return res.json(reviews);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCommentsByIdReview: async (req, res) => {
    const id = req.params.id;
    Comment.find({ idReview: id })
      .populate("idUser")
      .then((cmt) => {
        return res.json(cmt);
      })
      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  },
  createAuth: async (req, res) => {
    try {
      const { idSchool, idUser, ratePoint, positive, negative, advice } =
        req.body;

      const newReview = new Review({
        idSchool: idSchool,
        idUser: idUser,
        ratePoint: ratePoint,
        positive: positive,
        negative: negative,
        advice: advice,
      });
      await newReview.save();

      res.status(201).json({ review: newReview });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createAnonymous: async (req, res) => {
    try {
      const { ratePoint, idSchool, positive, negative, advice } = req.body;
      const newReview = new Review({
        idSchool: idSchool,
        ratePoint: ratePoint,
        positive: positive,
        negative: negative,
        advice: advice,
      });
      await newReview.save();

      res.status(201).json({ review: newReview });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  update: async (req, res) => {
    try {
      let id = req.params.id;
      const { positive, negative, advice } = req.body;
      const review = await Review.findById(id);

      if (review === null || review.length === 0 || review === undefined) {
        return res.status(404).json({ msg: "Can't find review" });
      }
      review.positive = positive;
      review.negative = negative;
      review.advice = advice;
      await review.save();
      return res.status(200).json({ msg: "Updated review" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      let id = req.params.id;
      const review = await Review.findById(id);

      if (review === null || review.length === 0 || review === undefined) {
        return res.status(404).json({ msg: "Can't find review" });
      }
      await Review.deleteOne(review);
      return res.json({ msg: "Deleted review" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deteleUserReview: async (req, res) => {
    try {
      let id = req.params.id;
      await Review.deleteMany({ idUser: id });
      return res.json({ msg: "Deleted all reviews of user" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  upvote: async (req, res) => {
    try {
      let id = req.params.id;
      let idUser = req.body.id;
      const review = await Review.findById(id);

      if (review === null || review.length === 0 || review === undefined) {
        return res.status(404).json({ msg: "Can't find review" });
      }
      let up = review.rateValue.up.idUser.includes(idUser);
      let down = review.rateValue.down.idUser.includes(idUser);

      if (up) {
        review.rateValue.up.count -= 1;
        let index = review.rateValue.up.idUser.indexOf(idUser);
        review.rateValue.up.idUser.splice(index, 1);
      } else if (down) {
        review.rateValue.down.count -= 1;
        let index = review.rateValue.down.idUser.indexOf(idUser);
        review.rateValue.down.idUser.splice(index, 1);
        review.rateValue.up.count += 1;
        review.rateValue.up.idUser.push(idUser);
      } else if (!up && !down) {
        review.rateValue.up.count += 1;
        review.rateValue.up.idUser.push(idUser);
      }

      await review.save();
      return res.json({ review });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  downvote: async (req, res) => {
    try {
      let id = req.params.id;
      let idUser = req.body.id;
      const review = await Review.findById(id);

      if (review === null || review.length === 0 || review === undefined) {
        return res.status(404).json({ msg: "Can't find review" });
      }

      let up = review.rateValue.up.idUser.includes(idUser);
      let down = review.rateValue.down.idUser.includes(idUser);

      if (down) {
        review.rateValue.down.count -= 1;
        let index = review.rateValue.down.idUser.indexOf(idUser);
        review.rateValue.down.idUser.splice(index, 1);
      } else if (up) {
        review.rateValue.up.count -= 1;
        let index = review.rateValue.up.idUser.indexOf(idUser);
        review.rateValue.up.idUser.splice(index, 1);
        review.rateValue.down.count += 1;
        review.rateValue.down.idUser.push(idUser);
      } else if (!up && !down) {
        review.rateValue.down.count += 1;
        review.rateValue.down.idUser.push(idUser);
      }

      await review.save();
      return res.json({ review });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  report: async (req, res) => {
    try {
      let idReview = req.params.idReview;
      let message = req.body.message;
      let review = await Review.findOne({ _id: idReview });
      if (review.report == undefined) {
        review.report = {
          count: 0,
          message: [],
        };
      }
      review.report.count = review.report.count + 1;
      review.report.message.push(message);
      await review.save();
      return res.json({ review });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  declineReport: async (req, res) => {
    try {
      let idReview = req.params.idReview;
      let review = await Review.findOne({ _id: idReview });
      review.report = {
        count: 0,
        message: [],
      };
      await review.save();
      return res.json({ review });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = reviewCtrl;

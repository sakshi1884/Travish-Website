const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const {validateReview,isLogin,isReviewAuthor} =require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// post reviews route
router.post("/",isLogin,validateReview,wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId",isLogin,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;
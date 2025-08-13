const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLogin,isOwner,validateListing} =require("../middleware.js");

const listingController = require("../controllers/listings.js");

const{storage}= require("../cloudconfig.js");
const multer = require('multer');
const upload =multer({storage});

//search route
router.get('/search', listingController.searchByLocation);

//filter route
router.get('/filter', listingController.filterByCategory);


router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLogin,
    upload.single('image'),
    validateListing,
    wrapAsync(listingController.createListing)
);
// .post(upload.single('listing[image][url]'),(req,res)=>{
//     res.send(req.file);
// });
//new route
router.get("/new",isLogin,listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLogin,
        isOwner,
        upload.single('image'),
        validateListing,
    wrapAsync(listingController.updateListing)
    )
    .delete(isLogin,isOwner,wrapAsync(listingController.destroyListing))

    //edit route
router.get("/:id/edit",isLogin,isOwner,wrapAsync(listingController.editListing));



// //index route
// router.get("/",wrapAsync(listingController.index));

// //show route
// router.get("/:id",wrapAsync(listingController.showListing));

// //create route
// router.post("/", validateListing,isLogin,
//     wrapAsync(listingController.createListing)
// );

//update route
// router.put("/:id",isLogin,isOwner,validateListing,
//     wrapAsync(listingController.updateListing)
// );

//delete route
// router.delete("/:id",isLogin,isOwner,wrapAsync(listingController.destroyListing))

module.exports =router;
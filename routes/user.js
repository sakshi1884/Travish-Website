const express = require("express");
const router = express.Router();
const User= require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} =require("../middleware.js");

const userController =require("../controllers/users.js");


router
    .route("/signup")
    .get(userController.renderSignUp)
    .post(wrapAsync(userController.signup));


router
    .route("/login")
    .get(userController.renderLogin)
    .post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),
userController.login);

// router.get("/signup",userController.renderSignUp);

// router.post("/signup",wrapAsync(userController.signup));

// router.get("/login",userController.renderLogin)

// router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),
// userController.login);

router.get("/logout",userController.logOut);

module.exports=router;

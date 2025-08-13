const User= require("../models/user.js");

module.exports.signup=async(req,res)=>{
    try{
    let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to TRAVISH");
        res.redirect("/listings");
    })
    }catch(e){
        req.flash("error","username already exists!");
        res.redirect("/signup");
    }
}

module.exports.renderSignUp=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.renderLogin=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to TRAVISH! ");
    let redirectUrl =res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logOut=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
            res.redirect("/listings");
        
    })
}
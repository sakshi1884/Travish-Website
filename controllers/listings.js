const Listing =require("../models/listing.js");

module.exports.index=async (req,res)=>{
     const allListings =await Listing.find({});
     res.render("listings/index.ejs",{allListings});

    };

    module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing =async(req,res)=>{
    let{id} =req.params;
    const listing =await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author"
    }})
    .populate("owner");
    if(!listing){
        req.flash("error","This listing does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}
module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  newListing.image = {
    url: req.file.path,
    filename: req.file.filename
  };

  await newListing.save();
  req.flash("success", "New Listing Created!!");
  res.redirect("/listings");
};

module.exports.editListing=async (req,res)=>{
    let{id} =req.params;
    const listing =await Listing.findById(id);
    if(!listing){
        req.flash("error","This listing does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl})
};
module.exports.updateListing=async (req,res)=>{
    let{id} =req.params;
    let listing =await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
    listing.image = {
        url: req.file.path,
        filename: req.file.filename
  };
  await listing.save();
}
    req.flash("success"," Listing Updated!!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async(req,res)=>{
    let {id}= req.params;
    let deletedListing =await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}

module.exports.searchByLocation = async (req, res) => {
    try {
        const location = req.query.location || '';
        const listings = await Listing.find({
            location: { $regex: location, $options: 'i' }
        });

        // if (listings.length > 0) {
        //     req.flash("success", `${listings.length} listings found for "${location}"`);
        // } else {
        //     req.flash("error", `No listings found for "${location}"`);
        // }
        res.render('listings/index.ejs', { allListings: listings });
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong while searching");
        res.redirect('/listings');
    }
};

module.exports.filterByCategory = async (req, res) => {
    try {
        const category = req.query.category;
        const listings = await Listing.find({ category });

        // if (listings.length > 0) {
        //     req.flash("success", `${listings.length} listings found for "${category}"`);
        // } else {
        //     req.flash("error", `No listings found in "${category}"`);
        // }

        res.render('listings/index.ejs', { allListings: listings });
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong while filtering");
        res.redirect('/listings');
    }
};

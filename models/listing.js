const mongoose =require("mongoose");
const Review = require("./reviews");
const  Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename:{
            type:String,
            default:"listingImage"
        },
        url: {
            type:String,
            default:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
,
        set: (v) => v===""?"https://images.unsplash.com/photo-1507525428034-b723cf961d3e":v,
    }
        
    },
     category: {
        type: String,
        enum: [
            'Resorts',
            'Cafes',
            'Hotels',
            'Mountains',
            'Swim & Stay',
            'Camping',
            'Farms',
            'Winter Escapes',
            'Caves'
        ]
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }

});

const Listing = mongoose.model("Listing",listingSchema);
module.exports =Listing;


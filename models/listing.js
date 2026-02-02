// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     type: String,
//     default:"https://www.google.com/imgres?q=images.unsplash&imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1526779259212-939e64788e3c%3Ffm%3Djpg%26q%3D60%26w%3D3000%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.1.0%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%253D%253D&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Ffree-images&docid=rSJymaiqlIbilM&tbnid=salFp-bzk6qAVM&vet=12ahUKEwi9uPnVlZeSAxUn4TgGHWKMHncQM3oECBIQAA..i&w=3000&h=1993&hcb=2&ved=2ahUKEwi9uPnVlZeSAxUn4TgGHWKMHncQM3oECBIQAA"
//       ,
//     set: (v) =>
//       v === ""
//         ? "https://www.google.com/imgres?q=images.unsplash&imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1526779259212-939e64788e3c%3Ffm%3Djpg%26q%3D60%26w%3D3000%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.1.0%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%253D%253D&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Ffree-images&docid=rSJymaiqlIbilM&tbnid=salFp-bzk6qAVM&vet=12ahUKEwi9uPnVlZeSAxUn4TgGHWKMHncQM3oECBIQAA..i&w=3000&h=1993&hcb=2&ved=2ahUKEwi9uPnVlZeSAxUn4TgGHWKMHncQM3oECBIQAA"
//         : v,
//   },
//   location: String,
//   country: String,
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    url: String,
    filename: String,
  },

  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // category: {
  //   type:String,
  //   enum: ["mountains","arctic","farms","deserts"]
  // },
});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
     await Review.deleteMany({_id: {$in: listing.reviews}});
  }
});
  


//module.exports = mongoose.model("Listing", listingSchema);
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;

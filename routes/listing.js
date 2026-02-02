const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");


const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });



router.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
   wrapAsync(listingController.createListing));

// NEW ROUTE - Form to Create New Listing
router.get("/new", isLoggedIn,listingController.renderNewForm);

router.route("/:id")   
.get(wrapAsync(listingController.showListing))
.put(
   isLoggedIn,
   isOwner,
   upload.single("listing[image]"),
   validateListing,
   wrapAsync(listingController.updateListing))
.delete(isLoggedIn,
   isOwner,
   wrapAsync(listingController.destroyListing));

// INDEX ROUTE - All Listings




// CREATE ROUTE - Save New Listing




// EDIT ROUTE - Form to Edit Listing
router.get("/:id/edit",isLoggedIn,isOwner,
  wrapAsync(listingController.renderEditForm));

// UPDATE ROUTE - Update Listing in DB
// app.put("/listings/:id", async (req, res) => {
//   const { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   res.redirect(`/listings/${id}`);
// });



// DELETE ROUTE


module.exports = router;
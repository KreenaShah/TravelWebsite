const { Listing , validateListing } = require("../model/listingDB");

const addListing = async (request, response) => {
  console.log("Usercontroller => addListing");
  console.log(request.body);
  console.log(request.file);
  const image = (request.file) ? request.file.filename : null ;
  console.log("Image declare krne ke baad",image);
  // const listing = request.body;

  const {title , description , location , startDate , endDate , rules , price , noOfPeople , ammenities } = request.body;
  const listing = {
    title,
    description,
    location,
    startDate,
    endDate,
    rules,
    price,
    noOfPeople,
    ammenities,
    image
  };
  const { error } = validateListing(listing);
  if (error) {
    console.log(error.details[0].message);
    return response.status(400).send({ message: error.details[0].message });
  }

  const newListing = new Listing({
    title,
    description,
    location,
    startDate,
    endDate,
    rules,
    price,
    noOfPeople,
    ammenities,
    image
  });
  try {
    console.log("try");
    await newListing.save();
    response.status(201).json(newListing);
    console.log("Listing done successfully");
    console.log(listing)
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

const getListings = async (request, response) => {
  try {
    const listings = await Listing.find({});
    response.status(200).json(listings);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

module.exports = { addListing, getListings };
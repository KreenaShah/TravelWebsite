const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const {upload} = require("./middlewares/multer");

app.use('/ListingImages',express.static('ListingImages'))
//middlewares
app.use(express.json());
app.use(cors());

//imports
const userRoutes = require("./routes/userRoute");
const listingRoutes = require("./routes/listingRoute");
const connection = require("./model/dbConnect");

// Database Connection
connection();

//Defining Routes
app.use("/", userRoutes);
app.use("/", listingRoutes);

// server listening
const port = process.env.PORT || 8080;

app.listen(port , () => {
    console.log(`Listening on port ${port}`);
})
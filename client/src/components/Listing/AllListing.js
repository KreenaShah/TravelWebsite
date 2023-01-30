import React ,{ useEffect, useState } from 'react';
import {
  Typography,Grid,Paper,styled
  // Button,
} from "@mui/material";
import Navbar from '../Navbar';
import axios from "axios";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import './Listing.css'
const URL = "http://localhost:8080";
const imageURL = "http://localhost:8080/ListingImages/";

function AllListing() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getAllListings();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const getAllListings = async () => {
    try {
      let response = await axios.get(`${URL}/allListing`);
      setListings(response.data);
    } catch (error) {
      console.log("Error while calling getUsers API");
    }
  };

  return (
    <div>
      <Navbar />
      {/* <div className="displayListing">
        {listings.map((listing) => (
          <div style={{maxWidth: '300px'}}>
            <Card key={listing._id}>
              <img
                src={imageURL + listing.image}
                // height="300"
                // width="350"
                // alt="imageof"
                // src={Antariksh_HomePageS2}
                className="image"
              ></img>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color="text.secondary"
                >
                  {listing.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  {listing.endDate}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  {listing.startDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {listing.description}
                </Typography>
                <Typography
                  gutterBottom
                  component="div"
                  variant="body2"
                  color="text.secondary"
                >
                  {listing.price}
                </Typography>
                <Typography
                  gutterBottom
                  component="div"
                  variant="body2"
                  color="text.secondary"
                >
                  {listing.noOfPeople}
                </Typography>
                <Typography
                  gutterBottom
                  component="div"
                  variant="body2"
                  color="text.secondary"
                >
                  {listing.rules}
                </Typography>
                <Typography
                  gutterBottom
                  component="div"
                  variant="body2"
                  color="text.secondary"
                >
                  {listing.ammenities}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      
      </div> */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {console.log(Array)}
        {listings.map((listing, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card 
            key={listing._id}
            >
              <img
                src={imageURL + listing.image}
                // height="300"
                // width="350"
                // alt="imageof"
                // src={Antariksh_HomePageS2}
                className="image"
              ></img>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color="text.secondary"
                >
                  {listing.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  {listing.endDate}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  {listing.startDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {listing.description}
                </Typography>
                <Typography
                  gutterBottom
                  component="div"
                  variant="body2"
                  color="text.secondary"
                >
                  {listing.price}
                </Typography>
                <Typography
                  gutterBottom
                  component="div"
                  variant="body2"
                  color="text.secondary"
                >
                  {listing.noOfPeople}
                </Typography>
                <Typography
                  gutterBottom
                  component="div"
                  variant="body2"
                  color="text.secondary"
                >
                  {listing.rules}
                </Typography>
                <Typography
                  gutterBottom
                  component="div"
                  variant="body2"
                  color="text.secondary"
                >
                  {listing.ammenities}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default AllListing;

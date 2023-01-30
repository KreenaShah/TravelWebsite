import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  InputBase,
  Button,
} from "@mui/material";
// import { Navigate } from 'react-router-dom';
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar() {
  const handleLogout = () => {
    console.log("Logout");
    localStorage.removeItem("token");
    console.log("Logout successfully");
    window.location.reload();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#3bb19b",
          }}
        >
          <Typography
            sx={{ color: "#fff", fontSize: 18 }}
            component={Link}
            to={`/home`}
          >
            HappyTravels
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Typography sx={{ display: "flex", justifyContent: "space-around" }}>
            <MenuItem>
              <Typography
                component={Link}
                to={`/addListing`}
                sx={{ color: "#fff", fontSize: 18 }}
              >
                Add Listing
              </Typography>
              {/* </Link> */}
            </MenuItem>
            <MenuItem>
              <Typography
                component={Link}
                to={`/allListing`}
                sx={{ color: "#fff", fontSize: 18 }}
              >
                All Listing
              </Typography>
              {/* </Link> */}
            </MenuItem>
            <Button sx={{ color: "#fff", fontSize: 18 }} onClick={handleLogout}>
              Logout
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;

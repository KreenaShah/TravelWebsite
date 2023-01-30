import React from 'react';
import { useState } from 'react';
import '../register/Register.css'
import { Box, Button, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton,} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Link} from 'react-router-dom';
// import {useFormik} from 'formik';

const theme = createTheme({
  palette: {
    naigara: {
      main: "#3bb19b",
    }
  }
});

const defaultValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
};

function Register() {

  // const {
  //   values,
  //   errors,
  //   handleBlur,
  //   handleChange,
  //   handleSubmit,
  //   touched
  // } = useFormik({
  //   initialValues: defaultValue,
  //   onSubmit: (values) => {
  //     console.log(user);
  //     setUser({ ...user, [user.name]: user.value });
  //     console.log(user)
  //   },
  // });

  const [user, setUser] = useState(defaultValue);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    console.log("handleSubmit");
    setError(validate(user));
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      localStorage.setItem("token", response.data);
      // window.location = "/home";
      const responeInJSON = await response.json();
      console.log(responeInJSON);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^w+[+.w-]*@([w-]+.)*w+[w-]*.([a-z]{2,4}|d+)$/i;
    if (!values.firstName) {
      errors.firstName = "First Name required";
    } 
    if (!values.lastName) {
      errors.lastName = "last Name required";
    } 
    if (!values.email) {
      errors.email = "Email required";
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter valid email";
    }
    if (!values.password) {
      errors.password = "Password required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be of more than 4 characters";
    }
    return errors;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="signUp_main_container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          className="box"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 250,
            backgroundColor: "#3bb19b",
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            color: "#fff",
          }}
        >
          <Typography sx={{ fontSize: 28, fontWeight: "bold" }}>
            Welcome Back!
          </Typography>
          <Link to="/login">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                borderRadius: 4,
                width: "15ch",
                mt: 1.5,
              }}
            >
              <Typography
                sx={{
                  color: "#3bb19b",
                  textTransform: "none",
                  textDecoration: "none",
                }}
              >
                Login
              </Typography>
            </Button>
          </Link>
        </Box>

        <Box
          className="box"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 550,
            backgroundColor: "#fff",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <form className="inputBox" onSubmit={handleSubmit}>
            <Typography
              sx={{
                fontSize: 30,
                color: "#3bb19b",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Create Account
            </Typography>
            <TextField
              required
              id="outlined-required"
              type="text"
              label="FirstName"
              placeholder="FirstName"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              size="small"
              color="naigara"
              sx={{ mt: 2, width: "40ch" }}
            />
            <p className="error_message">{error.firstName}</p>
            <TextField
              required
              id="outlined-required"
              type="text"
              label="Lastname"
              placeholder="Lastname"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              size="small"
              color="naigara"
              sx={{ mt: 2, width: "40ch" }}
            />
            <p className="error_message">{error.lastName}</p>
            <TextField
              required
              id="outlined-required"
              type="email"
              label="Email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              size="small"
              color="naigara"
              sx={{ mt: 2, width: "40ch" }}
            />
            <p className="error_message">{error.email}</p>
            <FormControl
              sx={{ mt: 2, width: "40ch" }}
              variant="outlined"
              size="small"
              color="naigara"
              value={user.password}
              onChange={handleChange}
              required
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                label="Password"
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <p className="error_message">{error.password}</p>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#3bb19b",
                borderRadius: 4,
                width: "20ch",
              }}
            >
              <Typography sx={{ color: "#fff", textTransform: "none" }}>
                Register
              </Typography>
            </Button>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Register;

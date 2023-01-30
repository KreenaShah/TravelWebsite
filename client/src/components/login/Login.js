import React from "react";
import { useState } from "react";
import "../login/Login.css"
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link} from "react-router-dom";

const theme = createTheme({
  palette: {
    naigara: {
      main: "#3bb19b",
    },
  },
});

const defaultValue = {
  email: "",
  password: "",
};

function Login() {
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
    // console.log("Handle submit")
    e.preventDefault();
    // console.log(user)
    console.log("before validate");
    setError(validate(user));
    console.log("after validate");
    console.log(error);
    console.log("after printing error");
    
    console.log(user);
    console.log("before fetch api ");

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      localStorage.setItem("token" , response.data)
      // window.location = "/"
      // Navigate("/home")
      
      // const responseG = await fetch("http://localhost:8080/home", {
      //   method: "GET",        
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(user),
      // });

      const responeInJSON = await response.json();
      console.log(responeInJSON);
      
    } catch (error) {
      console.log(error);
      // if(error.response && error.response.status >= 400  && error.response.status <= 500) {
      //     setError(error.response.data.message)
      // }
    }
  };

  const validate = (values) => {
    const errors = {}
    const regex = /^w+[+.w-]*@([w-]+.)*w+[w-]*.([a-z]{2,4}|d+)$/i;
    if(!values.email) {
      errors.email = "Email required"
    }else if (!regex.test(values.email)) {
      errors.email = "Please enter valid email";
    }
    if (!values.password) {
      errors.password = "Password required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be of more than 4 characters";
    }
    return errors;
  }

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
            width: 550,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
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
              Login to your Account!
            </Typography>
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
                Login
              </Typography>
            </Button>
          </form>
        </Box>
        <Box
          className="box "
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 250,
            backgroundColor: "#3bb19b",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            color: "#fff",
          }}
        >
          <Typography sx={{ fontSize: 28, fontWeight: "bold" }}>
            New here ?
          </Typography>
          <Link to="/register">
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
                Register
              </Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Login;

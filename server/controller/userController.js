const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, validateRegister, validateLogin } = require("../model/userDB");


const register = async (request , response) => {
    try {
      // Destructuring
      // const { firstName, lastName, email, password } = req.body;
      console.log("Usercontroller => register");
      console.log(request.body);

      const { error } = validateRegister(request.body);
      if (error) {
        console.log(error.details[0].message);
        return response.status(400).send({ message: error.details[0].message });
      }

      console.log("olduser check");
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email: request.body.email });

      if (oldUser) {
        console.log("User already exists , please login!");
        return response.status(403).send("User Already Exist. Please Login!");
      }

      //Encrypt user password
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(request.body.password, salt);

      // Create user in our database , replacing user password with hashedPassword
      const user = await new User({ ...request.body, password: hashedPassword }).save();
      console.log(user);

      // Create token
      const token = jwt.sign({ id: user._id, email: user.email },process.env.JWT_TOKEN_KEY,{expiresIn: "2h",});
      // save user token
      user.token = token;
      console.log("After generating token");
      console.log(user);

      return response.status(200).json(user).send("User registered / signedIn successfully");
    } catch (error) {
        console.log(error);
    }
}

const login = async (request, response) => {
  try {
    console.log("Usercontroller => login");
    console.log(request.body);
    
    const { error } = validateLogin(request.body);
    if (error)
      return response.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: request.body.email });

    if (user && (await bcrypt.compare(request.body.password, user.password))) {
      // Create token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_TOKEN_KEY,
        { expiresIn: "2h" }
      );
      // save user token
      user.token = token;
      console.log("Hey");
      console.log(user)
      //Cannot set headers after they are sent to the client
      //   return response.status(200).json(user).send("User loggedIn successfully");
      //   return response.status(200).send("User loggedIn successfully").json(user);
      return response.status(200).json(user);
      //   return response.status(200).send("User loggedIn successfully");
    }
    response.status(400).send("Invalid Credentials");

  } catch (error) {
    console.log(error);
  }
};


// export const addUser = async (request, response) => {
//   const user = request.body;
//   const newUser = new User(user);
//   try {
//     await newUser.save();
//     response.status(201).json(newUser);
//     // console.log(user);
//   } catch (error) {
//     response.status(409).json({ message: error.message });
//   }
// };

// export const getUsers = async (request, response) => {
//   try {
//     const users = await User.find({});
//     response.status(200).json(users);
//   } catch (error) {
//     response.status(404).json({ message: error.message });
//   }
// };

// export const getUser = async (request, response) => {
//   try {
//     console.log(request.params.id);
//     const user = await User.findOne({ _id: request.params.id });
//     // const user = await User.findById(request.params.id);
//     response.status(200).json(user);
//     console.log(user);
//   } catch (error) {
//     response.status(404).json({ message: error.message });
//   }
// };

// export const editUser = async (request, response) => {
//   const user = request.body;
//   const editUser = new User(user);
//   try {
//     await User.updateOne({ _id: request.params.id }, editUser);
//     response.status(201).json(editUser);
//     // console.log(user);
//   } catch (error) {
//     response.status(409).json({ message: error.message });
//   }
// };

// export const deleteUser = async (request, response) => {
//   try {
//     await User.deleteOne({ _id: request.params.id });
//     response.status(201).json(editUser);
//   } catch (error) {
//     response.status(409).json({ message: error.message });
//   }
// };

module.exports = {register , login};

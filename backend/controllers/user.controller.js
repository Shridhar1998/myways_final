const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// reusable function for hashing and comparing
async function hashPassword(pass) {
  const salt = await bcrypt.genSalt(6);
  const hashedpass = await bcrypt.hash(pass, salt);
  return hashedpass;
}
async function comparePassword(pass, hashpass) {
  const valid = await bcrypt.compare(pass, hashpass);
  return valid;
}

// all the routes
exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({
      message: "all users",
      data: users,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.UserSignup = async (req, res) => {
  const { email, password, name, image } = req.body;
  try {
    const alreadyexit = await userModel.findOne({ email });
    let role = "buyer";
    if (alreadyexit) {
      return res.send("alreadyb exist pelase login");
    }
    if (email.includes("admin@priya")) {
      role = "admin";
    }

    const hashpass = await hashPassword(password);
    const user = userModel.create({
      email,
      password: hashpass,
      name,
      image,
      role,
    });

    return res.send({
      message: "signup successfull",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const validateuser = await userModel.findOne({ email });
    if (validateuser) {
      const check = await comparePassword(password, validateuser.password);
      if (check) {
        let token = jwt.sign(
          {
            id: validateuser._id,
            email: validateuser.email,
            name: validateuser.name,
          },
          "SECRETPRIYA123",
          { expiresIn: "10 days" }
        );

        return res.send({ message: "login successfull", token });
      } else {
        return res.send("wrong credentials");
      }
    } else {
      return res.send("not a valid user please signup");
    }
  } catch (err) {
    console.log(err);
  }
};

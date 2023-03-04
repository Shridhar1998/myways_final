const { Router } = require("express");
const { getUsers, UserSignup, userLogin } = require("../controllers/user.controller");
const app = Router();
const userModel = require("../models/user.model");

app.get("/user", getUsers);

app.post("/signup",UserSignup)
app.post("/login",userLogin)





module.exports = app;
// mongoose  mongodb://localhost:27017/myways

const express = require("express");
const connect = require("./config/db");
const userRoute = require("./routes/user.route")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth",userRoute)

app.get("/", (req, res) => res.send("hello"));

app.listen(6000, () => {
   connect().then(()=>{
    console.log("mongo connected")
   })
  console.log("server started at port 8080");
});

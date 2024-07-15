const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({ limit: "10mb" }))

const PORT = process.env.PORT || 8080

//mongoDb Connection
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Database"))
  .catch((err) => console.log(err))

//Schema user
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
})

//model
const userModel = mongoose.model("user", userSchema)


// API
app.get("/", (req, res) => {
  res.send("server is running")
})

//SignUp
app.post('/signup', (req, res) => {
  // console.log(req.body);
  const { email } = req.body;

  userModel
    .findOne({ email: email })
    .then((result) => {
      if (result) {
        res.send({ message: 'Email id is already registered', alert: false });
      } else {
        const data = new userModel(req.body);
        return data.save();
      }
    })
    .then(() => {
      res.send({ message: 'Successfully signed up', alert: true });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: 'Error occurred', alert: false });
    });
});

//API Login
app.post("/login", (req, res) => {
  console.log(req.body)
  const { email } = req.body
  userModel
    .findOne({ email: email })
    .then((result) => {
      if (result) {
        const dataSend = {
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        }
        console.log(dataSend)
        res.send({ message: 'Successfully Logged In', alert: true, data: dataSend });
      } else {
        res.send({ message: 'This email is not registered yet', alert: false })
      }
    })
})

//Schema product
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
})

//model product
const productModel = mongoose.model("product", schemaProduct)

// API save product
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({ message: "Upload successfully" })
})

//API Products

//api 
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
  // res.send("Available")
})

//Server is Running
app.listen(PORT, () => console.log("Server is running at port: " + PORT))
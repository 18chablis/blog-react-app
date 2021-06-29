const express = require("express"); // importation du module express

const app = express(); //initialization of module express
const dotenv = require("dotenv"); //importing dotenv module
const mongoose = require("mongoose"); //import mongoose module for mongoDB usage
const path = require("path")
//importing different routes created in the routes folder
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

//used for images storage
const multer = require("multer");

//calling config method of the dotenv module
dotenv.config();

//calling use method of the express module to use on json
app.use(express.json());

app.use("/images", express.static(path.join(__dirname,"/images")));

//creating connection to the MongoDB database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  // 
  const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
      cb(null, "images")
    },
    filename:(req, file,cb)=>{
      cb(null, req.body.name);
    },
  })

  const upload = multer({storage: storage});

  app.post("/api/upload", upload.single("file"), (req, res)=>{
    res.status(200).json("files has been uploaded");
  });

//link where the application is routed to
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//app listening on port 
app.listen("5000", () => {
  console.log("Backend server is running.");
});

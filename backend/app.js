const express = require("express");
const connectDB = require("./connection/connect");
const helmet = require("helmet");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const xss = require("xss-clean");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
require("express-async-errors");

//middleWares
app.use(express.json());
app.use(morgan("combined"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File successfully uploaded");
  } catch (error) {
    console.log(error);
  }
});
app.use("/images", express.static(path.join(__dirname, "public/images")));
//security
app.use(helmet());
app.use(cors());
app.set("trust proxy", 1);
app.use(xss());
//errorMidllewares
const routeNotFound = require("./middlewares/route-not-found");
const errorHandler = require("./middlewares/error-handler");
//routers
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const conversationRouter = require("./routes/conversation");
const messageRouter = require("./routes/message");
//routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);
app.use(routeNotFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

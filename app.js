const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
require("dotenv").config();
const notFound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/error");
const connectDB = require("./db/connect");
const port = process.env.PORT || 3000;

//middleware
app.use(express.static("./public"));
app.use(express.json());

// routes

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server listen ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

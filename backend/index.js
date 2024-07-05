// Packages
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Local Imports
import booksRoute from "./routes/bookRoute.js";
import { PORT, mongoDBURL } from "./config.js";

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to handling CORS POLICY
// ? OPTION 1: Allow All Origins with Default of cors(*)
app.use(cors());
// ? OPTION 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// Default route (localhost/homepage)
app.get("/", (request, response) => {
  return response.status(234).send("Welcome to Bookstore");
});

app.use("/books", booksRoute);
// Connect to MongoDB and start the server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log("App is listening to port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

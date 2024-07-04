import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoute.js";

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

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

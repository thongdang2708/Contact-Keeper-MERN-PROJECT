
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const userRoute = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const colors = require("colors");
const connectDB = require("./config/db");
const cors = require("cors");
const contactRoute = require("./routes/contactRoutes");

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/contacts", contactRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`.green.underline.bold);
});
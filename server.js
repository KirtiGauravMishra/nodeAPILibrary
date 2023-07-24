const express = require('express');
require('dotenv').config();
require('express-async-errors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error-handler');
const notFoundHandler = require('./middleware/not-found-handler');
const authMiddleware =require('./middleware/auth')

const app = express();

app.use(express.json());

app.use("/api", require("./routes/productRoutes",authMiddleware))
app.use("/api", require("./routes/userRoutes"))

app.use(notFoundHandler)
app.use(errorHandler)



const main = async () => {
    await connectDB();
    app.listen(5000, () => console.log('Server is running on port 5000'));
};

main().catch((err) => console.log(err));

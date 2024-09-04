const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/db');

const bodyParser = require('body-parser');
const cors = require('cors')
dotenv.config();
connectDB();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



const employeeData = require('./routes/employeeRoutes');
app.use('/', employeeData);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


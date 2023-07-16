const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require('./routes/user');
const carRoutes = require('./routes/cars');

// Name of programmers : Sobhi shehab , Omar Taha , class = 47/2 

// defining the server port.
const port = process.env.PORT || 3001;

// middleware.
app.use(cors());
app.use(express.json());

app.use('/images', express.static('images'));
app.use('/cars', carRoutes);
app.use('/user', userRoutes);




app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const { connectToMongoDB } = require('./data/database'); // Adjust the path accordingly

const app = express();
const userRoute = require('./routes/users');
app.use(bodyParser.json());
app.use(userRoute);
// Add other routes as needed


// Connect to MongoDB when the application starts
connectToMongoDB()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const port = process.env.PORT || 3000;

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-Width, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});



app.listen(port, () => {
  console.log(`Connected to server on port ${port}`);
});

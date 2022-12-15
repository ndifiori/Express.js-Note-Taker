
// let's bring in the npm express to help manage routes and servers
const express = require('express');

// let's require our exported modules for our api and html routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// let's create a port by initializing our app constant
const app = express();

// let's store a port number to listen to later on
const port = 3000;

// let's add our middleware functionality
  // this allows for whenever a request hits our backend express will execute the functions we passed to app.use in order
  // the middleware will also allow us to modify request and response objects 

// express.json will allow us to parse incoming requests with json payloads
app.use(express.json());

// express.urlencoded will parse incoming requests with urlencoded payloads
app.use(express.urlencoded( { extended: true } ));

// express.static will allow use to access files from our public folder via HTTP
  // this will then serve static files and will be loaded 
app.use(express.static('public'));

// this is stating that all our endpoints in the apiRoutes file start with api
app.use('/api', apiRoutes);

// this is stating that all our endpoints in the htmlRoutes file start with /
app.use('/', htmlRoutes);

app.listen(port, () => console.log(`listening on port ${port}`));





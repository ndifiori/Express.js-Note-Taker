
// let's create a new router object 
const router = require('express').Router();

// let's bring in our store js file
const store = require('../db/store');

// let's create a get function that will tell the server what to do when a GET request at the given route is called 
// this get function will have a callback function that listens to the incoming request (req) object and responds accordingly using response (res) object

  // the req object represents the HTTP request and has properties including the parameters
  // the res object represents the HTTP response that express sends when it gets an HTTP request
  // get( our PATH or endpoint from the url, HANDLER )

// we are bringing the store js file which we exported a new store class from
// so we will use .getNotes to bring in that method and run the getNotes runction
// after running the getNotes function we will then take the result and then
// this will return a JSON response of the data
// this will catch an error, set the response status and return a json response of the error

router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

// now that we wrote the get method for this route we need to also include the post and delete methods 
// the req.body contains the key value pairs of data that was submitted in the request body 

router.post('/notes', (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// this is the endpoint that includes the ID parameter
// the req.params.id is the object of the request that contains the id parameter

router.delete('/notes/:id', (req, res) => {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

// let's export the router so that we can use it in our server js file
module.exports = router;

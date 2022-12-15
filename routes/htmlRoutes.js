
// this path module provides a way of working with directories and file paths
newconst path = require('path');

// create a new router object
const router = require('express').Router();

// this will render the notes html to the client
// create a get function to handle get method
router.get('/notes', (req,res) => {

  // this function essentially transfers the file at the given path 

  // path.join will the specified path segments into one path
    // dirname gives the absolute path of the directory that contains the current executing file

  res.sendFile(path.join(__dirname,'../public/notes.html'));
});

// the * will register a route handler for all get requests
router.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;

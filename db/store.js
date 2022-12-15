
// let's import our modules

// this module allows us to access utility functions
const util = require('util');

// this module allows us to work and manage the files and directories in our system
const fs = require('fs');

// this module allows us to create a unique user id
// const uuid = require('uuid');

const { v4: uuidv4 } = require('uuid');

// util promisify takes a function as an input and returns it as a promise
  // fs read file is used to read the file
const readFileAsync = util.promisify(fs.readFile);

// fs write file is used asynchronously write the data to a file
const writeFileAsync = util.promisify(fs.writeFile);


// let's create a class that we can use in our apiRouter route file


class Store {

  // our read function will return our promisified version of fs readfile 
    // in this case our fs read file method is reading the db.json file and the default encoding 
  read() {
    return readFileAsync('db/db.json', 'utf-8');
  }
  // our write function will return our promisified version of fs writefile
    // in this case we will be writing the data (using stringify to convert js value to json string) to our dbjson file
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  getNotes() {

    // this will chain our read function and pass our result in to the then method
    return this.read().then((notes) => {
    // create a variable to store our note created
    let parsedNotes;
    // our try statement will allow us to define a block of code to be tested for error while it is being executed
      // we are going to use a try catch block to handle errors that might otherwise break our code
    try {
      // our parsedNotes variable will be set to an empty array and concated 
        // json parse will convert our data into a JSON 
      parsedNotes = [].concat(JSON.parse(notes));
    } 
      // this will catch our errors and set our parsedNotes to an empty array
      catch (err) {
      parsedNotes = [];
    }
    // will return our array
    return parsedNotes;
    });
  }

  addNote(note) {
    
    // object destructuring to set title and text to a variable
    const { title, text } = note;
    // const note = { title, text, id};
    // const { title, text } = note;
  
    // let's write an if statement 
      // if the title or the text are NOT true
    if(!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }
    // create a new object that stores the title, text, and a unique id that we brought in the uuid module
      const newNote = { title, text, id: uuidv4() };
    // then we want to return our getNotes function
    return this.getNotes()
      // let us then spread our notes and add our newNote to the array
      .then((notes) => [...notes, newNote])
      // then this will write our new notes using write function above
      .then((updatedNotes) => this.write(updatedNotes))
      // then this will then return our newNote
      .then(() => newNote);
  }


  removeNote(id) {
    // this will run the getNotes function
    return this.getNotes()
      // then it will take the result and add the filter method to it
        // the filter is if the note id doesn't equal the id
      .then((notes) => notes.filter((note) => note.id !== id))
      // now let's write out the filtered notes
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

// let's export a new Store class to use in our apiRoute file
module.exports = new Store();



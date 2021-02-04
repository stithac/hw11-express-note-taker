const fs = require('fs');
const {v4 : uuidv4} = require('uuid'); // Create a unique id for each item

// LOAD DATA
// We are linking our routes to a series of "data" sources.

let noteData = fs.readFileSync('./db/db.json');
let notes = JSON.parse(noteData);

// console.log(notes); // Testing

// ROUTING

module.exports = (app) => {
  // API GET Requests

  // ---------------------------------------------------------------------------

  app.get('/api/notes', (req, res) => {
    let noteData = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(noteData);
    res.json(notes);
    // res.redirect('/notes');
  });


  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => {

    // const {title, text} = req.body;
    const userId = {id: uuidv4()} ; // unique id
    let noteData = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(noteData);
    let notesArray = [...notes];

    let data = {...req.body, ...userId};
    // data.push(userId, req.body);
    notesArray.push(data);

    console.log(notesArray);

    // console.log("notesArray" ); //Testing
    // console.log(notesArray);// Testing

    // console.log(req.body);// Testing
    fs.writeFileSync('./db/db.json', JSON.stringify(notesArray));
    res.redirect(req.get('referer'));


  });

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post('/api/clear', (req, res) => {
    // Empty out the arrays of data
    noteData.length = 0;

    res.json({ ok: true });
  });

  app.delete('/api/notes/:id', (req, res) =>{

    console.log(req.params.id); // Testing

    let noteData = fs.readFileSync('./db/db.json');
    let notes = JSON.parse(noteData);
    let notesArray = [...notes];

    let index = req.params.id;

    let inArray = notesArray.findIndex(({id}) => id === index);
    console.log(inArray);

    notesArray.splice(inArray, 1);

    fs.writeFileSync('./db/db.json', JSON.stringify(notesArray));
    res.redirect(req.get('referer'));
  })
};

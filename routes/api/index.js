const router = require('express').Router();
let { notes } = require('../../db/db.json');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        const result = notes.filter(note => note.id === id)[0];
        res.json(result);
    } else {
        res.send(404);
    }
});


router.post('/notes', (req, res) => {
    let body = req.body;
    // console.log(body);
    // if any data in req.body is incorrect, send 400 error back
    if (!body) {
        res.status(400).send('There is no note to save!');
    } else {
        function createNewNote(body, array) {
            const note = body;
            note.id = uuidv4();
            array.push(note);
            fs.writeFileSync(
                path.join(__dirname, '../../db/db.json'),
                JSON.stringify({ notes: array }, null, 2)
            );
            return note;
        };
        const newNote = createNewNote(body, notes)
        res.json(newNote);
    }
});


router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    if (!id) {
        res.send(500).json(console.error());
    } else {
        const updatedNotes = notes.filter(note => note.id !== id);
        notes = updatedNotes;
        // fs.writeFileSync(
        //     path.join(__dirname, '../../db/db.json'),
        //     JSON.stringify({ notes: updatedNotes }, null, 2)
        // );
        res.redirect('/notes');
    }
});


module.exports = router;
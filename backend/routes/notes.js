
// const express = require('express');
// const router = express.Router();
// var fetchuser = require('../middleware/fetchuser');
// const { body, validationResult } = require('express-validator');
// const Notes = require('../models/Note');
// // Route 1 : Get all the notes using: GET "/api/auth/getuser" login required
// router.get('/fetchallnotes', fetchuser, async (req, res) => {

//     try {
//         const notes = await Notes.find({ user: req.user.id })


//         // res.json([])
//         res.json(notes)

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("some error occurred");
//     }

// })
// // Route 2 : Get all the notes using: POST "/api/auth/addnote" login required
// router.post('/addnote', fetchuser, [


//     body('title', 'Enter a valid title').isLength({ min: 3 }),
//     body('description', 'Password must be at least 5 characters').isLength({ min: 5 }),





// ], async (req, res) => {


//     try {



//         const { title, description, tag } = req.body;

//         const errors = validationResult(req);
//         // this part is copied from auth.js
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const note = new note({
//             title, description, tag, user: req.user.id

//         })

//         const savenote = await note.save()


//         // res.json([])
//         res.json(savenote)
//     }
//     catch (error) {
//         console.error(error.message);
//         res.status(500).send("some error occurred");
//     }
// })

// module.exports = router

const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Note'); // Corrected model name
const Note = require('../models/Note');

// Route 1: Get all the notes using: GET "/api/notes/fetchallnotes" (login required)
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Route 2: Add a new note using: POST "/api/notes/addnote" (login required)
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newNote = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Route 3: Update an exinting note using: PUT "/api/notes/updatenote" (login required)

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {



        //create newnote object
        const newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }

        // check if that particular student/person is present or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");

        }

        //logic for the updation of existing note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");

    }
})



// Route 4: delete an exinting note using: DELETE "/api/notes/deletenote" (login required)

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    try {



        // find the note to be updated and deleted
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");

        }

        //logic for the updation of existing note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });

    }


    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");

    }
})




module.exports = router;

const express = require("express");
const bodyParser = require("body-parser")
const uuid = require("uuid");

const app = express();
app.use(bodyParser.json())
let portNo = 3000;
let notes = [];

// Create a note with title(max: 50 char)
app.post("/notes", (req, res) => {
    let {title, content} = req.body;
    if(!title || typeof title !== "string"){ // Title is required field
        res.status(400).json({status: "error", message: "Invalid title"})
    }
    if(title.length > 50){ // Title length < 50 char
        res.status(400).json({status: "error", message: "Title length should be less than 50 char"})
    }
    let id = uuid.v4();
    let createdAt = new Date();
    let updatedAt = new Date();

    let note = {id: id, title: title, content: content?.toString() ?? "", createdAt: createdAt, updatedAt: updatedAt}
    notes.push(note);
    res.send(note);
});

app.get("/", (req, res) => {
    let createdAt = Date.now()
    res.send(`Hello there, you successfully reached the server! at ${createdAt}`)
});

// Obtain all the notes through Get /notes endpoint.
app.get("/notes", (req, res) => {
    if(!notes || notes.length == 0){
        res.status(404).json({status: "error", message: "Notes is empty"})
    }
        res.send(notes);
});

// Retrieve a specific note
app.get("/notes/:id", (req, res) => {
    let id = req.params.id;
    if(!id || !uuid.validate(id)){
        res.status(400).json({status: "error", message: "Invalid ID"})
    }
    let foundNote = notes.find((el) => el.id == id);
    if(!foundNote){
        res.status(404).json({status: "error", message: "Note not found"})
    }
    res.send(foundNote);
});

// Patch a specific note
app.patch("/notes/:id", (req, res) => {
    let id = req.params.id;
    let {title, content} = req.body;
    if(!title || typeof title !== "string"){ // Title is required field
        res.status(400).json({status: "error", message: "Invalid title"})
    }
    if(title.length > 50){ // Title length < 50 char
        res.status(400).json({status: "error", message: "Title length should be less than 50 char"})
    }
    if(!id || !uuid.validate(id)){
        res.status(400).json({status: "error", message: "Invalid ID"})
    }
    let foundNote = notes.find((el) => el.id == id);
    if(!foundNote){
        res.status(404).json({status: "error", message: "Note not found"})
    }
    foundNote.title = title;
    foundNote.content = content?.toString() ?? "";
    res.send(foundNote);
});

// Delete particular post
app.delete("/notes/:id", (req, res) => {
    let id = req.params.id;
    if(!id || !uuid.validate(id)){
        res.status(400).json({status: "error", message: "Invalid ID"})
    }
    let foundNote = notes.find((el) => el.id == id);
    let index = notes.findIndex((el) => el.id == id)
    if(index == -1){
        res.status(404).json({status: "error", message: "Note not found"})
    }
    notes.splice(index, 1);
    // if(!foundNote){
    //     res.status(404).json({status: "error", message: "Note not found"})
    // }
    // notes = notes.filter((note) => note.id != foundNote.id);
    res.send("Successfully deleted the note!");
});

app.listen(portNo, () => {
    console.log(`Server listening on port ${portNo}...`);
});

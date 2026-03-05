import Note from "../models/Note.js"

export const getAllNotes = async (req, res) => {
    try {
        // const notes = await Note.find();
        const notes = await Note.find().sort({ createdAt: -1 }); //-1 will sort in desc order (newest first)
        res.status(200).json(notes)

    } catch (error) {
        console.error("Error in getAllNotes Controller", errror)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getSingleNote =async(req,res)=>{
    try {  
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json("Note not Found ")

        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getAllNotes Controller", errror)
        res.status(500).json("Internal Server Error ")
    }
}

export const createNotes = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in Created Controller", errror)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateNotes = async (req, res) => {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedNote) return res.send(404).json("Note not found")


        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updated Controller", errror)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteNotes = async(req, res) => {
    try {
        const { title, content } = req.body;

        const deleteNote = await Note.findByIdAndDelete(
            req.params.deleteId,
            { title, content },
            { new: true }
        );
        if (!deleteNote) return res.send(404).json("Note not found")


        res.status(200).json(deleteNote);
    } catch (error) {
        console.error("Error in Delete Controller", errror)
        res.status(500).json({ message: "Internal server error" })
    }
}
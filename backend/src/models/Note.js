import mongoose from "mongoose"

//Step 1 : You need to create a  Schema
//Step 2 : Create a Model based on that Schema 

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
    { timestamps: true } //created at , updated at 
)

const Note = mongoose.model("Note", noteSchema)
export default Note;
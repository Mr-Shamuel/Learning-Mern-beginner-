import express from "express";
import { createNotes, deleteNotes, getAllNotes,getSingleNote, updateNotes} from "../controllers/notesController.js";
// import { createNotes, deleteNotes, getAllNotes, updateNotes } from "";

const router =express.Router();

router.get("/all",getAllNotes)
router.get("/:id",getSingleNote)
router.post("/create",createNotes)
router.put("/:id",updateNotes)
router.delete("/:deleteId",deleteNotes)




export default router;
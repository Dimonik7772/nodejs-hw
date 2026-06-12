import { Router } from "express";
import { celebrate } from "celebrate";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from "../validations/notesValidation.js";
import { authentificate } from "../middleware/autentificate.js";
const router = Router();

router.use("/", authentificate);

router.get("/notes", celebrate(getAllNotesSchema), getAllNotes);

router.get("/notes/:noteId", celebrate(noteIdSchema), getNoteById);

router.post("/notes", celebrate(createNoteSchema), createNote);

router.delete("/notes/:noteId", celebrate(noteIdSchema), deleteNote);

router.patch("/notes/:noteId", celebrate(updateNoteSchema), updateNote);

export default router;

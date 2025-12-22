import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createBook);       // CREATE
router.get("/", getBooks);          // READ all
router.get("/:id", getBookById);    // READ one
router.patch("/:id", updateBook);   // UPDATE
router.delete("/:id", deleteBook);  // DELETE

export default router;
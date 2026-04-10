import express from "express";
import { 
    viewBooks,
    addBooks,
    updateBooks,
    deleteBooks
} from "../controllers/booksController.js";

const router = express.Router();

router.get("/view", viewBooks);
router.post("/add", addBooks);
router.put("/update/:id", updateBooks);
router.delete("/delete/:id", deleteBooks);

export default router;
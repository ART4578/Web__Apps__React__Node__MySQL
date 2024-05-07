import express from "express";
import { 
    getUsers,
    postUsers,
    viewUsers,
    updateUsers,
    deleteUsers 
} from "../controllers/users.js";

const router = express.Router();

router.get("/get", getUsers);
router.post("/post", postUsers);
router.get("/get/:id", viewUsers);
router.put("/update/:id", updateUsers);
router.delete("/remove/:id", deleteUsers);

export default router;
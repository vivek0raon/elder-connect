import express from "express";
//import { getCaretakers } from "../controllers/userController.js";
import { getCaretakers, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/caretakers", getCaretakers);
router.put("/:id", updateUser);  
export default router;
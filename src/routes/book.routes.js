import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const bookRoutes = Router();

bookRoutes.post('/register', registerUser);

export default bookRoutes;

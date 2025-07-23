import { Router } from "express";
import { registerUser} from "../controllers/user.controller.js";

const reviewRoutes = Router();

reviewRoutes.post('/register', registerUser);

export default reviewRoutes;
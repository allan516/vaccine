import { Router } from "express";
import { login } from "./controllers/login-controller";
import * as petController from "./controllers/pet-controller";

const router = Router();

// router.get("/", login);
router.post("/pet", petController.postPet);
router.delete("/pet/:id", petController.deletePet);
router.patch("/pet/:id", petController.updatePet);
router.get("/pet", petController.getPet);

export default router;

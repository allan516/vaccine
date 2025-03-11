import { Router } from "express";
import { login } from "./controllers/login-controller";
import * as petController from "./controllers/pet-controller";
import * as vaccineController from "./controllers/vaccine-controller";

const router = Router();

// router.post("/", login);
router.post("/pet", petController.postPet);
router.delete("/pet/:id", petController.deletePet);
router.patch("/pet/:id", petController.updatePet);
router.get("/pet", petController.getPet);
router.get("/pet/:id", petController.getPetById);

router.post("/pet/:id/vaccine", vaccineController.postVaccine);
router.delete("/pet/:id/vaccine/:vaccineName", vaccineController.deleteVaccine);
router.patch("/pet/:id/vaccine/:vaccineName", vaccineController.updateVaccine);
router.get("/pet/:id/vaccine", vaccineController.getVaccine);

export default router;

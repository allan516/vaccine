import { Router } from "express";
import { login } from "./controllers/login-controller";
import * as petController from "./controllers/pet-controller";
import * as vaccineController from "./controllers/vaccine-controller";
import { authMiddleware } from "./middlewares/auth-middleware";

const router = Router();

router.post("/login", login);
router.post("/pet", authMiddleware, petController.postPet);
router.delete("/pet/:id", authMiddleware, petController.deletePet);
router.patch("/pet/:id", authMiddleware, petController.updatePet);
router.get("/pet", authMiddleware, petController.getPet);
router.get("/pet/:id", authMiddleware, petController.getPetById);

router.post("/pet/:id/vaccine", authMiddleware, vaccineController.postVaccine);
router.delete(
  "/pet/:id/vaccine/:vaccineName",
  authMiddleware,
  vaccineController.deleteVaccine
);
router.patch(
  "/pet/:id/vaccine/:vaccineName",
  authMiddleware,
  vaccineController.updateVaccine
);
router.get("/pet/:id/vaccine", authMiddleware, vaccineController.getVaccine);

export default router;

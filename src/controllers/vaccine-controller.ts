import { Request, Response } from "express";
import * as service from "../services/vaccine-service";
import { IHttpResponse } from "../models/IHttpResponse";

// router.post("/pet/:id/vaccine", vaccineController.postVaccine);
// router.delete("/pet/:id/vaccine/:vaccineName", vaccineController.deleteVaccine);
// router.patch("/pet/:id/vaccine/:vaccineName", vaccineController.updateVaccine);
// router.get("/pet/:id/vaccine", vaccineController.getVaccine);

export const postVaccine = async (req: Request, res: Response) => {
  const petId: string = req.params.id;
  const vaccineName: string = req.body;
  const response = (await service.createVaccineService(
    petId,
    vaccineName
  )) as IHttpResponse;

  res.status(response.statusCode).json(response.body);
};

export const getVaccine = async (req: Request, res: Response) => {};

export const updateVaccine = async (req: Request, res: Response) => {};

export const deleteVaccine = async (req: Request, res: Response) => {};

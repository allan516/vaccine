import { Request, Response } from "express";
import * as service from "../services/vaccine-service";
import { IHttpResponse } from "../models/IHttpResponse";
import { IPetData, IpetVaccine } from "../models/IPetData";

// router.post("/pet/:id/vaccine", vaccineController.postVaccine);
// router.delete("/pet/:id/vaccine/:vaccineName", vaccineController.deleteVaccine);
// router.patch("/pet/:id/vaccine/:vaccineName", vaccineController.updateVaccine);
// router.get("/pet/:id/vaccine", vaccineController.getVaccine);

export const postVaccine = async (req: Request, res: Response) => {
  const petId: string = req.params.id;
  const vaccineName: IpetVaccine = req.body;
  const response = (await service.createVaccineService(
    petId,
    vaccineName
  )) as IHttpResponse;

  res.status(response.statusCode).json(response.body);
};

export const getVaccine = async (req: Request, res: Response) => {};

export const updateVaccine = async (req: Request, res: Response) => {
  const id = req.params.id;
  const vaccineName = req.params.vaccineName;
  const vaccine: IpetVaccine = req.body;
  const response = (await service.updateVaccineService(
    id,
    vaccineName,
    vaccine
  )) as IHttpResponse;

  res.status(response.statusCode).json(response.body);
};

export const deleteVaccine = async (req: Request, res: Response) => {};

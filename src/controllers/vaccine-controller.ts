import { Request, Response } from "express";
import * as service from "../services/vaccine-service";
import { IHttpResponse } from "../models/IHttpResponse";
import { IpetVaccine } from "../models/IPetData";
import {
  deleteVaccineService,
  getVaccineService,
} from "../services/vaccine-service";

export const postVaccine = async (req: Request, res: Response) => {
  const petId: string = req.params.id;
  const vaccineName: IpetVaccine = req.body;
  const response = (await service.createVaccineService(
    petId,
    vaccineName
  )) as IHttpResponse;

  res.status(response.statusCode).json(response.body);
};

export const getVaccine = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const response = (await getVaccineService(id)) as IHttpResponse;
  res.status(response.statusCode).json(response.body);
};

export const updateVaccine = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const vaccineName: string = req.params.vaccineName;
  const vaccine: IpetVaccine = req.body;
  const response = (await service.updateVaccineService(
    id,
    vaccineName,
    vaccine
  )) as IHttpResponse;

  res.status(response.statusCode).json(response.body);
};

export const deleteVaccine = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const vaccineName: string = req.params.vaccineName;
  const response = (await deleteVaccineService(
    id,
    vaccineName
  )) as IHttpResponse;
  res.status(response.statusCode).json(response.body);
};

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
  const vaccine: IpetVaccine = req.body;
  const response = (await service.createVaccineService(
    petId,
    vaccine
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
  const vaccineId: string = req.params.vaccineId;
  const vaccine: IpetVaccine = req.body;
  const response = (await service.updateVaccineService(
    id,
    vaccineId,
    vaccine
  )) as IHttpResponse;

  res.status(response.statusCode).json(response.body);
};

export const deleteVaccine = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const vaccineId: string = req.params.vaccineId;
  const response = (await deleteVaccineService(id, vaccineId)) as IHttpResponse;
  res.status(response.statusCode).json(response.body);
};

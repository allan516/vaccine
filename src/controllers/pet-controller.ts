import { Request, Response } from "express";
import * as service from "../services/pet-service";
import { IPetData } from "../models/IPetData";
import { IHttpResponse } from "../models/IHttpResponse";

export const postPet = async (req: Request, res: Response) => {
  const body = req.body;
  const response = await service.createPetService(body);
  res.status(response.statusCode).json(response.body);
};

export const updatePet = async (req: Request, res: Response) => {
  const petId: string = req.params.id;
  const body: IPetData = req.body;
  const response = await service.updatePetService(petId, body);
  res.status(response.statusCode).json(response.body);
};

export const deletePet = async (req: Request, res: Response) => {
  const petId = req.params.id;
  const response = await service.deletePetService(petId);
  res.status(response.statusCode).json(response.body);
};

export const getPet = async (req: Request, res: Response) => {
  const response = (await service.getPetService()) as IHttpResponse;
  res.status(response.statusCode).json(response.body);
};

export const getPetById = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const response = (await service.getPetByIdService(id)) as IHttpResponse;
  res.status(response.statusCode).json(response.body);
};

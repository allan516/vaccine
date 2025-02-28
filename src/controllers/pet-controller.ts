import { Request, Response } from "express";
import * as service from "../services/pet-service";

export const postPet = async (req: Request, res: Response) => {
  const body = req.body;
  const response = await service.createPetService(body);
  res.status(response.statusCode).json(response.body);
};

export const deletePet = async (req: Request, res: Response) => {
  const petId = req.params.id;
  const response = await service.deletePetService(petId);
  res.status(response.statusCode).json(response.body);
};

export const getPet = async (req: Request, res: Response) => {
  const response = await service.getPetService();
  res.status(response.statusCode).json(response.body);
};

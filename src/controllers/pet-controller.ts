import { Request, Response } from "express";
import * as service from "../services/pet-service";

export const postPet = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const response = await service.createPetService(body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário. " });
  }
};

export const deletePet = async (req: Request, res: Response) => {
  const response = await service.deletePetService();
};

export const getPet = async (req: Request, res: Response) => {
  try {
    const response = await service.getPetService();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Erro" });
  }
};

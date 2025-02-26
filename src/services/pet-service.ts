import User from "../database/petSchema";
import { IPetData } from "../models/IPetData";
import {
  createPetRepository,
  getPetRepository,
} from "../repositories/pet-repositories";

export const createPetService = async (body: IPetData) => {
  try {
    const petExisting = await User.findOne({ name: body.name });
    const numberOfPet = await User.countDocuments();

    if (typeof body.name !== "string" || typeof body.age !== "number") {
      throw new Error("Nome ou Idade inválida");
    }

    if (petExisting) {
      throw new Error("Você já tem um Pet com este nome. ");
    }

    if (body.age < 0 || body.age > 18) {
      throw new Error("Idade inválida.");
    }

    if (numberOfPet === 3) {
      throw new Error("Número máximo de pets criado. ");
    }

    return await createPetRepository(body);
  } catch (error) {
    throw new Error("Erro ao criar pet: " + error);
  }
};

export const deletePetService = async () => {};
export const getPetService = async () => {
  return getPetRepository();
};

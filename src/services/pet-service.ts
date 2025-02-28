import User from "../database/petSchema";
import { IPetData } from "../models/IPetData";
import * as httpResponse from "../utils/https-helper";
import {
  createPetRepository,
  delPetRepository,
  getPetRepository,
} from "../repositories/pet-repositories";

export const createPetService = async (body: IPetData) => {
  let response = null;
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
    const bodyPet = await createPetRepository(body);
    response = await httpResponse.ok(bodyPet);
    return response;
  } catch (error) {
    console.error(error);
    response = httpResponse.badRequest();
    return response;
  }
};

export const deletePetService = async (petId: string) => {
  let response = null;

  try {
    const deletePet = await delPetRepository(petId);

    if (deletePet === null) {
      response = await httpResponse.noContent();
    } else {
      response = await httpResponse.ok(deletePet);
    }
    return response;
  } catch (error) {
    response = await httpResponse.badRequest();
    return response;
  }
};

export const getPetService = async () => {
  let response = null;
  try {
    const pet = await getPetRepository();
    if (pet.length > 0) {
      response = await httpResponse.ok(pet);
    } else {
      response = await httpResponse.noContent();
    }

    return response;
  } catch (error) {
    response = await httpResponse.badRequest();
    return response;
  }
};

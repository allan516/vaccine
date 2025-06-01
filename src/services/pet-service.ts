import User from "../database/petSchema";
import { IPetData, VaccineStatus } from "../models/IPetData";
import * as httpResponse from "../utils/https-helper";
import * as repository from "../repositories/pet-repositories";
import { updateVaccineService } from "./vaccine-service";
import { validate } from "../utils/dateValidation";

export const createPetService = async (body: IPetData) => {
  let response = null;
  try {
    const petExisting = await User.findOne({ name: body.name });
    const numberOfPet = await User.countDocuments();

    if (
      typeof body.name !== "string" ||
      typeof body.age !== "number" ||
      typeof body.category !== "string" ||
      typeof body.breed !== "string"
    ) {
      throw new Error("Entrada inválida.");
    }

    if (petExisting) {
      throw new Error("Você já tem um Pet com este nome. ");
    }

    if (body.age < 0 || body.age > 18) {
      throw new Error("Idade inválida.");
    }

    if (!body.name || !body.age || !body.category || !body.breed) {
      throw new Error("Todos os campos precisam ser preenchidos.");
    }

    if (numberOfPet === 3) {
      throw new Error("Número máximo de pets criado. ");
    }
    const bodyPet = await repository.createPetRepository(body);
    response = await httpResponse.ok(bodyPet);
    return response;
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
    response = await httpResponse.badRequest();
    return response;
  }
};

export const updatePetService = async (petId: string, body: IPetData) => {
  let response = null;
  try {
    const petExisting = await User.findOne({ name: body.name });

    if (petExisting) {
      throw new Error("Digite um nome diferente do atual. ");
    }

    if (typeof body.name !== "string" || typeof body.age !== "number") {
      throw new Error("Nome ou Idade inválida");
    }

    if (body.name.length < 2) {
      throw new Error("Nome precisa ter pelo menos 2 caracteres.");
    }

    if (body.age < 0 || body.age > 18) {
      throw new Error("Idade inválida.");
    }

    const updatePet = await repository.updatePetRepository(petId, body);

    if (updatePet === null || updatePet === undefined) {
      throw new Error("Pet não encontrado");
    }

    response = await httpResponse.ok(updatePet);
    return response;
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
    response = await httpResponse.badRequest();
    return response;
  }
};

export const deletePetService = async (petId: string) => {
  let response = null;

  try {
    const deletePet = await repository.delPetRepository(petId);

    if (deletePet === null) {
      throw new Error("Pet não encontrado.");
    } else {
      response = await httpResponse.ok(deletePet);
    }
    return response;
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
    response = await httpResponse.badRequest();
    return response;
  }
};

export const getPetService = async () => {
  let response = null;
  try {
    const pet = await repository.getPetRepository();
    if (pet.length >= 0) {
      response = await httpResponse.ok(pet);
    }

    return response;
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
    response = await httpResponse.badRequest();
    return response;
  }
};

export const getPetByIdService = async (id: string) => {
  try {
    const getPetById = await repository.getPetByIdRepository(id);

    for (const vaccine of getPetById.vaccines) {
      const vaccineDateValidate = validate(vaccine);

      if (!vaccineDateValidate && vaccine.status !== VaccineStatus.MISSED) {
        console.log("vaccine debug " + vaccineDateValidate);
        vaccine.status = VaccineStatus.MISSED;
        await updateVaccineService(id, vaccine.id, vaccine);
      }
    }

    const response = await httpResponse.ok(getPetById);
    return response;
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
    const response = await httpResponse.badRequest();
    return response;
  }
};

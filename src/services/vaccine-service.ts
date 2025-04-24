import { IpetVaccine } from "../models/IPetData";
import {
  createVaccineRepository,
  deleteVaccineRepository,
  getVaccineRepository,
  updateVaccineRepository,
} from "../repositories/vaccine-respositories";
import * as httpResponse from "../utils/https-helper";
import User from "../database/petSchema";

export const createVaccineService = async (
  petId: string,
  vaccine: IpetVaccine
) => {
  try {
    const regex = /^[A-Za-z](?:[A-Za-z0-9]|\s(?!\s))*[A-Za-z0-9]$/;
    const nameValidate = regex.test(vaccine.name);

    if (!nameValidate) {
      throw new Error("Nome inválido");
    }

    const vaccineExisting = await User.findOne({
      _id: petId,
      "vaccines.name": vaccine.name,
    });

    if (vaccineExisting) {
      throw new Error("Está vacina já existe.");
    }

    const createVaccine = await createVaccineRepository(petId, vaccine);
    const response = await httpResponse.ok(createVaccine);
    return response;
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
    const response = await httpResponse.badRequest();
    return response;
  }
};

export const updateVaccineService = async (
  petId: string,
  vaccineId: string,
  vaccine: IpetVaccine
) => {
  try {
    const regex = /^[A-Za-z](?:[A-Za-z0-9]|\s(?!\s))*[A-Za-z0-9]$/;
    const nameValidate = regex.test(vaccine.name);

    if (!nameValidate) {
      throw new Error("Nome inválido");
    }

    const vaccineExisting = await User.findOne({
      _id: petId,
      "vaccines.name": vaccine.name,
    });

    if (vaccineExisting) {
      vaccineExisting.vaccines.forEach((value) => {
        if (
          value.id.toString() !== vaccineId.toString() &&
          value.name === vaccine.name
        ) {
          throw new Error("Está vacina já existe. ");
        } else if (
          value.id.toString() === vaccineId.toString() &&
          value.name === vaccine.name &&
          value.date === vaccine.date
        ) {
          throw new Error("Nenhum campo alterado");
        }
      });
    }

    const updateVaccine = await updateVaccineRepository(
      petId,
      vaccineId,
      vaccine
    );
    const response = await httpResponse.ok(updateVaccine);
    return response;
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
    const response = await httpResponse.badRequest();
    return response;
  }
};

export const deleteVaccineService = async (id: string, vaccineId: string) => {
  try {
    const deleteVaccine = await deleteVaccineRepository(id, vaccineId);

    if (!deleteVaccine) {
      throw new Error("Vacina não encontrada.");
    }

    const response = await httpResponse.ok(deleteVaccine);
    return response;
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
    const response = await httpResponse.badRequest();
    return response;
  }
};

export const getVaccineService = async (id: string) => {
  try {
    const getVaccine = await getVaccineRepository(id);

    if (!getVaccine?.vaccines || getVaccine.vaccines.length === 0) {
      throw new Error("Lista de vacinas vazia!");
    }

    const response = await httpResponse.ok(getVaccine);
    return response;
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
    const response = await httpResponse.badRequest();
    return response;
  }
};

import { IpetVaccine, VaccineStatus } from "../models/IPetData";
import {
  createVaccineRepository,
  deleteVaccineRepository,
  getVaccineRepository,
  updateVaccineRepository,
} from "../repositories/vaccine-respositories";
import * as httpResponse from "../utils/https-helper";
import User from "../database/petSchema";
import mongoose from "mongoose";

export const createVaccineService = async (
  petId: string,
  vaccine: IpetVaccine
) => {
  try {
    const regex = /^[A-Za-z](?:[A-Za-z0-9]|\s(?!\s))*[A-Za-z0-9]$/;
    const nameValidate = regex.test(vaccine.name);
    const vaccineExisting = await User.findOne({
      _id: petId,
      "vaccines.name": vaccine.name,
    });

    //refatorar
    const now = new Date();
    const dia = now.getDate();
    const mes = now.getMonth();
    const ano = now.getFullYear();

    const vaccineDate = vaccine.date.toString();
    const [anoVaccine, mesVaccine, diaVaccine] = vaccineDate.split("-");

    const currentDate = new Date(ano, mes, dia);
    const dateInput = new Date(
      parseInt(anoVaccine),
      parseInt(mesVaccine) - 1,
      parseInt(diaVaccine)
    );

    if (vaccine.date && currentDate > dateInput) {
      throw new Error("Data inválida");
    }

    if (!vaccine.date) {
      throw new Error(
        "Para criar uma vacina é necessário agendar para uma data válida."
      );
    }

    if (!nameValidate) {
      throw new Error("Nome inválido");
    }

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

    //refatorar
    const now = new Date();
    const dia = now.getDate();
    const mes = now.getMonth();
    const ano = now.getFullYear();

    const currentDate = new Date(Date.UTC(ano, mes, dia));

    const vaccineDate: string = vaccine.date.toString();
    const [anoVaccine, mesVaccine, diaVaccine] = vaccineDate.split("-");

    const dateInput = new Date(
      parseInt(anoVaccine),
      parseInt(mesVaccine) - 1,
      parseInt(diaVaccine)
    );
    if (!nameValidate) {
      throw new Error("Nome inválido");
    }

    const vaccineExisting = await User.findOne({
      _id: petId,
      "vaccines.id": new mongoose.Types.ObjectId(vaccineId),
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
          value.date === vaccine.date &&
          value.status === vaccine.status
        ) {
          throw new Error("Nenhum campo alterado");
        } else if (
          (value.id.toString() === vaccineId.toString() &&
            vaccine.date > value.date &&
            currentDate > dateInput) ||
          (value.id.toString() === vaccineId.toString() &&
            vaccine.date < value.date &&
            currentDate > dateInput)
        ) {
          throw new Error("Data inválida");
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

    if (!getVaccine) {
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

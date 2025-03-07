import mongoose from "mongoose";
import { IpetVaccine } from "../models/IPetData";
import {
  createVaccineRepository,
  deleteVaccineRepository,
  getVaccineRepository,
  updateVaccineRepository,
} from "../repositories/vaccine-respositories";
import * as httpResponse from "../utils/https-helper";

export const createVaccineService = async (
  petId: string,
  vaccineName: IpetVaccine
) => {
  try {
    if (vaccineName.name === "") {
      throw new Error("Digite um nome válido de vacina.");
    }
    const createVaccine = await createVaccineRepository(petId, vaccineName);
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
  vaccineName: string,
  vaccine: IpetVaccine
) => {
  try {
    const updateVaccine = await updateVaccineRepository(
      petId,
      vaccineName,
      vaccine
    );
    const response = await httpResponse.ok(updateVaccine);
    return response;
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
  }
};

export const deleteVaccineService = async (id: string, vaccineName: string) => {
  try {
    const deleteVaccine = deleteVaccineRepository(id, vaccineName);
    const response = httpResponse.ok(deleteVaccine);
    return response;
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
  }
};

export const getVaccineService = async (id: string) => {
  try {
    const getVaccine = await getVaccineRepository(id);
    const response = await httpResponse.ok(getVaccine);
    return response;
  } catch (error) {
    console.error("Ocorreu um erro: " + error);
  }
};

import { IPetData, IpetVaccine } from "../models/IPetData";
import {
  createVaccineRepository,
  updateVaccineRepository,
} from "../repositories/vaccine-respositories";
import * as httpResponse from "../utils/https-helper";

export const createVaccineService = async (
  petId: string,
  vaccineName: IpetVaccine
) => {
  try {
    const createVaccine = await createVaccineRepository(petId, vaccineName);
    const response = await httpResponse.ok(createVaccine);
    return response;
  } catch (error) {}
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

import { createVaccineRepository } from "../repositories/vaccine-respositories";
import * as httpResponse from "../utils/https-helper";

export const createVaccineService = async (
  petId: string,
  vacinneName: string
) => {
  try {
    const vaccine = await createVaccineRepository(petId, vacinneName);
    const response = await httpResponse.ok(vaccine);
    return response;
  } catch (error) {}
};

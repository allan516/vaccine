import User from "../database/petSchema";

export const createVaccineRepository = async (
  petId: string,
  vacinneName: string
) => {
  const response = await User.findByIdAndUpdate(
    petId,
    {
      $push: { vaccines: { name: vacinneName, date: new Date() } },
    },
    { new: true }
  );
  return response;
};

import User from "../database/petSchema";
import { IPetData } from "../models/IPetData";

export const createPetRepository = async (body: IPetData) => {
  const novoPet = new User({
    name: body.name,
    age: body.age,
    category: body.category,
    breed: body.breed,
    vaccines: body.vaccines,
  });

  await novoPet.save();
};

export const updatePetRepository = async (petId: string, body: IPetData) => {
  const updatePet = await User.findByIdAndUpdate(
    petId,
    {
      name: body.name,
      age: body.age,
      category: body.category,
      breed: body.breed,
    },
    { new: true }
  );

  return updatePet;
};

export const delPetRepository = async (petId: string) => {
  const pet = await User.findOneAndDelete({ _id: petId });
  return pet;
};

export const getPetRepository = async () => {
  const pet = await User.find({}, "-__v");
  return pet;
};

export const getPetByIdRepository = async (id: string) => {
  const response = await User.findById(id, "-__v");
  return response as IPetData;
};

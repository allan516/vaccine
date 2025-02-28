import User from "../database/petSchema";
import { IPetData } from "../models/IPetData";

export const createPetRepository = async (body: IPetData) => {
  const novoPet = new User({
    name: body.name,
    age: body.age,
    vaccines: body.vaccines,
  });

  await novoPet.save();
};

export const delPetRepository = async (petId: string) => {
  const pet = await User.findByIdAndDelete({ _id: petId });
  return pet;
};

export const getPetRepository = async () => {
  const pet = await User.find({});
  return pet;
};

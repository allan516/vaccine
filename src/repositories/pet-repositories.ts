import User from "../database/petSchema";
import { IPetData } from "../models/IPetData";

export const createPetRepository = async (body: IPetData) => {
  const novoUser = new User({
    name: body.name,
    age: body.age,
    vaccines: body.vaccines,
  });

  await novoUser.save();
};

export const getPetRepository = async () => {
  const pet = await User.find({});
  return pet;
};

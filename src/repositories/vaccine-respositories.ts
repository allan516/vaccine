import mongoose from "mongoose";
import User from "../database/petSchema";
import { IpetVaccine, VaccineStatus } from "../models/IPetData";

export const createVaccineRepository = async (
  petId: string,
  vaccine: IpetVaccine
) => {
  const response = await User.findByIdAndUpdate(
    petId,
    {
      $push: {
        vaccines: {
          id: new mongoose.Types.ObjectId(),
          name: vaccine.name,
          date: vaccine.date || new Date(),
          status: vaccine.status || VaccineStatus.PENDING,
        },
      },
    },
    { new: true }
  );
  return response;
};

export const updateVaccineRepository = async (
  petId: string,
  vaccineId: string,
  vaccine: IpetVaccine
) => {
  const response = await User.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(petId),
      "vaccines.id": new mongoose.Types.ObjectId(vaccineId),
    },
    {
      $set: {
        "vaccines.$.name": vaccine.name,
        "vaccines.$.date": vaccine.date || new Date(),
      },
    },
    { new: true }
  );
  return response;
};

export const deleteVaccineRepository = async (
  id: string,
  vaccineId: string
) => {
  const deleteVaccine = await User.findOneAndUpdate(
    // Procura pelo id e nome da vacina
    { _id: id, "vaccines.id": new mongoose.Types.ObjectId(vaccineId) },
    { $pull: { vaccines: { id: new mongoose.Types.ObjectId(vaccineId) } } },
    { new: true }
  );

  return deleteVaccine;
};

export const getVaccineRepository = async (id: string) => {
  //retorna todas as vacinas menos o id
  const getVaccine = (await User.findById(id, "vaccines -_id")) as IpetVaccine;
  return getVaccine;
};

/*
Condição de busca ({ _id: petId, "vaccines.name": vaccineName }):

_id: petId: Isso indica que estamos buscando o pet pelo seu ID (petId).
"vaccines.name": vaccineName: Aqui, estamos utilizando a notação de ponto para acessar um campo name dentro do array vaccines. O MongoDB irá procurar por um documento onde um dos objetos dentro do array vaccines tenha o campo name igual a vaccineName. O ponto é necessário para acessar o campo name dentro dos objetos dentro do array.
Operador $set:




$set é um operador especial do MongoDB usado para atualizar campos específicos em um documento. No caso, queremos atualizar o nome e a data de uma vacina dentro do array vaccines.
"vaccines.$.name": vaccine.name: O $. aqui é um operador especial que indica o primeiro elemento do array que corresponde à condição de busca. Ele permite acessar diretamente o objeto que corresponde ao critério (ou seja, o objeto que tem a vacina com o name correspondente).


new: true:

Esse parâmetro faz com que o MongoDB retorne o documento atualizado, ou seja, o documento após a atualização. Se new: false fosse utilizado (que é o valor padrão), o MongoDB retornaria o documento antes da atualização.

*/

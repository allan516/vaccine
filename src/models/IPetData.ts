export interface IPetData {
  name: string;
  age: number;
  category: string;
  breed: string;
  vaccines: IpetVaccine[];
}

export interface IpetVaccine {
  id: string;
  name: string;
  date: Date;
  status: VaccineStatus;
}

export enum VaccineStatus {
  PENDING = "pendente",
  APPLIED = "aplicada",
  EXPIRED = "expirada",
  MISSED = "perdida",
}

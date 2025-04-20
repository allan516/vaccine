export interface IPetData {
  name: string;
  age: number;
  vaccines: IpetVaccine[];
}

export interface IpetVaccine {
  id: string;
  name: string;
  date: Date;
}

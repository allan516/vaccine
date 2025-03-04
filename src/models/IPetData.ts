export interface IPetData {
  name: string;
  age: number;
  vaccines: IpetVaccine[];
}

export interface IpetVaccine {
  name: string;
  date: Date;
}

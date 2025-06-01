import { IpetVaccine } from "../models/IPetData";

export function validate(vaccine: IpetVaccine): boolean {
  const date = new Date();
  const today = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );

  const vaccineDateString = vaccine.date.toString();

  const [vaccineYear, vaccineMonth, vaccineDay] = vaccineDateString.split("-");

  const vaccineDate = new Date(
    Date.UTC(
      parseInt(vaccineYear),
      parseInt(vaccineMonth) - 1,
      parseInt(vaccineDay)
    )
  );

  return vaccineDate.getTime() >= today.getTime();
}

import { IpetVaccine } from "../models/IPetData";

export function validate(vaccine: IpetVaccine): boolean {
  const today = new Date();
  const date1 = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
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

  return vaccineDate.getTime() >= date1.getTime();
}

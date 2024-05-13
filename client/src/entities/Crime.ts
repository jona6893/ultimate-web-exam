import Person from "./Person";

// crime
export default interface Crime {
  _key: string;
  crime_type: string;
  severity: number;
  lat: number;
  lon: number;
  time: number;
  address?: string;  // add ? for optinal key
  suspects: Person[];
  victims: Person[];
  witnesses: Person[];
}
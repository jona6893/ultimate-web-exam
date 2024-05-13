// victims, witnesses, suspects
export default interface Person {
  _key: string;
  first_name: string;
  last_name: string;
  age: number;
  cpr: string;
  family: Person[];
  friends: Person[];
}
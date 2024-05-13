import Person from "./Person";

export default interface Relation extends Person {
  friends: Person[]
  family: Person[]
}
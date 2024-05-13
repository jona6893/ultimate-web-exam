import axios from "axios";
import Relation from "../entities/Relation";

async function getRelations(key: string): Promise<Relation | null> {
  try {
    const response = await axios.get(`http://127.0.0.1:4000/api/relations/${key}`);
    const data = response.data;
    // console.log(data[0]);
    return data[0];
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export default getRelations;
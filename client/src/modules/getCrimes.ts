import axios from "axios";
import Crime from "../entities/Crime";

async function getCrimes(): Promise<Crime[]> {
  try {
    const response = await axios.get("http://127.0.0.1:4000/api/get-crimes");
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error:", error)
    return [];
  }
}

export default getCrimes;
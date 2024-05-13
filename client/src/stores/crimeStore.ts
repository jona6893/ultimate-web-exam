import { create } from "zustand";
import Crime from "../entities/Crime";

interface CrimeStore {
  crimes: Crime[];
  setCrimes: (crimes: Crime[]) => void;
  filteredCrimes: Crime[];
  setFilteredCrimes: (filteredCrimes: Crime[]) => void;
  sortedCrimes: Crime[];
  setSortedCrimes: (sortedCrimes: Crime[]) => void;
  relations: Crime[];
  setRelations: (sortedCrimes: Crime[]) => void;
}

// global state for crimes
const useCrimeStore = create<CrimeStore>((set) => ({
  // array of all crimes
  crimes: [] as Crime[],
  setCrimes: (crimes: Crime[]) => set({ crimes }),

  // array of filtered crimes
  filteredCrimes: [] as Crime[],
  setFilteredCrimes: (filteredCrimes: Crime[]) => set({ filteredCrimes }),
  
  // array of sorted crimes
  sortedCrimes: [] as Crime[],
  setSortedCrimes: (sortedCrimes: Crime[]) => set({ sortedCrimes }),

  // array of crime relations
  relations: [] as Crime[],
  setRelations: (relations: Crime[]) => set({ relations }),

}));

export default useCrimeStore;
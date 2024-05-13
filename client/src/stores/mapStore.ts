import { create, SetState } from "zustand";
interface MapStore {
    tglMapCard: string | null;
    setTglMapCard: (tglMapCard: string | null) => void;
}

// global state for Mapcards
const useMapStore = create<MapStore>((set: SetState<MapStore>) => ({
    // initial value of tglMapCard
    tglMapCard: null,
    setTglMapCard: (tglMapCard: string | null) => set({ tglMapCard }),
}));

export default useMapStore;
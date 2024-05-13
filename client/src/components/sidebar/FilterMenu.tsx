import { useState } from "react";
import { CrimeType } from "../../entities/CrimeType";
import Dropdown from "./Dropdown";

interface Props {
  setSelectedFilter: (filter: CrimeType) => void;
  selectedFilter: CrimeType;
}

function FilterMenu({setSelectedFilter, selectedFilter}: Props) {

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Array for our filters / Crimetypes
  const crimeCategories: CrimeType[] = [
    "All",
    "Organized crime",
    "Homicide",
    "Assault",
    "Robbery",
    "Cybercrime",
    "Arson",
    "Gang violence",
    "Drug crime",
    "Kidnapping",
    "Theft",
  ]

  return (
    <div className="relative flex">
      { /* overlay is only rendered when the menu is open, allows the menu to be closed when clicking outside of the menu */ }
      { menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
      <button onClick={() => setMenuOpen(isOpen => !isOpen)} className="ml-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
      </button>
      {/* Mapping through our categories for filter - On click add color and set the filtre to the category */}
      <Dropdown 
        title="Filter crime types"
        dropdownOptions={crimeCategories}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setSelectedOption={setSelectedFilter}
        selectedOption={selectedFilter}
      />
    </div>
  )
}

export default FilterMenu;
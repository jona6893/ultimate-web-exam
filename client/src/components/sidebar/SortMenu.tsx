import { useState } from "react";
import Crime from "../../entities/Crime";
import useCrimeStore from "../../stores/crimeStore.ts";
import Dropdown from "./Dropdown.tsx";

interface Props {
  selectedSort: string,
  setSelectedSort: (sort: string) => void
}

function SortMenu({ selectedSort, setSelectedSort }: Props) {
  const {filteredCrimes, setFilteredCrimes } = useCrimeStore();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const sortOptions: string[] = ["Severity Ascending", "Severity Descending", "Date Ascending", "Date Descending", "Crime Type A-Z", "Crime Type Z-A"];

  // after severity ascending & descending
  // after date ascending & descending
  // after crime type alphabetically [A-Z, Z-A]

  function sortCrimes(sort: string) {

    let sortedCrimes: Crime[] = [];
    switch (sort) {
      case "Severity Ascending":
        sortedCrimes = filteredCrimes.sort((a, b) => a.severity - b.severity);
        setSelectedSort("Severity Ascending");
        break;

      case "Severity Descending":
        sortedCrimes = filteredCrimes.sort((a, b) => b.severity - a.severity);
        setSelectedSort("Severity Descending");
        break;

      case "Date Descending":
        sortedCrimes = filteredCrimes.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        setSelectedSort("Date Descending");
        break;

      case "Date Ascending":
        sortedCrimes = filteredCrimes.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        setSelectedSort("Date Ascending");
        break;

      case "Crime Type A-Z":
        sortedCrimes = filteredCrimes.sort((a, b) => a.crime_type.localeCompare(b.crime_type));
        setSelectedSort("Crime Type A-Z");
        break;
        
      case "Crime Type Z-A":
        sortedCrimes = filteredCrimes.sort((a, b) => b.crime_type.localeCompare(a.crime_type));
        setSelectedSort("Crime Type Z-A");
        break;
    }
    setFilteredCrimes(sortedCrimes);
  }



  return (
    <>
      <div className="relative flex">
        { /* overlay is only rendered when the menu is open, allows the menu to be closed when clicking outside of the menu */}
        {showMenu && <div className="overlay" onClick={() => setShowMenu(false)} />}
        <button onClick={() => setShowMenu(!showMenu)} className="ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
          </svg>
        </button>
        {/* Mapping through our categories for filter - On click add color and set the filtre to the category */}
        <Dropdown
          title="Sort crime"
          dropdownOptions={sortOptions}
          menuOpen={showMenu}
          setMenuOpen={setShowMenu}
          setSelectedOption={sortCrimes}
          selectedOption={selectedSort}
        />
      </div>
    </>
  )
}
/* Uncaught TypeError: setSelectedOption is not a function */
export default SortMenu;
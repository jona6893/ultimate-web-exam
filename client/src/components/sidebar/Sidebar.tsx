import Crime from "../../entities/Crime";
import { useState, useEffect } from "react";
import SidebarCard from "./SidebarCard.tsx";
import FilterMenu from "./FilterMenu.tsx";
import { CrimeType } from "../../entities/CrimeType.ts";
import useCrimeStore from "../../stores/crimeStore.ts";
import SortMenu from "./SortMenu.tsx";

function Sidebar() {
  const [selectedFilter, setSelectedFilter] = useState<CrimeType>("All");

  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const { crimes, filteredCrimes, setFilteredCrimes } = useCrimeStore();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  function handleFilter(category: CrimeType) {
    setSelectedFilter(category);
    if (category === "All") {
      setFilteredCrimes(crimes);
    } else {
      const filteredCrimes = crimes.filter(
        (crime) => crime.crime_type === category
      );
      setFilteredCrimes(filteredCrimes);
    }
  }

  // Check if screen is resized and if mobile
  const handleResize = () => {
    setViewportWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to ensure the effect runs only once when the component mounts
  useEffect(() => {
    if (viewportWidth <= 768) {
      setShowSidebar(false);
    } else if (viewportWidth > 768) {
      setShowSidebar(true);
    }
  }, [viewportWidth]);

  return (
    <>
      {showSidebar ? (
        <section className="relative z-50 top-0 left-0 h-auto max-w-96 min-w-80 bg-[#26262a] rounded-lg flex flex-col gap-2 p-2 overflow-y-auto">
          {/* Using our filtermenu componenet */}
          <div className="flex gap-2 justify-end">
            <p className="mr-auto text-white font-bold">
              911 - <span className="font-normal">Santiago Streets</span>
            </p>
            <SortMenu></SortMenu>
            <FilterMenu
              setSelectedFilter={(category: CrimeType) =>
                handleFilter(category)
              }
              selectedFilter={selectedFilter}
            />
            {viewportWidth <= 768 && (
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="z-50 bg-primary text-white p-1 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="overflow-auto flex flex-col gap-2">
            {filteredCrimes?.map((crime: Crime) => (
              <SidebarCard key={crime._key} crime={crime} />
            ))}
          </div>
        </section>
      ) : (
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="absolute z-50 bg-primary text-white top-[1rem] left-[1rem] p-1 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      )}
    </>
  );
}

export default Sidebar;

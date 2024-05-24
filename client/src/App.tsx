import { useEffect } from "react";
import { MapComponent } from "./components/mapbox";
import Sidebar from "./components/sidebar/Sidebar";
import getCrimes from "./modules/getCrimes";
import useCrimeStore from "./stores/crimeStore";

 
function App() {
  const { setCrimes, setFilteredCrimes } = useCrimeStore();
        // Variable   change varible  set start value for variable
 

  // reactive variable to store the crime data
  async function fetchData() {
    try {
      const crimeData = await getCrimes();
      // sort by latest by default
      setCrimes(crimeData);
      crimeData.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setFilteredCrimes(crimeData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // fecth data only once on component mount
  useEffect(() => {
    fetchData()
  },[]) // dont remove the empty array. It ensures the effect runs only once when the component mounts


  // when click appends in sidebar run function in map component by using function in app


  return (
    <div className="relative flex bg-black p-2 gap-2 h-screen">
      <Sidebar />
      <MapComponent />
    </div>
  )
}

export default App;

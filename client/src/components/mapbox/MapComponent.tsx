import Crime from "../../entities/Crime";
import Map, { MapRef, Marker } from "react-map-gl";
import { useState, useRef, useEffect } from "react";
import MapCard from "./MapCard"
import useCrimeStore from "../../stores/crimeStore";
import useMapStore from "../../stores/mapStore";


function MapComponent() {
  const { crimes } = useCrimeStore();
  const {tglMapCard, setTglMapCard} = useMapStore();
  const [mapCardActive, setMapCardActive] = useState< null| string>(null);

  // Reference to the map instance
  const mapRef = useRef<MapRef | null>(null);


  // URL to icons for different crime types
  const iconMap: {[key: string]: string} = {
    "Organized crime": "./crimeIcons/Organizedcrime.svg",
    "Homicide": "./crimeIcons/Homicide.svg",
    "Assault": "./crimeIcons/Assault.svg",
    "Robbery": "./crimeIcons/Robbery.svg",
    "Cybercrime": "./crimeIcons/Cybercrime.svg",
    "Arson": "./crimeIcons/Arson.svg",
    "Gang violence": "./crimeIcons/Gang.svg",
    "Drug crime": "./crimeIcons/Drug.svg",
    "Kidnapping": "./crimeIcons/Kidnapping.svg",
    "Theft": "./crimeIcons/Theft.svg"
  }


  // handle the click on the marker and show the map card and set the z-index to 40 to make it on top of the other markers or remove it if it is already active
  function handleMapCard(_key: string, closeCard: null | string) {
    
    if(closeCard === null){
      return setMapCardActive(null)
    }
    // might be a better way to do this, also dosent work if you click on the same marker twice
    if (mapCardActive == _key) {
     setMapCardActive(null)
    }
      // scroll sidebarCard into view
    const element = document.getElementById(_key);
    //console.log("element", element)
    if (element){
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMapCardActive(_key)
    setTglMapCard(_key)
    // Get the coordinates of the selected marker from the "crimes" array where _key is equal to the value of the "index" variable
    const getCrimeCords = crimes.find(crime => crime._key === _key);
    // if the value of the "getCrimeCords" variable is not null, then center the map to the selected marker
    if (getCrimeCords) {
      const { lon, lat } = getCrimeCords;
      // Center the map to the selected marker
      mapRef.current?.flyTo({center: [lon, lat], duration: 1300});  
    }
  }
  
  // Runs when the value of the "tglMapCard" variable changes
  // This is when clicking the cards in the sidebar. it then run the 
  // handleMapCard function to show the marker on the map. 
  // the else part is to prevent the function to run when the value is null
  useEffect(() => {
    if (tglMapCard !== null){
      //console.log("null")
      handleMapCard(tglMapCard, "null");
    }else{
     handleMapCard('0',tglMapCard)
    }
    //console.log(tglMapCard)
  }, [tglMapCard])

  // Get precise adress as well from map
  return (
    <>
      <div className="w-screen h-auto rounded-lg overflow-hidden">
        <Map
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoiaGVsYm9iIiwiYSI6ImNsdGVkdWQxbzBmaWgya212OW40bTV3cHUifQ.xYokffDfUCRs-p454SCz7g"
        initialViewState={{
          longitude: 12.568337,
          latitude: 55.676098,
          zoom: 13
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        >
   
        {crimes?.map((crime: Crime) => (
            <div key={crime._key} className="">
              <Marker style={{ zIndex: mapCardActive === crime._key ? 100 : 1 }} longitude={crime?.lon} latitude={crime?.lat} anchor="bottom" pitchAlignment="viewport" onClick={() => handleMapCard(crime._key, "null")}>
                
                {/* Render a MapCard component if the value of the "counter" variable is equal to the "index" variable. Otherwise, render nothing. */}
                {mapCardActive === crime._key ? <MapCard crime={crime} />: <div className=" flex p-2 items-center justify-center border-gray-400 border bg-primary rounded-full">
                  <img className="w-8 h-8 invert" src={iconMap[crime.crime_type]} />
                  <span className="triangle w-6 h-6 top-[91%]"></span>
                </div>}
            
              </Marker>
            </div>
          ))}
        </Map>
      </div>
    </>
  )
}

export default MapComponent;
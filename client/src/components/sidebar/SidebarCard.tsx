import Crime from "../../entities/Crime";
import { useState, useEffect } from "react";
import { formatUptime, getDayAndDate } from "../../modules/timeConverter";
import useMapStore from "../../stores/mapStore";
interface Props {
  crime: Crime;
}

function SidebarCard({ crime}: Props) {
  const [colorClass, setColorClass] = useState<string>("");
  const {tglMapCard, setTglMapCard} = useMapStore();

  
  // Expand the card to show more details
  function handleExpand(crimeKey: string) {
    //console.log("tglmapcard", tglMapCard)
    //console.log("expand", expand)
    if (tglMapCard === crimeKey) {
      
      return setTglMapCard(null)
    }
    setTglMapCard(crime._key)
  }
  // Get color class based on crime severity
  const getColorClass = (severity: number) => {
    if (severity >= 8) {
        return "text-red-500";
    } else if (severity >= 5) {
        return "text-yellow-500";
    } else {
        return "text-green-500";
    }
  }
  // Update color class when crime severity changes
  useEffect(() => {
  setColorClass(getColorClass(crime?.severity));
  }, [crime]);

  

  return (
    <article
      id={crime._key}
      onClick={() => handleExpand(crime._key)}
      className={`text-white ${tglMapCard == crime._key ? 'bg-slate-600':'bg-primary'} p-4 border-gray-500 border rounded-lg cursor-pointer`}
    >
      <p>{crime?.crime_type}</p>
      <p className={colorClass}>
        <span className="text-gray-400 text-sm">Severity:</span>{" "}
        {crime?.severity}/10
      </p>
      <div className="flex justify-between">
        <p>
          <span className="text-gray-400 text-sm">{formatUptime(crime?.time)}</span>
        </p>
        <p>
          <span className="text-gray-400 text-sm">{getDayAndDate(crime?.time)}</span>
        </p>
      </div>
      {/* {expand === index && (
        <div>
          <p>time elapsed</p>
          <p>{crime.crime_type}</p>
          <p>{crime.address}</p>
          <span className="text-gray-400 text-sm">Suspect:</span>
          {crime.suspects.map((suspect) => (
            <p key={suspect._key} className="text-sm">
              {suspect.name}{" "}
              <span className="text-gray-400 text-sm">age: {suspect.age}</span>
            </p>
          ))}
        </div>
      )}   */}
    </article>
  );
}

export default SidebarCard;
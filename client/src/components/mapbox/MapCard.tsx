import Crime from "../../entities/Crime";
import getRelations from "../../modules/getRelations";
import Relation from "../../entities/Relation";
import { formatUptime, getDayAndDate } from "../../modules/timeConverter";
import { useState } from "react";
import useMapStore from "../../stores/mapStore";

interface Props {
  crime: Crime;
}

function MapCard({crime}: Props){
  const [expandedData, setExpandedData] = useState<Relation | null>(null);
  const {setTglMapCard} = useMapStore();
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

  async function handleGetRelations(key: string) {
    const data = await getRelations(key);
    setExpandedData(data);
  }



  return (
    <dialog open className="bg-primary text-secondary w-96 h-auto rounded-[10px] p-6 absolute inset-x-1/2 map-card-transform">
      <button onClick={()=>setTglMapCard(null)} className="z-50 bg-primary text-white p-2 rounded-full absolute top-0 right-0 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-xl font-bold"> {crime.crime_type} <span className={getColorClass(crime?.severity)}>{crime.severity}/10</span></p>
          <p className="text-sm opacity-70 mb-2">{crime.address}</p>
          <p className="text-base opacity-70">{formatUptime(crime.time)}</p>  
          <p className="text-base opacity-70">{getDayAndDate(crime.time)}</p>
        </div>
        <div className="flex flex-col gap-y-2 text-secondary text-base">
          <article>
            <p className="font-semibold">Suspects</p>
            {crime.suspects.map((suspect) => (
              <p
                key={suspect._key}
                className="opacity-70 text-sm cursor-pointer hover:opacity-100 duration-200"
                onClick={() => handleGetRelations(suspect._key)}
              >
                {suspect.first_name}{" "}{suspect.last_name}
              </p>
            ))}
          </article>
          <article>
          <p className="font-semibold">Victims</p>
          {crime.victims.map((victim) => (
            <p 
              key={victim._key}
              className="opacity-70 text-sm cursor-pointer hover:opacity-100 duration-200"
              onClick={() => handleGetRelations(victim._key)}
              >
              {victim.first_name}{" "}{victim.last_name}
            </p>
          ))}
          </article>
          <article>
          <p className="font-semibold">Witnesses</p>
          {crime.witnesses.map((witness) => (
            <p 
            key={witness._key}
            className="opacity-70 text-sm cursor-pointer hover:opacity-100 duration-200"
            onClick={() => handleGetRelations(witness._key)}
            >
              {witness.first_name}{" "}{witness.last_name}
            </p>
          ))}
          </article>
        </div>
      </div>
      {/* Additional information for expanded person */}
      {expandedData && (expandedData.friends.length > 0 || expandedData.family.length > 0) && (
        <div className="border-t border-white mt-4 pt-4">
          <p className="font-semibold">{expandedData.first_name}</p>
          <p className="">Related to: {
            expandedData.family.map((person) => (
              <span key={person._key} className="comma font-semibold">{person.first_name} {person.last_name}</span>
            ))
          }</p>
          <p className="">Friends with: <span className="font-semibold">{
            expandedData.friends.map((person) => (
              <span key={person._key} className="comma font-semibold">{person.first_name} {person.last_name}</span>
            ))
          }</span></p>
        </div>
      )}
      {/* triangle bottom tip pointer */}
      <span className="triangle w-10 h-10 top-[110%] map-card-transform left-[50%] right-[50%]"></span>
    </dialog>
  )
}

export default MapCard;

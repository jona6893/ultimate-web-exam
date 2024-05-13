interface Props<OptionType> {
  title: string;
  dropdownOptions: string[];
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  setSelectedOption: (option: OptionType) => void;
  selectedOption: OptionType;
}

function Dropdown<OptionType>({title, dropdownOptions, menuOpen, setMenuOpen, setSelectedOption, selectedOption}: Props<OptionType>) {
  return (
    <div className={`absolute z-[100] right-0 mt-8 w-48 py-1 rounded-md bg-gray-100 border border-gray-300 origin-top-right transition-all ease-in-out ${!menuOpen && "pointer-events-none scale-75 opacity-0"}`}>
      <p className="px-2 py-1">{title}</p>
      <hr className="my-0.5 border-t border-gray-300"/>
      <ul>
        {dropdownOptions.map((option, index) => (
          <li key={index}>
            <button
            key={option}
            onClick={() => {setSelectedOption(option as OptionType); setMenuOpen(false)}}
            className={`py-1.5 px-2 w-full text-sm text-left ${selectedOption === option ? "bg-gray-200 font-medium" : "bg-transparent"}`}
            >{option}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown;
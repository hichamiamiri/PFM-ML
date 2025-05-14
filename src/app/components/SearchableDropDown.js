import { useState, useRef, useEffect } from 'react';

const SearchableDropdown = ({ 
  options, 
  value, 
  onChange, 
  name, 
  id, 
  className,
  placeholder = "Search..." 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  
  // Find the label for the currently selected value
  const selectedValue = options.find(option => option === value) || "";

  // Filter options based on search term
  const filteredOptions = options
    .filter(option => 
      option.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 10); // Only display max 10 results
    
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className={`${className} flex justify-between items-center cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="truncate">{selectedValue || placeholder}</div>
        <div className="ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
          <div className="p-2 ">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          
          <div>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                    option === value ? 'bg-blue-100' : ''
                  }`}
                  onClick={() => {
                    onChange({ target: { name, value: option } });
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
      
      {/* Hidden select for form submission */}
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="opacity-0 absolute h-0"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchableDropdown;
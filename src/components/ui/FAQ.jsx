import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-[#E4E0D8] mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-[#14140F] text-[1.15rem] font-semibold pr-4 group-hover:text-[#B8955D] transition-colors">
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full border border-[#E4E0D8] flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#B8955D] border-[#B8955D] text-white rotate-180' : 'bg-transparent text-[#B8955D] group-hover:bg-[#F7F5F0]'}`}>
          <ChevronDown size={16} />
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-[#3A3630] m-0 leading-[1.8] text-lg font-serif">
          {answer}
        </p>
      </div>
    </div>
  );
};

/** @format */

import Image from "next/image";
import magnifying from "../../../public/assets/images/magnifying.svg";


const SearchBar = () => {
  return (
         <div className="relative flex items-center transition-all border-gray-400 hover:border-black border cursor-pointer w-full lg:w-5/12 py-1.5 px-4 rounded-md  lg:mb-0 lg:ml-10">
      <div className="mr-2">
        <Image src={magnifying} alt="magnifying" width={15} />
      </div>
      <div className=" ">
        <p className="text-sm text-gray-500 ml-2">Quick Search</p>
      </div>
      
    </div>

    
    
 
     
  );
};

export default SearchBar;

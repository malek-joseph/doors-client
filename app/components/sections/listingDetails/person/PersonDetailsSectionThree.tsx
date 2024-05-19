/** @format */

import Image from "next/image";
import cigarette from '@/public/assets/images/cigarette.png';
import pet from '@/public/assets/images/pet.png';
import visitors from '@/public/assets/images/visitors.png';
import students from '@/public/assets/images/student.png';


interface PersonDetailsSectionThreeProps {
  roommatePreferences: string[];


}

const PersonDetailsSectionThree: React.FC<PersonDetailsSectionThreeProps> = ({
 roommatePreferences

}) => {

   const smokersAllowed = roommatePreferences.includes("smokers");
   const petsAllowed = roommatePreferences.includes("pets");
   const visitorsAllowed = roommatePreferences.includes("visitors");
  const studentsAllowed = roommatePreferences.includes("students");
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-8 mx-4">
     <div className="flex flex-col justify-start items-center">
        <Image
          src={cigarette}
          width={40}
          height={40}
          className="w-10 h-10 mb-2"
          alt="wifi"
        />
        <div className="text-teal-500 flex items-center justify-center flex-col mb-2">
          <span className="text-sm text-gray-500">Smokers</span>
          <span className="text-xs">{smokersAllowed ? "Allowed" : "Not Allowed"}</span>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center">
        <Image
          src={pet}
          width={40}
          height={40}
          className="w-10 h-10 mb-2"
          alt="wifi"
        />
        <div className="text-teal-500 flex items-center justify-center flex-col mb-2">
          <span className="text-sm text-gray-500">Internet</span>
                  <span className="text-xs">{petsAllowed ? "Allowed" : "Not Allowed"}</span>

        </div>
      </div>
      <div className="flex flex-col justify-start items-center">
        <Image
          src={visitors}
          width={40}
          height={40}
          className="w-10 h-10 mb-2"
          alt="roommates"
        />
        <div className="text-teal-500 flex items-center justify-center flex-col mb-2">
          <span className="text-sm text-gray-500">Visitors</span>
                   <span className="text-xs">{visitorsAllowed ? "Allowed" : "Not Allowed"}</span>

        </div>
      </div>
      <div className="flex flex-col justify-start items-center">
        <Image
          src={students}
          width={40}
          height={40}
          className="w-10 h-10 mb-2"
          alt="roommates"
        />
        <div className="text-teal-500 flex items-center justify-center flex-col mb-2">
          <span className="text-sm text-gray-500">Students</span>
                   <span className="text-xs">{ studentsAllowed ? "Allowed" : "Not Allowed"}</span>

        </div>
      </div>
    </div>
  );
};

export default PersonDetailsSectionThree;

/** @format */

import Image from "next/image";
import cigarette from '@/public/assets/images/cigarette.png';
import pet from '@/public/assets/images/pet.png';
import visitors from '@/public/assets/images/visitors.png';
import students from '@/public/assets/images/student.png';
import bedSideTable from '@/public/assets/images/bedSideTable.png';
import wardrobe from '@/public/assets/images/wardrobe.png';
import airConditioner from '@/public/assets/images/airConditioner.png';
import heater from '@/public/assets/images/heater.png';
import table from '@/public/assets/images/table.png';
import chair from '@/public/assets/images/chair.png';
import couch from '@/public/assets/images/couch.png';
import tv from "@/public/assets/images/tv.png";
import balcony from "@/public/assets/images/balcony.png";
import lock from "@/public/assets/images/lock.png";
import type { StaticImageData } from "next/image";


interface PersonDetailsSectionFourProps {
  personFeatures: string[];
}

const PersonDetailsSectionFour: React.FC<PersonDetailsSectionFourProps> = ({
 personFeatures

}) => {

   const smokersAllowed = personFeatures.includes("smokers");
   const petsAllowed = personFeatures.includes("pets");
   const visitorsAllowed = personFeatures.includes("visitors");
  const studentsAllowed = personFeatures.includes("students");

  type FurnishingFeature = {
  name: string;
  src: StaticImageData; 
};

    const furnishingItems: FurnishingFeature[] = [
      { name: "Bed side table", src: bedSideTable },
      { name: "Wardrobe", src: wardrobe },
      { name: "Air Conditioner", src: airConditioner },
      { name: "Heater", src: heater },
      { name: "Table", src: table },
      { name: "Chair", src: chair },
      { name: "Couch", src: couch },
      { name: "TV", src: tv },
      { name: "Balcony", src: balcony },
      { name: "Door Lock", src: lock },
   
    ];

      const isFeatureSelected = (name: string) => personFeatures?.includes(name);
  
  return (
    <div className="w-9/10 md:w-8/10 lg:w-7/10 flex items-center justify-center flex-col">
      <div className="flex flex-col items-center w-full mt-4">
        <div className="w-full text-start mb-10">Preferred Appliances:</div>
        <div className="grid grid-cols-3 lg:grid-cols-5 md:grid-cols-5  gap-4">
          {furnishingItems.map((item) => (
            <div
              className="flex flex-col items-center justify-center"
              key={item.name}>
              <div
                className={`p-1 border rounded-full transition-all ${
                  isFeatureSelected(item.name)
                    ? "bg-teal-200 text-white"
                    : "bg-white border-gray-300"
                }`}
                aria-label={item.name}>
                <div />
                <div className="w-12 h-12 flex justify-center items-center p-1">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={60}
                    height={60}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500 font-extralight mt-3">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonDetailsSectionFour;

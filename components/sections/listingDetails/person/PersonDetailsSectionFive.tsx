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


interface PersonDetailsSectionFiveProps {
  description: string;
  personDescription: string;
}

const PersonDetailsSectionFive: React.FC<PersonDetailsSectionFiveProps> = ({
 description,
 personDescription

}) => {


  
  return (
    <div className="w-9/10 md:w-8/10 lg:w-7/10 flex items-center justify-center flex-col">
      <div className="flex flex-col items-start w-full mt-4">
        <div className="flex flex-col">
          <h3 className="font-bold">About existing habitants</h3>
          <p>{description}</p>
        </div>
          <hr className="my-3 w-1/2" />
          <div className="flex flex-col">
          <h3 className="font-bold">About our person</h3>
          <p>{personDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailsSectionFive;

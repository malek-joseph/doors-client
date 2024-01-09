/** @format */

import Image from "next/image";
import jobImage from "../../../../../public/assets/images/job.png"
import smokerImage from "../../../../../public/assets/images/smoker.png"
import petsImage from "../../../../../public/assets/images/pets.png"
import AboutCard from "./AboutCard";


interface AboutMeProps {
  about: string;
  job: string;
  smoker: boolean;
  pets: boolean;


}

const AboutMe: React.FC<AboutMeProps> = ({
  about,
  job,
  smoker,
  pets,

}) => {
  return (
    <div className="flex flex-col mb-8 ">
      <div className="mb-5">
        <h3 className="text-gray-500 mb-3 text-lg font-semibold">About</h3>
        <p className="text-gray-400 text-sm">{about}</p>
      </div>
      <div className="flex flex-col justify-between lg:flex-row md:flex-row mx-4 gap-4 ">
        <div className="w-full flex flex-col items-center lg:w-1/3 md:w-full">
          <AboutCard icon={jobImage.src} title="job" value={job} />
        </div>
        <div className="w-full flex flex-col items-center lg:w-1/3 md:w-full">
          <AboutCard icon={smokerImage.src} title="smoker" value={smoker} />
        </div>
        <div className="w-full flex flex-col items-center lg:w-1/3 md:w-full">
          <AboutCard icon={petsImage.src} title="pets" value={pets} />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

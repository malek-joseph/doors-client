/** @format */

import Image from "next/image";


interface AboutCardProps {
  icon: string;
  title: string;
  value: boolean | string;


}

const AboutCard: React.FC<AboutCardProps> = ({
  icon,
  title,
  value

}) => {
  return (
    <div className="flex justify-start  items-end w-8/12  mb-3">
            <div className="relative w-10 h-10 mr-2 ">

        <Image
          src={icon}
          alt={title}
          width={50}
          height={50}
          layout="fixed" // or layout="responsive"
          objectFit="cover"
          objectPosition="center"
        />
        </div>
      <div className="text-teal-500">
        {value}
        {value === true && "Yes"}
        {value === false && "No"}
      </div>
    </div>
  );
};

export default AboutCard;

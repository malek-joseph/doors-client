/** @format */

import Image from "next/image";
import React from "react";
import coin from "../../../../../public/assets/images/coin.png"
import calendar from "../../../../../public/assets/images/calendar.png";
import moving from "../../../../../public/assets/images/moving.png";

interface BudgetAndStayProps {
  budget?: number;
  availability?: string;
  availableDuration?: number;
}

const BudgetAndStay: React.FC<BudgetAndStayProps> = ({
  budget,
  availability,
  availableDuration,
}) => {
  return (
    <div className="flex flex-col justify-between lg:flex-row md:flex-row mx-4 gap-4 ">
      <div className="w-full flex flex-col items-center lg:w-1/3 md:w-full">
        <div className="flex justify-start items-end w-8/12  mb-3">
          <Image
            src={coin}
            width={40}
            height={40}
            className="w-10 h-10 mr-2"
            alt="coin"
          />
          <div className="text-teal-500">
            {budget}
            <span className="text-sm text-gray-300">/Month</span>{" "}
          </div>
        </div>
        <div className="text-gray-500 text-sm">Budget</div>
      </div>
      <div className="w-full flex flex-col items-center lg:w-1/3 md:w-full">
        <div className="flex justify-start items-end w-8/12  mb-3">
          <Image
            src={calendar}
            width={40}
            height={40}
            className="w-10 h-10 mr-2"
            alt="calendar"
          />
          <div className="text-teal-500 flex items-center">
            {availableDuration}
            <span className="text-sm text-gray-300 "> &nbsp;Months</span>
          </div>
        </div>
        <div className="text-gray-500 text-sm">Stay Duration</div>
      </div>
      <div className="w-full flex flex-col items-center lg:w-1/3 md:w-full">
        <div className="flex justify-start items-end w-8/12  mb-3">
          <Image
            src={moving}
            width={40}
            height={40}
            alt="moving"
            className="w-10 h-10 mr-2"
          />
          <div className="text-teal-500">{availability}</div>
        </div>
        <div className="text-gray-500 text-sm">Move Date</div>
      </div>
    </div>
  );
};

export default BudgetAndStay;

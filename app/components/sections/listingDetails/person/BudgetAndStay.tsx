/** @format */

import Image from "next/image";
import React from "react";
import coin from "../../../../../public/assets/images/coin.png"

interface BudgetAndStayProps {
  budget?: number;
}

const BudgetAndStay: React.FC<BudgetAndStayProps> = ({ budget }) => {
  return (
    <div className="flex flex-col justify-between lg:flex-row md:flex-row mx-4 gap-4 ">
      <div className="w-1/3 flex flex-col items-center">
        <div className="flex justify-between items-end w-8/12 mb-3">
          <Image
            src={coin}
            width={40}
            height={40}
            alt="coin"
            className="mr-4"
          />
          <div className="text-teal-500">
            {budget}
            <span className="text-sm text-gray-300">/Month</span>{" "}
          </div>
        </div>
        <div className="text-gray-500">Budget</div>
      </div>
      <div className="w-1/3 flex flex-col items-center">
        <div className="flex justify-between items-end w-8/12 mb-3">
          <Image
            src={coin}
            width={40}
            height={40}
            alt="coin"
            className="mr-4"
          />
          <div className="text-teal-500">
            {budget}
            <span className="text-sm text-gray-300">/Month</span>{" "}
          </div>
        </div>
        <div className="text-gray-500">Budget</div>
      </div>
      <div className="w-1/3 flex flex-col items-center">
        <div className="flex justify-between items-end w-8/12 mb-3">
          <Image
            src={coin}
            width={40}
            height={40}
            alt="coin"
            className="mr-4"
          />
          <div className="text-teal-500">
            {budget}
            <span className="text-sm text-gray-300">/Month</span>{" "}
          </div>
        </div>
        <div className="text-gray-500">Budget</div>
      </div>
    </div>
  );
};

export default BudgetAndStay;

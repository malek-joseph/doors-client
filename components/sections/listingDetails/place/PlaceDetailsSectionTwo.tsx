/** @format */

import Image from "next/image";
import React from "react";
import coins from '@/public/assets/images/coins.png';
import wifi from '@/public/assets/images/wifi.png';
import roommates from '@/public/assets/images/roommates.png';


interface PlaceDetailsSectionTwoProps {
  monthlyRent: number;
  deposit: number;
  billsIncluded: boolean;
  monthlyBills: number;
  internet: string;
  totalRoommates: number | string;
}

const PlaceDetailsSectionTwo: React.FC<PlaceDetailsSectionTwoProps> = ({
  monthlyRent,
  deposit,
  billsIncluded,
  monthlyBills,
  internet,
  totalRoommates
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-8 mx-4">
      <div className=" flex flex-col justify-start items-center">
        <Image
          src={coins}
          width={40}
          height={40}
          className="w-10 h-10 mb-2"
          alt="coin"
        />
        <div className="flex flex-col">
       <div className="text-teal-500 flex items-center justify-start ">
          <span className="text-sm text-gray-500">Rent:&nbsp;</span>
          {monthlyRent}
          <span className="text-sm text-gray-300"> &nbsp;EGP/Month</span>
        </div>
        <div className="text-teal-500 flex items-center justify-start ">
          <span className="text-sm text-gray-500">Deposit:&nbsp; </span>
          {deposit}
          <span className="text-sm text-gray-300"> &nbsp;EGP</span>
        </div>
        <div className="text-teal-500 flex items-center justify-start">
          <span className="text-sm text-gray-500">Bills Included:&nbsp; </span>
          {billsIncluded ? (
            <span className="text-sm text-gray-300"> &nbsp;Yes</span>
          ) : (
            <span className="text-sm text-gray-300"> &nbsp;No</span>
          )}
          </div>
          {monthlyBills ? (
             <div className="text-teal-500 flex items-center justify-center md:justify-start lg:justify-start ">
          <span className="text-sm text-gray-500">Monthly Bills:&nbsp; </span>
          {monthlyBills}
          <span className="text-sm text-gray-300"> &nbsp;EGP</span>
        </div>
          ): null}
        </div>
 
      </div>
      <div className="flex flex-col justify-start items-center">
        <Image
          src={wifi}
          width={40}
          height={40}
          className="w-10 h-10 mb-2"
          alt="wifi"
        />
        <div className="text-teal-500 flex items-center justify-center flex-col mb-2">
          <span className="text-sm text-gray-500">Internet</span>
          <span className="text-xs">{internet}</span>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center">
        <Image
          src={roommates}
          width={40}
          height={40}
          className="w-10 h-10 mb-2"
          alt="roommates"
        />
        <div className="text-teal-500 flex items-center justify-center flex-col mb-2">
          <span className="text-sm text-gray-500">Roommates</span>
          <span className="text-xs">{totalRoommates}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailsSectionTwo;

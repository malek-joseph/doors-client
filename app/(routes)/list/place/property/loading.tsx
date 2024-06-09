/** @format */

import Spinner from "@/app/components/shared/spinner/Spinner";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center net_height w-full">
      <Spinner size={40} />
    </div>
  );
};

export default loading;

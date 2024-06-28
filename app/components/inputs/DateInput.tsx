/** @format */

import React, { ChangeEvent } from "react";

interface DateInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  value,
  onChange,
}) => (
  <div className="mt-4 flex flex-col items-start w-full ">
    <label htmlFor={name} className="block text-lg font-medium text-gray-700">
      {label}
    </label>
    <input
      type="date"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500  rounded-md "
    />
  </div>
);

export default DateInput;

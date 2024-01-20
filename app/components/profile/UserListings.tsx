
 
import React from "react";

const UserListings = () => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg w-full my-4">
      <h1 className="text-xl font-semibold mb-4">My listings</h1>
      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="bg-gray-700 p-2 rounded-full text-lg mr-3">🏠</div>
            <h2 className="font-semibold text-lg">Offering a place</h2>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            + Create listing
          </button>
        </div>
        <div className="flex items-center justify-between bg-gray-700 px-4 py-3 rounded">
          <div className="flex items-center">
            <span className="block h-3 w-3 bg-red-600 rounded-full mr-3"></span>
            <span className="truncate">
              231 Elizabeth Street, Sydney, Sydney, ...
            </span>
          </div>
          <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            Resume
          </button>
        </div>
      </section>
      <section>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="bg-gray-700 p-2 rounded-full text-lg mr-3">🔍</div>
            <h2 className="font-semibold text-lg">Looking for a place</h2>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            + Create listing
          </button>
        </div>
        <div className="flex items-center justify-between bg-gray-700 px-4 py-3 rounded">
          <span className="block">You don&apos;t have a person listing</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            + Create
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserListings;

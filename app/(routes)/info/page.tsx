/** @format */
import Breadcrumb from "@/app/components/navigation/breadcrumbs/BreadcrumbStandard";
import NavMenu from "@/app/components/navigation/NavMenu";
import Image from "next/image";

const Info = () => {
  return (
    <>
      <div className="md:mt-[.9rem] lg:mt-[.9rem] mt-[4.5rem] md:px-[150px] lg:px-[150px] px-[50px] shadow-lg flex items-center bg-gray-100">
        <NavMenu />
      </div>
      <div className="h-[40px] md:px-[150px] lg:px-[150px] px-[50px] shadowb-lg flex items-center bg-neutral-50">
        <Breadcrumb />
      </div>

      <div className="max-w-4xl mx-auto p-4 mb-14">
        <h1 className="text-2xl md:text-3xl font-bold my-9 text-teal-950">
          Welcome to Doors
        </h1>
        <p className="text-sm md:text-base text-gray-700 mb-14">
          Doors is Egypt’s leading platform for finding shared accommodation.
          Based in Cairo, Egypt, Doors enables individuals to list their
          available rooms, discover roommates, or team up with others to start a
          share house. Doors addresses a critical challenge faced by Egyptian
          youth when moving to a new city, providing a seamless and reliable
          solution for their accommodation needs.
        </p>
        <div className="flex justify-center">
          <Image
            src="/assets/images/about.jpeg"
            alt="roommates"
            className="rounded-lg"
            width={800}
            height={400}
            priority={true}
          />
        </div>
        <h3 className="text-lg md:text-xl font-bold mb-5 mt-14 text-teal-950">
          Find Your Ideal Room
        </h3>
        <p className="text-sm md:text-base text-gray-700 mb-5">
          Are you searching for the perfect room? Look no further than Doors!
          Our platform connects you with a wide range of listings across Egypt.
          Whether you're looking for a cozy studio, a spacious apartment, or a
          shared house, Doors has you covered. Here's why you'll love using
          Doors to find your ideal room:
        </p>
        <ul className="list-disc pl-6 mb-8 text-sm md:text-base">
          <li>
            <strong className="text-teal-900">Custom Filters:</strong> Narrow
            down your search based on location, budget, and amenities. Find the
            room that suits your lifestyle.
          </li>
          <li>
            <strong className="text-teal-900">Real Photos:</strong> All listings
            include high-quality photos, so you can visualize your future space.
          </li>
          <li>
            <strong className="text-teal-900">Transparent Details:</strong> Get
            essential information about each room, including rent, utilities,
            and any additional fees.
          </li>
          <li>
            <strong className="text-teal-900">Secure Messaging:</strong>{" "}
            Communicate directly with landlords or roommates through our secure
            messaging system.
          </li>
          <li>
            <strong className="text-teal-900">Verified Listings:</strong> Our
            team verifies listings to ensure accuracy and prevent scams.
          </li>
        </ul>
        <h3 className="text-lg md:text-xl font-bold mb-5 mt-14 text-teal-950">
          Find Your Ideal Roommate
        </h3>
        <p className="text-sm md:text-base text-gray-700 mb-5">
          Are you looking for the perfect roommate? Doors is here to help! Our
          platform connects you with a diverse community of people across Egypt.
          Whether you need a roommate for a shared apartment, a house, or any
          other living situation, Doors has got you covered. Here's why you'll
          love using Doors to find your ideal roommate:
        </p>
        <ul className="list-disc pl-6 mb-8 text-sm md:text-base">
          <li>
            <strong className="text-teal-900">Detailed Profiles:</strong> Browse
            through comprehensive profiles with information on interests,
            lifestyle, and preferences to find a compatible roommate.
          </li>
          <li>
            <strong className="text-teal-900">Custom Matching:</strong> Use our
            advanced matching algorithm to find roommates who align with your
            living habits and preferences.
          </li>
          <li>
            <strong className="text-teal-900">Verified Users:</strong> Our team
            verifies users to ensure safety and prevent scams.
          </li>
          <li>
            <strong className="text-teal-900">Secure Messaging:</strong>{" "}
            Communicate directly with potential roommates through our secure
            messaging system.
          </li>
          <li>
            <strong className="text-teal-900">Community Reviews:</strong> Read
            reviews from previous roommates to make informed decisions.
          </li>
        </ul>
      </div>
    </>
  );
};

export default Info;

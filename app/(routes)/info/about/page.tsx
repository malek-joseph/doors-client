/** @format */
import Breadcrumb from "@/app/components/navigation/breadcrumbs/BreadcrumbStandard";
import Image from "next/image";
import NavMenu from "@/app/components/navigation/NavMenu";

const AboutUs = () => {
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
          About Doors
        </h1>
        <p className="text-sm md:text-base text-gray-700 mb-14">
          Based in Cairo, Doors is Egypt&apos;s premier platform for shared
          accommodation. Our mission is to empower individuals by providing a
          seamless solution for listing available rooms, connecting with
          potential roommates, and establishing shared housing. Whether you&apos;re a
          student, young professional, or newcomer to a city, Doors simplifies
          the process of finding comfortable and reliable accommodation. Welcome
          to Doors!
        </p>
        <div className="flex justify-center">
          <Image
            src="/assets/images/about.jpeg"
            alt="about"
            className="rounded-lg"
            width={800}
            height={400}
            priority={true}
          />
        </div>
        <h3 className="text-lg md:text-xl font-bold mb-5 mt-14 text-teal-950">
          Our Mission
        </h3>
        <p className="text-sm md:text-base text-gray-700 mb-5">
          Our mission is to provide a platform that makes finding shared
          accommodation easy, reliable, and safe. We aim to connect people in a
          way that promotes community, trust, and shared living experiences,
          helping individuals find the perfect living situation that meets their
          needs and preferences.
        </p>
        <h3 className="text-lg md:text-xl font-bold mb-5 mt-14 text-teal-950">
          Our Vision
        </h3>
        <p className="text-sm md:text-base text-gray-700 mb-5">
          Our vision is to become the go-to platform for shared accommodation in
          Egypt and beyond. We aspire to create a community where individuals
          can find not just a place to live, but a home where they can thrive,
          build lasting relationships, and enjoy a better quality of life.
        </p>
        <h3 className="text-lg md:text-xl font-bold mb-5 mt-14 text-teal-950">
          Why Choose Doors?
        </h3>
        <p className="text-sm md:text-base text-gray-700 mb-5">
          At Doors, we prioritize the safety and satisfaction of our users. Here
          are a few reasons why you should choose Doors for your shared
          accommodation needs:
        </p>
        <ul className="list-disc pl-6 mb-8 text-sm md:text-base">
          <li>
            <strong className="text-teal-900">Trust and Safety:</strong> Our
            team verifies all listings and users to ensure a safe and reliable
            experience.
          </li>
          <li>
            <strong className="text-teal-900">User-Friendly Interface:</strong>{" "}
            Our platform is easy to use, allowing you to find or list a room
            with just a few clicks.
          </li>
          <li>
            <strong className="text-teal-900">Community Support:</strong>{" "}
            Connect with a supportive community of individuals who share your
            living preferences and goals.
          </li>
          <li>
            <strong className="text-teal-900">Comprehensive Listings:</strong>{" "}
            Access detailed information about each listing, including rent,
            amenities, and more.
          </li>
          <li>
            <strong className="text-teal-900">
              Responsive Customer Service:
            </strong>{" "}
            Our customer service team is here to help you with any questions or
            issues you may encounter.
          </li>
        </ul>
        <h3 className="text-lg md:text-xl font-bold mb-5 mt-14 text-teal-950">
          Our Values
        </h3>
        <ul className="list-disc pl-6 mb-8 text-sm md:text-base">
          <li>
            <strong className="text-teal-900">Integrity:</strong> We operate
            with honesty and transparency in all our dealings.
          </li>
          <li>
            <strong className="text-teal-900">Community:</strong> We foster a
            sense of community and belonging among our users.
          </li>
          <li>
            <strong className="text-teal-900">Innovation:</strong> We
            continuously improve our platform to better serve our users&apos; needs.
          </li>
          <li>
            <strong className="text-teal-900">Excellence:</strong> We strive for
            excellence in everything we do.
          </li>
        </ul>
      </div>
    </>
  );
};

export default AboutUs;

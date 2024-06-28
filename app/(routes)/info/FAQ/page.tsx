/** @format */

"use client";
import Breadcrumb from "@/app/components/navigation/breadcrumbs/BreadcrumbStandard";
import Image from "next/image";
import NavMenu from "@/app/components/navigation/NavMenu";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import Link from 'next/link'

const FAQ = () => {
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
          Frequently Asked Questions
        </h1>
        <p className="text-sm md:text-base text-gray-700 mb-8 leading-relaxed">
          For questions or assistance, please check our Frequently Asked
          Questions section.
        </p>
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/images/FAQ.jpeg"
            alt="FAQ"
            className="rounded-lg"
            width={800}
            height={400}
            priority={true}
          />
        </div>

        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold my-7 text-teal-950">
            Questions about listing and account
          </h2>
          <div className="pl-4">
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      How do I stop a listing from being displayed or edit my
                      listing?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  To activate or edit your listing, select the circular
                  person/profile icon at the top right corner of the page, make
                  sure you're logged in first &gt; select profile &gt; then
                  select the listing under ‘Your Listings’ in the centre of the
                  dashboard. At the right of the next page will be a button to
                  Activate. To deactivate, or stop the listing from appearing in
                  the listings section or in search, you can follow the same
                  steps, except the button will display "Mark as rented" for
                  places, and "Found a place" for roommate listings. Edit
                  options appear under each section of the listing.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      How do I delete my listing?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  To Delete a listing, select the circular person/profile icon
                  at the top right corner of the page, make sure you're logged
                  in first &gt; select profile &gt; then select the listing
                  under ‘Your Listings’ in the centre of the dashboard. At the
                  right of the next page will be a button to Delete the listing.
                  This will remove the listing from the listings section, search
                  results and will delete it completely from your account.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      How do I deactivate my account?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  To Deactivate your account, select the circular person/profile
                  icon at the top right corner of the page, make sure you're
                  logged in first &gt; select profile &gt; then scroll down, and
                  you'll find the option to deactivate your account at the
                  bottom of the dashboard.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold my-7 text-teal-950">
            Security questions
          </h2>
          <div className="pl-4">
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Why was my listing / account deactivated or deleted?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  All Free accounts that have been inactivate for more than 7
                  days will receive an email notification asking them if they
                  are “still looking?”. If a member fails to log in within 48hrs
                  of that email being sent, their listing will be deactivated.
                  This is to ensure that all listings on the platform are live
                  and available. All accounts that have been inactive for more
                  than 3 years will be automatically deleted by our system.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Why is my listing undergoing security checks?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  All new and edited listings go through security checks,
                  formerly known as moderation, to ensure they don’t contain
                  anything prohibited. From time to time, your account may also
                  be checked by our system and team. These checks are to ensure
                  the safety of all members on the site. This process should
                  only take a few minutes, however, if anything is picked up by
                  the system it will need to undergo a manual check. Depending
                  on the time of day or the length of the queue, this can take
                  longer to process. Please be patient, our team will approve
                  your listing as soon as possible.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      How do I report another member?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  You can report a listing via the “Report listing” link at the
                  bottom of every listing. You can also report a member via the
                  report member link in your messages. Click the three dots in
                  the message header to access this link. All feedback is
                  received in confidence.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      I have encountered a bug or website issue.
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
               If you have a bug or issue to report, please <Link href="/contact" className="text-teal-500 hover:underline">contact us</Link>. To help us investigate and resolve the issue as quickly as possible, please also provide us with the device and browser you were using at the time.

Screenshots or URLs are appreciated and may help us identify the issue faster.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;

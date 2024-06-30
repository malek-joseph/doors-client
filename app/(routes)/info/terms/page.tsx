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
import Link from "next/link";

const Terms = () => {
  return (
    <>
      <div className="md:mt-[.9rem] lg:mt-[.9rem] mt-[4.5rem] md:px-[150px] lg:px-[150px] px-[50px] shadow-lg flex items-center bg-gray-100">
        <NavMenu />
      </div>
      <div className="h-[40px] md:px-[150px] lg:px-[150px] px-[50px] shadowb-lg flex items-center bg-neutral-50">
        <Breadcrumb />
      </div>
      <div className="max-w-4xl mx-auto p-4 mb-14 md:px-14 lg:px-14 px-5">
        <h1 className="text-2xl md:text-3xl font-bold my-9 text-teal-950">
          Terms and conditions of using Doors
        </h1>
        <p className="text-sm md:text-base text-gray-700 mb-8 leading-relaxed">
          Our terms of use outline guidelines for safe, fair, and respectful
          interaction within our community. Whether listing rooms, connecting
          with roommates, or exploring housing options, our terms ensure a
          secure and positive experience for all users. Join us in fostering a
          supportive environment where integrity, community, and excellence
          guide every interaction.
        </p>
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/images/terms.jpeg"
            alt="terms"
            className="rounded-lg"
            width={800}
            height={400}
            priority={true}
          />
        </div>

        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold my-7 text-teal-950">
            1. Listings terms of use
          </h2>
          <div className="pl-4">
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Uploading Listings
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <header className="my-3 font-semibold">
                    If you upload Content and/or create a Listing:
                  </header>

                  <ol className="list-decimal list-inside mb-6 ml-5 text-sm">
                    <li className="mb-3">
                      You must ensure that such Content and Listings are true,
                      correct and not duplicated.
                    </li>
                    <li className="mb-3">
                      You must ensure that such Content and Listings are
                      up-to-date at the time they are uploaded and are kept
                      up-to-date for the duration of the time they are available
                      on the Website.
                    </li>
                    <li className="mb-3">
                      You must remove any Content and Listings as soon as
                      reasonably practicable after either:
                      <ol className="list-lower-alpha list-inside ml-5 text-xs  mt-3">
                        <li className="mb-1">
                          A. The accommodation the subject of the Listing has
                          been withdrawn from rent or after you have filled the
                          vacancy for that accommodation, whichever is earlier.
                        </li>
                        <li className="mb-1">
                          B. the person identified in the Listing that is
                          seeking accommodation has found accommodation and no
                          longer needs to seek accommodation or no longer needs
                          accommodation for whatever reason, whichever is
                          earlier.
                        </li>
                      </ol>
                    </li>
                    <li className="mb-3">
                      You are solely responsible for making your own assessment
                      of any user who contacts you in relation to any Listing
                      and their suitability for the vacancy the subject of the
                      Listing or the suitability of the accommodation (as
                      applicable). Doors will not provide any information about
                      any such users or assist you in any way in making your
                      assessment by, for example, conducting any background
                      checks that may be appropriate in respect of such users.
                    </li>
                    <li className="mb-3">
                      You must ensure that any proposed rental agreement between
                      you and another person for accommodation abides by any
                      Local or State laws relating to the provision or use of
                      rental accommodation, including residential tenancy law
                      and local government planning laws.
                    </li>
                  </ol>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      In case of terms breach
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  If you use the Services in a way that breaches these Terms and
                  Conditions of Use or we deem any Content or Listing on the
                  Website to be unacceptable, Doors may take action to remedy
                  this, including but not limited to, amending or deleting the
                  Content or Listing, adjusting access to your Account,
                  terminating your Account or any other action that we determine
                  appropriate in our sole and absolute discretion.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Inactivity of a Listing owner
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  If Doors determines that any Content or Listing has been
                  inactive for 7 days or longer, it may remove that Content or
                  Listing in its sole and absolute discretion.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Listing Duplication
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Discretion is granted to Doors to delete, deactivate or edit
                  any Content or Listings that are duplicated, breach our Terms
                  and Conditions or are found to be inappropriate.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Tenant representation
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Doors does not make any representation or provide any warranty
                  in respect of any user of the Website including, without
                  limitation, any representation or warranty in respect of the
                  suitability, behavioural characteristics of or
                  creditworthiness of a user as a tenant or prospective tenant
                  of any accommodation the subject of a Listing.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Listing inspection
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Doors does not inspect any accommodation that is the subject
                  of a Listing.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Content and location accuracy
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Doors does not check, either by itself or through an
                  independent third party, the truth, accuracy or completeness
                  of any Content or the accuracy of any location details
                  available in respect of a Listing including, without
                  limitation, location details provided by use of Google&apos;s
                  Google Maps service. Your use of Google Maps is subject to the{" "}
                  <a
                    href="https://www.google.com/intl/en/help/terms_maps.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 underline">
                    Google Maps Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 underline">
                    Google Privacy Policy
                  </a>
                  .
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold my-7 text-teal-950">
            2. Users of the Website
          </h2>
          <div className="pl-4">
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Doors usage terms
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <header className="my-3 font-semibold">
                    If you use the Website to browse or search Listings seeking
                    accommodation or a prospective tenant to fill vacant
                    accommodation:
                  </header>

                  <ol className="list-decimal list-inside mb-6">
                    <li className="mb-3">
                      You are solely responsible for making your own assessment
                      of the accommodation or user in any Listing or any user
                      who has uploaded the Listing and their suitability for
                      your needs. Doors will not provide any information about
                      any users who have uploaded a Listing and will not assist
                      you in any way in making your assessment by, for example,
                      conducting any background checks that may be appropriate
                      in respect of such users.
                    </li>
                    <li className="mb-3">
                      you should inspect the accommodation that is the subject
                      of any Listing and meet with any prospective tenants or
                      co-tenants who are the subject of any Listing (as
                      applicable) and/or the prospective landlord before making
                      a decision whether or not to apply to rent or sub-rent any
                      such accommodation.
                    </li>
                    <li className="mb-3">
                      you must ensure that any proposed rental agreement between
                      you and another person for accommodation abides by any
                      Local, State or laws relating to the provision or use of
                      rental accommodation, including residential tenancy law,
                      strata by-laws, and local government planning laws.
                    </li>
                  </ol>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Tenant representation
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Doors does not make any representation or provide any warranty
                  in respect of the Content of any Listing, of any user of the
                  Website or any accommodation or users the subject of a Listing
                  including, without limitation, any representation or warranty
                  in respect of the suitability or behavioural characteristics
                  of a user as a landlord, co-tenant or prospective landlord or
                  co-tenant of any accommodation the subject of a Listing or the
                  condition of any such accommodation.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Users background checks
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Doors does not vet, question, or check any person who creates
                  an Account on the Website. Doors does not conduct any identity
                  or personal checks on any person who creates an Account on the
                  Website.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Registeration
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <ol className="list-decimal list-inside mb-6">
                    <li className="mb-3">
                      To publish Content, you must register with Doors by
                      providing certain information to Doors including your
                      name, email address and your mobile telephone number
                      (Account).
                    </li>
                    <li className="mb-3">
                      You represent and warrant that you are the account holder
                      for the mobile telephone number provided to Doors when
                      registering your Account.
                    </li>
                    <li className="mb-3">
                      You must be 18 years or older in order to register an
                      Account and create a Listing on our Website.
                    </li>
                    <li className="mb-3">
                      You represent and warrant that the information you provide
                      to Doors to open an Account is true and correct. If, at
                      any time during the term of your Account, any of that
                      information ceases to be true and correct, you undertake
                      to notify Doors of the change to that information as soon
                      as is reasonably practicable.
                    </li>
                    <li className="mb-3">
                      Any personal information you provide to Doors will be
                      treated in accordance Doors&apos;s{" "}
                      <Link href="/privacy" className="text-teal-500 hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </li>
                  </ol>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Users are responsible for activity on their accounts
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  You are solely responsible for any activity which occurs on
                  your Account.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      User can&apos;t use other users&apos; accounts
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  You may not use another user&apos;s Account, or allow anyone else
                  to use your Account, without Doors&apos;s express prior written
                  permission.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Keep account details safe
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  You must keep your Account details, including your password,
                  Google login details and other other verification details,
                  secure at all time and must immediately notify Doors of any
                  breach, or any suspected breach, of the security of or
                  unauthorised access to your Account.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Account termination
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Doors may, in its absolute discretion, suspend or terminate
                  your Account if: a. you breach or violate any term or
                  condition of these Terms and Conditions of Use; or b. in
                  Doors&apos;s sole opinion, your ongoing use of the Service will
                  bring, or may bring, the reputation of Doors into disrepute or
                  cause Flatmates to be in breach of an applicable law.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
          <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold my-7 text-teal-950">
            3. Website Usage Terms
          </h2>
          <div className="pl-4">
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Use of Doors
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <header className="my-3 font-semibold">
                  You must not, and must not attempt to:

                  </header>

                  <ol className="list-decimal list-inside mb-6">
                    <li className="mb-3">
                     Use the Website for any purpose other than for the purpose of offering to rent accommodation or seeking to rent accommodation.
                    </li>
                    <li className="mb-3">
                      Use the Website or the Services in any way that causes, or is likely to cause the Website or access to it to be interrupted, damaged, rendered less efficient or in a way that impairs the effectiveness or functionality of the Website;
                    </li>
                    <li className="mb-3">
                      Reverse engineer, decompile, disassemble, modify, translate, or otherwise uncover the source code of any software forming part of the Website.
                    </li>
                    <li className="mb-3">
                      Authorise any other person to do any act which would, if that act were to be done by you, infringe any Intellectual Property Rights or us, our licensors or third parties.
                    </li>
                    <li className="mb-3">
                     Hack, infiltrate or otherwise do anything which may compromise the Website.
                    </li>
                    <li className="mb-3">
                     Introduce any computer viruses, macro viruses, trojan horses, worms or anything else designed to interfere with, interrupt or disrupt the normal operating procedures of a computer or to surreptitiously intercept, access without authority or expropriate any system, data or personal information.
                    </li>
                    <li className="mb-3">
                    Prevent or restrict us from complying with any applicable law, industry code or court order.
                    </li>
                    <li className="mb-3">
                    Use the Website or any of the Services for any improper or unlawful purpose, causing a nuisance or causing the operation of any of the Services to be jeopardised or impaired.
                    </li>
                    <li className="mb-3">
                   Use the Website or any of the Services to provide, to aid, abet, procure, counsel or assist another person to provide, or to encourage, solicit or entice the provision of, any services of a sexual nature for monetary or non-monetary consideration.
                    </li>
                    <li className="mb-3">
                   Use the Website or any of the Services to harm, or attempt to harm, persons (including persons under the age of 18 years) in any way.
                    </li>
                    <li className="mb-3">
                   Use the Website or any of the Services to collect, or attempt to collect, personal information about third parties without their knowledge or consent or to engage in screen scraping, database scraping or any other activity with the purpose of obtaining lists of users or other data.
                    </li>
                    <li className="mb-3">
                  Use the Website or any of the Services for any activity which adversely affects the ability of other people or systems to use the Website or any of the Services, or the Internet generally, including the uploading of files that contain viruses, corrupted files, or any other similar software or programs that may damage the operation of another&apos;s computer.
                    </li>
                  </ol>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Service Degradation
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                 Doors will attempt to make the Website and Services available for use 24 hours a day, 7 days a week. However, it will be necessary for Doors to take-down the Website and cease providing the Services for a period of time for regular maintenance and to make improvements and if circumstances beyond Doors&apos;s control exist, such as problems preventing access to internet or webhosting services. In such circumstances Doors will incur no liability to you for such interruption or cessation of Services no matter how such liability would otherwise arise.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Professional consultancy
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                From time to time, Doors will make available on the Website articles and other material setting out information relevant to seeking accommodation or renting accommodation, such as articles relating to tenants&apos; rights as tenants (Informative Content). Any Informative Content on the Website is of a general nature only and does not consider your personal objectives, financial situation or particular needs. You should not regard Informative Content as advice and you should seek professional legal, property, accounting or other advice for your specific circumstances. You should not rely on any Informative Content as the basis for taking any legal action, negotiating or entering any agreement, or incurring any financial liabilities.
                </AccordionPanel>
              </AccordionItem>
          
            </Accordion>
          </div>
        </div>
          <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold my-7 text-teal-950">
            4. Content
          </h2>
          <div className="pl-4">
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Uploading of Content
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                   As part of the Services, the Website allows you to upload Content for viewing by other users of the Website as part of a Listing. Each time you upload Content to the Website, you confirm your acceptance of, and your agreement to be bound by, all the terms and conditions set out in these Terms and Conditions of Use.
                
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Content review
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Doors will not review, vet or approve, and is not responsible for reviewing, vetting or approving, the Content or any part of the Content, or any material appearing in the Content, and it is the sole responsibility of the user uploading the Content to ensure that the Content or any part of the Content, or any material appearing in the Content, complies with these Terms and Conditions of Use.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Rights to the Content
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                     <header className="my-3 font-semibold">
                 At the time you upload Content, you represent and warrant that:
                  </header>
                    <ol className="list-decimal list-inside mb-6">
                    <li className="mb-3">
                     You are the owner of all Content and all Intellectual Property Rights in and to the Content and all material appearing in the Content, or you otherwise have the authorisation, permission or consent of the owner of, or any other relevant person to, the Content or any part of it or any material appearing in the Content.
                    </li>
                    <li className="mb-3">
                      You have the authorisation, permission or consent of each person appearing in the Content for them to appear in the Content and for you to submit that Content, make the Content available on the Website and otherwise grant the rights to Doors you grant under these Terms and Conditions of Use.
                    </li>
                    <li className="mb-3">
                     The Content or any part of it, or any material appearing in the Content, does no infringe the rights, including any Intellectual Property Rights, of any third party.
                    </li>
                    <li className="mb-3">
                      The Content does not contain any material which is offensive, defamatory, discriminatory, pornographic, abusive, obscene, or otherwise illegal in any jurisdiction anywhere in the world.
                    </li>
                 
                  </ol>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      No Endorsement
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                Doors does not endorse any Content or Listing uploaded to the Website by you or any user, or any opinion, recommendation or advice expressed in the Content or Listing.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Consent of Publication
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                 At the time you upload Content, you grant to Doors a non-exclusive, royalty-free, worldwide, irrevocable, perpetual licence to host, cache, store, maintain, use, reproduce, communicate, distribute, display, exhibit, perform, publish, broadcast, transmit, modify, prepare derivative works of, adapt, reformat, translate or otherwise exploit all or any part of the Content on the Website and any other Website which is associated with, connected to, or otherwise operated by Doors including, without limitation, websites owned and/or operated by persons other than Doors.
                </AccordionPanel>
              </AccordionItem>
           
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
1;

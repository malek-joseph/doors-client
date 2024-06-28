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

const Privacy = () => {
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
          Privacy Policies 
        </h1>
        <p className="text-sm md:text-base text-gray-700 mb-8 leading-relaxed">
       Our privacy policy explains how we collect, use, share, and manage your personal information. It covers how we store and secure your info, and how you can check and control it. By using our websites, subscribing to services, or entering agreements with us, you agree to this policy. We update it regularly, so review it periodically to stay informed. Your continued use indicates acceptance of any changes. Visit our Privacy Centre for more details and control options for your account.
        </p>
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/images/privacy.jpeg"
            alt="privacy"
            className="rounded-lg"
            width={800}
            height={400}
            priority={true}
          />
        </div>

        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold my-7 text-teal-950">
           Information we collect, how we use it and how we disclose it
          </h2>
          <div className="pl-4">
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Collecting Your Personal Information
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
            We may need to collect your personal information based on your activities on our websites. For instance, if you request emails from us, we&apos;ll need your email address. Often, you&apos;ll be aware of the information we&apos;re collecting and when we&apos;re collecting it, as you&apos;ll be providing it to us directly.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                    
Collecting Non-Personal Information
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
           We may also gather non-personal information, such as the pages you visit on our websites. This helps us provide a more personalized experience by suggesting properties similar to those you frequently view. We often use cookies or other technologies to collect this information, so you might not always be aware when it&apos;s happening.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                  Purposeful Use and Sharing of Information
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
            We will use or share your information solely for the purpose it was provided, or for something closely related. For instance, if you sign up for a newsletter for first-home buyers, we may also display articles with home-buying tips when you visit our websites.
                </AccordionPanel>
              </AccordionItem>
          
            </Accordion>
          </div>
        </div>
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold my-7 text-teal-950">
            If you browse our sites, or sign up for an account with us


          </h2>
          <div className="pl-4">
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Information we collect
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <header className="my-3 font-semibold">
                   Here are some of the common cases where we collect your personal information: 
                  </header>

                  <ol className="list-decimal list-inside mb-6">
                    <li className="mb-3">
                      You register to use our websites through an account.
                    </li>
                    <li className="mb-3">
                     You log in to use our websites through a social networking site account.
                    </li>
                    <li className="mb-3">
                     You subscribe to receive alerts or emails; fill in forms; create applications, such as a rental application; complete surveys or research; and take part in promotions and competitions on our websites or those of our service providers.
                    </li>
                    <li className="mb-3">
                    You contact us or our service providers for any reason. For instance, you might report a problem with our websites, seek further services or ask for help.
                    </li>
                    <li className="mb-3">
                   You post on or add material to our websites.
                    </li>
                  </ol>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Example of information we collect
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <header className="my-3 font-semibold">
                   What actual information are we talking about? It can include your: 
                  </header>

                  <ol className="list-decimal list-inside mb-6">
                    <li className="mb-3">
                      name
                    </li>
                    <li className="mb-3">
                     address
                    </li>
                    <li className="mb-3">
                    phone number
                    </li>
                    <li className="mb-3">
                    email address
                    </li>
                    <li className="mb-3">
                   gender
                    </li>
                    <li className="mb-3">
                   age
                    </li>
                    <li className="mb-3">
                   occupation
                    </li>
                    <li className="mb-3">
                   personal interests
                    </li>
                    <li className="mb-3">
                   behavioural information, for example, the links you click on
                    </li>
                    <li className="mb-3">
any other information you share with us.                    </li>
                  </ol>
                  <header className="my-3 font-semibold">
           What if you use our services through a social network, or log in here using your social network credentials? We&apos;ll collect information from that social site, such as your:
                  </header>

                  <ol className="list-decimal list-inside mb-6">
                    <li className="mb-3">
                      name
                    </li>
                    <li className="mb-3">
                   site ID
                    </li>
                    <li className="mb-3">
                profile photo
                    </li>
                    <li className="mb-3">
                    email address
                    </li>
                 
                  </ol>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Cookies
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
               We might also use tracking technologies to collect non-personal information about you. Those technologies include cookies, web beacons and measurement software. And they might collect data about your activities on our websites, including IP addresses. Our service providers, and third parties like analytics, advertising or ad-serving partners, can do the same. They might use cookies to collect information about your visits to our websites.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                     How We Use Your Personal Information
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                     <header className="my-3 font-semibold">
           We use the personal information we collect about you to: 
                  </header>

                  <ol className="list-decimal list-inside mb-6">
                    <li className="mb-3">
                      provide the products and services you ask for
                    </li>
                    <li className="mb-3">
                 respond to your enquiries
                    </li>
                    <li className="mb-3">
              create and maintain your account
                    </li>
                    <li className="mb-3">
                    make sure you follow our website terms of use
                    </li>
                    <li className="mb-3">
                    offer you products and services that you might like.
                    </li>
                    <li className="mb-3">
                   improve your security when you visit our websites.
                    </li>
                    <li className="mb-3">
                   present website content in the most effective way for you and your devices.
                    </li>
                    <li className="mb-3">
                 provide you with a better or more relevant service or product. For instance, we might help you save time by pre-filling a form with information you&apos;ve already shared with us.
                    </li>
                    <li className="mb-3">
                   combine with info we&apos;ve collected from service providers, third parties, cookies or web beacons. We do this to give you a more relevant, personalised experience. It raises the quality of our services, and third-party services, too. For example, we might take your behavioural data, collected using cookies, and combine it with information you send to an agent through our enquiry form. This gives the agent a clearer picture of what interests you, so they can serve you better.
                    </li>
                    <li className="mb-3">
                   contact you to conduct research, and ask for feedback on our products, services or websites.
                    </li>
                    <li className="mb-3">
                   verify your identity and remind you of your credentials.
                    </li>
                    <li className="mb-3">
                 improve the quality and functionality of our products and services.
                    </li>
                    <li className="mb-3">
           help meet our obligations arising from any contracts you enter into with us.
                    </li>
                    <li className="mb-3">
                    et you know about changes to our products and services.
                    </li>
                 
                  </ol>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "teal", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      How we keep your data secure?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <ol className="list-decimal list-inside mb-6">
                    <li className="mb-3">
                    We&apos;re committed to keeping your information safe. So, we have dedicated teams focused on securing your information and our systems.
                    </li>
                    <li className="mb-3">
                     We have internal controls to make sure we only collect the smallest amount of personal info we need for any given purpose.
                    </li>
                    <li className="mb-3">
                     We also make sure we delete or de-identify personal info when we no longer need it.
                    </li>
                    <li className="mb-3">
                  We constantly review and update our security measures in line with current technologies. Unfortunately, no data transmission over the internet can be guaranteed to be totally secure.
                    </li>
                   
                  </ol>
                </AccordionPanel>
              </AccordionItem>
          
            </Accordion>
          </div>
      
        </div>
      </div>
    </>
  );
};

export default Privacy;
1;

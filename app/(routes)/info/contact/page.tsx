/** @format */

"use client";
import { useState } from 'react';
import Breadcrumb from "@/app/components/navigation/breadcrumbs/BreadcrumbStandard";
import Image from "next/image";
import NavMenu from "@/app/components/navigation/NavMenu";
import { useSelector } from "react-redux";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import Link from 'next/link';

const Contact = () => {
  const [message, setMessage] = useState('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        toast({
          title: 'Message sent.',
          description: 'Your message has been sent successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setMessage('');
      } else {
        toast({
          title: 'Error.',
          description: 'Failed to send your message.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error.',
        description: 'An error occurred while sending your message.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
          Contact Us 
        </h1>
        <p className="text-sm md:text-base text-gray-700 mb-8 leading-relaxed">
          If you have any question or comment, check our <Link href="/FAQ" className="text-teal-500 hover:underline">FAQ</Link> section. If you can't find an answer to your question there, you can send us a message here:
        </p>
        <form onSubmit={handleSubmit} className="flexCenter flex-col w-1/2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            size="sm"
            mb={4}
             focusBorderColor="teal.600"
          />
          <Button type="submit" colorScheme="teal" className="w-full">Send Message</Button>
        </form>
      </div>
    </>
  );
};

export default Contact;

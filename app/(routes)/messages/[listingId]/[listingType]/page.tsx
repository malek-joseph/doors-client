/** @format */
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Chat from "@/app/components/Chat";
import {
  fetchConversations,
  startConversation,
  deleteConversation,
} from "@/app/services/messageApi";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

interface MessagesProps {
  params: {
    listingId: string;
    listingType: string;
  };
}

const Messages: React.FC<MessagesProps> = ({ params }) => {
  const { listingId, listingType } = params;
  const userDetails = useSelector(selectUserDetails);
  const router = useRouter();

  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any | null>(
    null
  );
  const [creatingNewConversation, setCreatingNewConversation] = useState(false);
  const [isChatView, setIsChatView] = useState(false);
  const initialized = useRef(false);

  const currentUserId = userDetails?.id as string;

  const startNewConversation = useCallback(async () => {
    if (creatingNewConversation || !currentUserId) return;

    setCreatingNewConversation(true);
    try {
      const newConversation = await startConversation(
        currentUserId,
        listingId,
        listingType
      );
      setConversations((prevConversations) => [
        ...prevConversations,
        newConversation,
      ]);
      setSelectedConversation(newConversation);
      setIsChatView(true);
    } catch (error) {
      console.error("Error starting conversation:", error);
    } finally {
      setCreatingNewConversation(false);
    }
  }, [currentUserId, listingId, listingType, creatingNewConversation]);

  useEffect(() => {
    if (!currentUserId) return;
    const fetchAndSetConversations = async () => {
      try {
        const response = await fetchConversations(currentUserId);
        setConversations(response.data);
        initialized.current = true;
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    if (!initialized.current) {
      fetchAndSetConversations();
    }
  }, [currentUserId]);

  useEffect(() => {
    if (initialized.current && !creatingNewConversation) {
      const selectedConv = conversations.find(
        (conv) => conv.listingId === listingId
      );

      if (selectedConv) {
        setSelectedConversation(selectedConv);
        setIsChatView(true);
      } else if (listingId && listingType) {
        startNewConversation();
      } else {
        setSelectedConversation(conversations[0] || null);
        setIsChatView(true);
      }
    }
  }, [
    conversations,
    listingId,
    listingType,
    creatingNewConversation,
    startNewConversation,
  ]);

  const handleDeleteConversation = async () => {
    try {
       const listingId = selectedConversation.listingId
      await deleteConversation(currentUserId, listingId);
       toast.success("Conversation deleted successfully");
      router.push("/messages")
    
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast.error("Error deleting conversation");
    }
  };

  if (!userDetails || !currentUserId) return null;

  console.log(selectedConversation);
  console.log(conversations);

  return (
    <div
      className={`flex flex-col md:flex-row p-4  h-[calc(100vh-180px)] md:h-[calc(100vh-130px)] lg:h-[calc(100vh-130px)] ${
        isChatView ? "mt-16 mb-4" : "mb-4 mt-16"
      }  lg:my-0 md:my-0 `}>
      <div
        className={`w-full md:w-1/3 h-full border border-gray-300 rounded-lg overflow-y-auto my-3 ${
          isChatView ? "hidden md:block" : ""
        }`}>
        {conversations.map((conversation) => (
          <div
            key={conversation._id}
            className={`p-3 cursor-pointer ${
              selectedConversation?._id === conversation._id
                ? "bg-gray-200"
                : ""
            }`}
            onClick={() => {
              setSelectedConversation(conversation);
              setIsChatView(true);
            }}>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full mr-3 bg-gray-300">
                <Image
                  src={
                    conversation.listingOwnerId === userDetails.id
                      ? conversation.currentUserPhoto
                      : conversation.listingOwnerPhoto
                  }
                  alt={
                    conversation.listingOwnerId === userDetails.id
                      ? conversation.currentUserName
                      : conversation.listingOwnerName
                  }
                  className="w-full h-full rounded-full object-cover"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <div>
                  {conversation.listingOwnerId === userDetails.id
                    ? conversation.currentUserName
                    : conversation.listingOwnerName}
                </div>
                <div className="text-xs text-gray-500">
                  {conversation.listingOwnerId !== userDetails.id
                    ? `Offering a place in a ${conversation.accommodationType}`
                    : `Interested in your listing ${conversation.accommodationType}`}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`w-full md:w-2/3 h-full  flex flex-col items-center justify-start md:mt-3 lg:mt-3  ${
          isChatView ? "" : "hidden md:flex "
        }`}>
        {isChatView && (
          <>
            <button
              className="md:hidden mb-2 flex items-center "
              onClick={() => setIsChatView(false)}>
              <FaArrowLeft className="mr-2" /> Back to Conversations
            </button>
            {selectedConversation && (
              <div className="w-full max-w-2xl mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-md    ">
                <Chat
                  currentUserId={currentUserId}
                  listingOwnerId={selectedConversation.listingOwnerId}
                  listingId={selectedConversation.listingId}
                  listingType={selectedConversation.listingType}
                  handleDeleteConversation={handleDeleteConversation}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;

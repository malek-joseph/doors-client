/** @format */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Chat from "@/app/components/Chat";
import { fetchConversations, startConversation } from "@/app/services/messageApi";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";

interface MessagesProps {
  params: {
    listingId: string;
    listingType: string;
  };
}

const Messages: React.FC<MessagesProps> = ({ params }) => {
  const {  listingId, listingType } = params;
  const userDetails = useSelector(selectUserDetails);
  const router = useRouter();

  if (!userDetails) return null;

  const currentUserId = userDetails.id;
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null);
  const [creatingNewConversation, setCreatingNewConversation] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    const fetchAndSetConversations = async () => {
      try {
        const response = await fetchConversations(currentUserId);
        const updatedConversations = response.data.map((conv: any) => {
          if (conv.receiverPhoto) {
            const photoPathWithoutUploads = conv.receiverPhoto.replace(
              /^uploads\//,
              ""
            );
            conv.receiverPhoto = `${process.env.NEXT_PUBLIC_BASE_URL}/${photoPathWithoutUploads}`;
          }
          return conv;
        });
        setConversations(updatedConversations);
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
        (conv) =>
          conv.listingId === listingId 
      );

      if (selectedConv) {
        setSelectedConversation(selectedConv);
      } else if (listingId && listingType) {
        startNewConversation();
      } else {
        setSelectedConversation(conversations[0] || null);
      }
    }
  }, [conversations, listingId, listingType, creatingNewConversation]);

  const startNewConversation = async () => {
    if (creatingNewConversation) return; // Prevent multiple requests

    setCreatingNewConversation(true);
    try {
      const newConversation = await startConversation(
        currentUserId,
        listingId,
        listingType,
     
      );

      if (newConversation.receiverPhoto) {
        const photoPathWithoutUploads = newConversation.receiverPhoto.replace(
          /^uploads\//,
          ""
        );
        newConversation.receiverPhoto = `${process.env.NEXT_PUBLIC_BASE_URL}/${photoPathWithoutUploads}`;
      }

      setConversations((prevConversations) => [
        ...prevConversations,
        newConversation,
      ]);
      setSelectedConversation(newConversation);
    } catch (error) {
      console.error("Error starting conversation:", error);
    } finally {
      setCreatingNewConversation(false);
    }
  };

  console.log("Conversations:", conversations);

  console.log("Selected Conversation:", selectedConversation);

  return (
    <div className="w-screen net_height flex p-4">
      <div className="w-1/3 h-full border border-gray-300 rounded-lg overflow-y-auto my-3">
        {conversations.map((conversation) => (
          <div
            key={conversation._id}
            className={`p-3 cursor-pointer ${
              selectedConversation?._id === conversation._id
                ? "bg-gray-200"
                : ""
            }`}
            onClick={() =>
              router.push(
                `/messages/${conversation.listingOwner._id}/${conversation.listingId}/${conversation.listingType}`
              )
            }>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full mr-3 bg-gray-300">
                {conversation.receiverPhoto ? (
                  <img
                    src={conversation.receiverPhoto}
                    alt={conversation.receiverName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-300"></div>
                )}
              </div>
              <div>
                <div>{conversation.receiverName}</div>
                {conversation.listingType === "place" ? (
                  <div className="text-xs text-gray-500">
                    Offering a place in a {conversation.accommodationType}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">
                    Looking for a place in a {conversation.accommodationType}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-2/3 h-full flex items-center justify-center p-4">
        {selectedConversation && (
          <div className="w-full h-full max-w-2xl mx-auto border border-gray-300 rounded-lg shadow-md">
            <Chat
              currentUserId={currentUserId}
              listingOwnerId={selectedConversation.listingOwner._id}
              listingId={selectedConversation.listingId}
              listingType={selectedConversation.listingType}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
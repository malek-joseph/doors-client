/** @format */
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Chat from "@/app/components/Chat";
import {
  fetchConversations,
  startConversation,
} from "@/app/services/messageApi";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import Image from "next/image";

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
  const initialized = useRef(false);

  const currentUserId = userDetails?.id;

const startNewConversation = useCallback(async () => {
  if (creatingNewConversation) return; // Prevent multiple requests
  if (!currentUserId) return;

  setCreatingNewConversation(true);
  try {
    const newConversation = await startConversation(
      currentUserId,
      listingId,
      listingType
    );

    // if (newConversation.listingOwnerPhoto) {
    //   newConversation.listingOwnerPhoto = formatPhotoURL(
    //     newConversation.listingOwnerPhoto
    //   );
    // }

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
}, [currentUserId, listingId, listingType, creatingNewConversation]);

  useEffect(() => {
    if (!currentUserId) return;
    const fetchAndSetConversations = async () => {
      try {
        const response = await fetchConversations(currentUserId);
        // const updatedConversations = response.data.map((conv: any) => {
        //   if (conv.currentUserPhoto) {
        //     conv.currentUserPhoto = formatPhotoURL(conv.currentUserPhoto);
        //   }
        //   if (conv.listingOwnerPhoto) {
        //     conv.listingOwnerPhoto = formatPhotoURL(conv.listingOwnerPhoto);
        //   }
        //   return conv;
        // });
        // setConversations(updatedConversations);
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
      } else if (listingId && listingType) {
        startNewConversation();
      } else {
        setSelectedConversation(conversations[0] || null);
      }
    }
  }, [
    conversations,
    listingId,
    listingType,
    creatingNewConversation,
    startNewConversation,
  ]);

  // const formatPhotoURL = (photoPath: string) => {
  //   const photoPathWithoutUploads = photoPath.replace(/^uploads\//, "");
  //   return `${process.env.NEXT_PUBLIC_BASE_URL}/${photoPathWithoutUploads}`;
  // };

  if (!userDetails) return;
  if (!currentUserId) return;

  // console.log("Conversations:", conversations);

  // console.log("Selected Conversation:", selectedConversation);

  return (
    <div className="flex flex-col md:flex-row p-4 net_height">
      <div className="w-full md:w-1/3 h-full border border-gray-300 rounded-lg overflow-y-auto my-3 md:my-0">
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
                `/messages/${conversation.listingId}/${conversation.listingType}`
              )
            }>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full mr-3 bg-gray-300">
                {conversation.listingOwnerId === userDetails.id ? (
                  <Image
                    src={conversation.currentUserPhoto}
                    alt={conversation.currentUserName}
                    className="w-full h-full rounded-full object-cover"
                  width={40}
                  height={40}
                  />
                ) : (
                  <Image
                    src={conversation.listingOwnerPhoto}
                    alt={conversation.listingOwnerName}
                    className="w-full h-full rounded-full object-cover"
                     width={40}
                     height={40}
                  />
                )}
              </div>
              <div>
                {conversation.listingOwnerId === userDetails.id ? (
                  <div>{conversation.currentUserName}</div>
                ) : (
                  <div>{conversation.listingOwnerName}</div>
                )}
                {conversation.listingOwnerId !== userDetails.id &&
                  conversation.listingType === "place" && (
                    <div className="text-xs text-gray-500">
                      Offering a place in a {conversation.accommodationType}
                    </div>
                  )}
                {conversation.listingOwnerId === userDetails.id &&
                  conversation.listingType === "place" && (
                    <div className="text-xs text-gray-500">
                      Interested in your listing{" "}
                      {conversation.accommodationType}
                    </div>
                  )}
                {conversation.listingOwnerId !== userDetails.id &&
                  conversation.listingType === "person" && (
                    <div className="text-xs text-gray-500">
                      Looking for a place in a {conversation.accommodationType}
                    </div>
                  )}
                {conversation.listingOwnerId === userDetails.id &&
                  conversation.listingType === "person" && (
                    <div className="text-xs text-gray-500">
                      Interested in your listing{" "}
                      {conversation.accommodationType}
                    </div>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full md:w-2/3 h-full flex items-center justify-center p-4">
        {selectedConversation && (
          <div className="w-full h-full max-w-2xl mx-auto border border-gray-300 rounded-lg shadow-md">
            <Chat
              currentUserId={currentUserId}
              listingOwnerId={selectedConversation.listingOwnerId}
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

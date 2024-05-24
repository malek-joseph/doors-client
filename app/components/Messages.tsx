/** @format */
"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import Chat from "@/app/components/Chat";
import { fetchConversations } from "@/app/services/messageApi";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";

interface MessagesProps {
  params: {
    receiverId: string;
    listingId: string;
    listingType: string;
  };
}

interface Conversation {
  receiverId: string;
  receiverName: string;
  listingId: string;
  listingType: string;
}

const Messages: React.FC<MessagesProps> = ({ params }) => {
  const { receiverId, listingId, listingType } = params;
  const userDetails = useSelector(selectUserDetails);
  const searchParams = useSearchParams();
  const router = useRouter();

  const message = searchParams.get("message") || "";
  if (!userDetails) return null;

  const senderId = userDetails.id;
  const senderPhoto = userDetails.photo;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedReceiverId, setSelectedReceiverId] =
    useState<string>(receiverId);
  const [selectedListingId, setSelectedListingId] = useState<string>(listingId);
  const [selectedListingType, setSelectedListingType] =
    useState<string>(listingType);

  useEffect(() => {
    fetchConversations(senderId)
      .then((response) => setConversations(response.data))
      .catch((error) => console.error(error));
  }, [senderId]);

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedReceiverId(conversation.receiverId);
    setSelectedListingId(conversation.listingId);
    setSelectedListingType(conversation.listingType);
    router.push(
      `/messages/${conversation.receiverId}/${conversation.listingId}/${conversation.listingType}`
    );
  };

  return (
    <div className="w-screen h-screen flex net_height">
      <div className="w-1/3 h-full border-r border-gray-300 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.receiverId}
            className={`p-4 cursor-pointer ${
              selectedReceiverId === conversation.receiverId &&
              selectedListingId === conversation.listingId &&
              selectedListingType === conversation.listingType
                ? "bg-gray-200"
                : ""
            }`}
            onClick={() => handleConversationClick(conversation)}>
            <div className="flex items-center">
              <img
                src={conversation.receiverPhoto}
                alt={conversation.receiverName}
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <div>{conversation.receiverName}</div>
                <div className="text-sm text-gray-500">
                  {conversation.listingType}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-2/3 h-full flex items-center justify-center p-4">
        {selectedReceiverId && selectedListingId && selectedListingType && (
          <div className="w-full h-full max-w-2xl mx-auto border border-gray-300 rounded-lg shadow-md">
            <Chat
              senderId={senderId}
              receiverId={selectedReceiverId}
              listingId={selectedListingId}
              listingType={selectedListingType}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;

/** @format */
import React, { useState, useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../services/messageApi";
import MessageList from "./MessageList";
import Button from "@/app/components/buttons/Button";
import Dropdown from "@/app/components/overlays/Dropdown";
import {
  selectInitialMessage,
  clearInitialMessage,
} from "@/app/redux/features/listing/initialMessageSlice";
import Link from "next/link";
import { AiOutlineSend } from "react-icons/ai";


interface ChatProps {
  currentUserId: string;
  listingOwnerId: string;
  listingId: string;
  listingType: string;
  handleDeleteConversation: () => void
}

interface Message {
  sender: {
    _id: string;
    name: string;
    photo: string;
  };
  receiver: {
    _id: string;
    name: string;
    photo: string;
  };
  content: string;
  timestamp: string;
}

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000"
);

const Chat: React.FC<ChatProps> = ({
  currentUserId,
  listingOwnerId,
  listingId,
  listingType,
  handleDeleteConversation
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const initialMessage = useSelector(selectInitialMessage);
  const dispatch = useDispatch();
  const initialMessageSent = useRef(false);

  const conversationId = listingId
    ? `${listingId}-${listingOwnerId}-${listingType}`
    : `${currentUserId}-${listingOwnerId}`;

  const sendMessage = useCallback(
    (msg: string) => {
      if (msg.trim()) {
        const newMessage = {
          currentUserId,
          listingOwnerId,
          content: msg,
          listingId,
          listingType,
          conversationId,
        };



        socket.emit("sendMessage", newMessage);
      }
    },
    [currentUserId, listingOwnerId, listingId, listingType, conversationId]
  );

  useEffect(() => {
    // Fetch initial messages
    fetchMessages(currentUserId, listingOwnerId, listingId)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => console.error(error));

    // Join room and handle incoming messages
    socket.emit("joinRoom", { conversationId });

    socket.on("receiveMessage", () => {
      fetchMessages(currentUserId, listingOwnerId, listingId)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => console.error(error));
    });

    return () => {
      // Clean up socket event listeners
      socket.off("receiveMessage");
      socket.emit("leaveRoom", { conversationId });
    };
  }, [currentUserId, listingOwnerId, listingId, conversationId]);

  useEffect(() => {
    if (initialMessage && !initialMessageSent.current) {
      sendMessage(initialMessage);
      dispatch(clearInitialMessage());
      initialMessageSent.current = true;
    }
  }, [initialMessage, dispatch, sendMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const deleteConversation = () => {
    handleDeleteConversation();
    setMessages([]);
  };

  const options = [
    {
      label: "Delete Conversation",
      onClick: deleteConversation,
    },
  ];

  console.log(messages)

  return (
    <div className="flex flex-col justify-start h-[calc(100vh-250px)] md:h-[calc(100vh-130px)] lg:h-[calc(100vh-130px)] md:pt-8 lg:pt-8  ">
      <div className="flex justify-between items-center bg-gray-100 px-4 py-2 border-b border-gray-300">
        <Link
          className="text-blue-500 hover:underline w-max"
          href={
            listingType === "place"
              ? `/details/place/${listingId}`
              : `/details/person/${listingId}`
          }>
          View Listing
        </Link>
        <Dropdown options={options} />
      </div>
      <div className="flex-1 px-2 bg-white overflow-y-auto h-full">
        <MessageList messages={messages} currentUserId={currentUserId} />
      </div>
      <div className="flex items-center border-t border-gray-300 p-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 p-2 rounded-md text-sm mr-2"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleEnterPress}
        />
        <Button
          type="button"
          title="Send"
          icon={<AiOutlineSend />}
          variant="bg-teal-500 text-white hover:bg-teal-600 p-2  "
          onClick={handleSend}
        />{" "}
      </div>
    </div>
  );
};

export default Chat;


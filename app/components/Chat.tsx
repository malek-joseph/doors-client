/** @format */

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { fetchMessages } from "../services/messageApi";
import MessageList from "./MessageList";
import Button from "@/app/components/shared/buttons/Button";

interface ChatProps {
  currentUserId: string;
  listingOwnerId: string;
  listingId: string;
  listingType: string;
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
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  
console.log(listingOwnerId)
  const conversationId = listingId
    ? `${listingId}-${listingOwnerId}-${listingType}`
    : `${currentUserId}-${listingOwnerId}`;

  useEffect(() => {
    fetchMessages(currentUserId, listingOwnerId, listingId)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => console.error(error));

    socket.emit("joinRoom", { conversationId });

    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.emit("leaveRoom", { conversationId });
    };
  }, [currentUserId, listingOwnerId, listingId, conversationId]);

  const sendMessage = (msg: string) => {
    if (msg.trim()) {
      const newMessage = {
        currentUserId: currentUserId,
        listingOwnerId: listingOwnerId,
        content: msg,
        listingId: listingId,
        listingType: listingType,
        conversationId: conversationId,
      };

      socket.emit("sendMessage", newMessage);
    }
  };

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

  return (
    <div className="h-full flex flex-col justify-between p-3">
      <MessageList messages={messages} />
      <div className="flex items-center m-3">
        <div className="w-2/3">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full mt-4"
            onKeyDown={handleEnterPress}
          />
        </div>
        <div className="w-1/3 mx-5">
          <Button
            type="button"
            title="Send"
            variant="bg-teal-500 text-white"
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;

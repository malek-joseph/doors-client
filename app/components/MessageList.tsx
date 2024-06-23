/** @format */
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Image from 'next/image'
import { format } from "date-fns";

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

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [imageSrcMap, setImageSrcMap] = useState<Record<string, string>>({});

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

useEffect(() => {
  const imageSrcMapCopy: Record<string, string> = {};
  messages.forEach((message) => {
    if (message.sender && message.sender.photo) {

      imageSrcMapCopy[message.sender._id] =    message.sender.photo

;
    }
  });
  setImageSrcMap(imageSrcMapCopy);
}, [messages]);


  const renderMessageSender = (sender: any) => {
    if (!sender) {
      return "Unknown";
    }

    if (sender._id === currentUserId) {
      return "You";
    } else {
      return sender.name;
    }
  };


  const renderMessageHeader = (message: Message) => {
    const sender = message.sender;
    const imageSrc = imageSrcMap[sender._id] || null;

    return (
      <div className="flex items-center mb-1  ">
        <span className={`font-semibold text-gray-700 ${sender._id === currentUserId ? "hidden" : ""} mr-2`}>
            {renderMessageSender(sender)}
          </span>
        <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
          { imageSrc ? (
            <Image
              src={`${imageSrc}`}
              alt={sender.name}
              className="w-full h-full rounded-full object-cover"
              width={40}
              height={40}
            />
          ) : (
            <div className="w-full h-full bg-gray-300"></div>
          )}
        </div>
          <span className={`font-semibold text-teal-900 ${sender._id === currentUserId ? "" : "hidden"} `}>
            {renderMessageSender(sender)}
          </span>
 
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="py-4">
        {messages.map((msg, index) => (
            <div
          key={index}
          className={`flex flex-col gap-1 mb-4 ${
            msg.sender._id === currentUserId
              ? "items-start"
              : "items-end"
          }`}
        >
            {renderMessageHeader(msg)}
            <div className="bg-gray-100 rounded-lg p-2">
              <p className="text-gray-800">{msg.content}</p>
                  <div className="text-xs text-gray-500">
                {format(new Date(msg.timestamp), "MMM dd, yyyy - HH:mm")}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;

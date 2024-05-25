/** @format */
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";

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
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userDetails = useSelector(selectUserDetails);
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
      // Extract the filename from the photo path
      const photoPathWithoutUploads = message.sender.photo.replace(
        /^uploads\//,
        ""
      );
      // Construct the full URL
      const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${photoPathWithoutUploads}`;
      // Store the full URL in the map
      imageSrcMapCopy[message.sender._id] = fullUrl;
    }
  });
  setImageSrcMap(imageSrcMapCopy);
}, [messages]);


  const renderMessageSender = (sender: any) => {
    if (!sender) {
      return "Unknown";
    }

    if (sender._id === userDetails?.id) {
      return "You";
    } else {
      return sender.name;
    }
  };

  console.log(messages)

  const renderMessageHeader = (message: Message) => {
    const sender = message.sender;
    const imageSrc = imageSrcMap[sender._id] || null;
    console.log(imageSrc)

    return (
      <div className="flex items-center mb-1">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
          { imageSrc ? (
            <img
              src={`${imageSrc}`}
              alt={sender.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300"></div>
          )}
        </div>
        <div>
          <span className="font-semibold text-gray-700">
            {renderMessageSender(sender)}
          </span>
          <span className="ml-2 text-gray-600 text-sm">
            {new Date(message.timestamp).toLocaleString()}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="py-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            {renderMessageHeader(msg)}
            <div className="bg-gray-100 rounded-lg p-2">
              <p className="text-gray-800">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;

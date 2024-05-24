/** @format */

"use client";
import React, {useState, ChangeEvent} from "react";
import CircleImage from "../../shared/CircleImage";
import TextArea from "../../shared/TextArea";
import Button from "../../shared/buttons/Button";
import { useRouter } from "next/navigation";


interface SendMessageCardProps {
  name: string;
  photo: string;
  listingId: string;
  listingType: string;
}

const SendMessageCard: React.FC<SendMessageCardProps> = ({ name, photo, listingId, listingType }) => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };


  const handleSendMessage = () => {

        router.push(
          `/messages/${listingId}/${listingType}`
        );
  
  };
  return (
    <aside className="p-4 rounded-lg bg-gray-100 mb-8 border border-gray-300 flex flex-col items-center w-full md:w-2/3 lg:w-full">
      <div className="flex  items-center mb-4">
          {/* Pass the imageUrl prop to the CircleImage component */}
        {photo && (
          <div>
            <CircleImage imageUrl={photo} alt="profile Img" />
          </div>
        )}
        <p className="text-sm ml-3">
          Hi! I'm {name} you can send me a message here.
        </p>
      </div>
      {/* <div className="my-4">
        <TextArea value={message} onChange={handleMessageChange} />
      </div> */}
      <div className="w-2/3 flex justify-center">
   <Button
        type="button"
        title="Send Message"
        variant="btn_teal"
        onClick={handleSendMessage}
        disabled={false}
      />
      </div>
   
    </aside>
  );
};

export default SendMessageCard;

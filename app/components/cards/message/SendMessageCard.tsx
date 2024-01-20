/** @format */

"use client";
import React, {useState, ChangeEvent} from "react";
import CircleImage from "../../shared/CircleImage";
import TextArea from "../../shared/TextArea";
import Button from "../../shared/buttons/Button";
import personImage from "../../../../public/assets/images/man.jpeg"

interface SendMessageCardProps {
  name: string;
}



const SendMessageCard: React.FC<SendMessageCardProps> = ({name}) => {
   const [message, setMessage] = useState('');

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };
  const imageUrl = personImage.src;

    const handleButtonClick = () => {
      // Implement your logic on button click
      console.log("Button clicked");
    };
  return (
    <aside className="p-4 rounded-lg bg-gray-100 mb-8 border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        {/* Pass the imageUrl prop to the CircleImage component */}
        <CircleImage imageUrl={imageUrl} />
        <p>Message { name}</p>
      </div>
      <div className="my-4">
      <TextArea value={message} onChange={handleMessageChange} />

      </div>
      <Button
        type="button"
        title="Send Message"
        variant="btn_teal"
        onClick={handleButtonClick}
        disabled={false}
      />
    </aside>
  );
};

export default SendMessageCard;

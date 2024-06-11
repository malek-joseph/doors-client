/** @format */

"use client";
import React, {useState, ChangeEvent} from "react";
import CircleImage from "../../CircleImage";
import TextArea from "../../TextArea";
import Button from "../../buttons/Button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDetails } from "@/app/redux/features/auth/authSlice";
import { setInitialMessage } from '@/app/redux/features/listing/initialMessageSlice';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface SendMessageCardProps {
  name: string;
  photo: string;
  listingId?: string;
  listingType: string;
  ownerId: string;
}

const SendMessageCard: React.FC<SendMessageCardProps> = ({ name, photo, listingId, listingType, ownerId }) => {
  const [message, setMessage] = useState("");
  const router = useRouter();
    const dispatch = useDispatch();

    const userDetails = useSelector(selectUserDetails);
   

 if(!ownerId || !userDetails ) return null

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };
// console.log(ownerId)
  //  console.log(userDetails.id)

  const handleSendMessage = () => {
   
if(ownerId !== userDetails.id) {
        dispatch(setInitialMessage(message));

 router.push(
          `/messages/${listingId}/${listingType}`
        );
} else {
      toast.error("You can't send a message to yourself");

}
       
  
  };
  return (
    <aside className="p-4 rounded-lg bg-gray-100 mb-8 border border-gray-300 flex flex-col items-center w-full lg:w-full">
      <div className="flex  items-center mb-4">
          {/* Pass the imageUrl prop to the CircleImage component */}
        {photo && (
          <div>
            <CircleImage imageUrl={photo} alt="profile Img" />
          </div>
        )}
        <p className="text-sm ml-3">
          Hi! I&apos;m {name} you can send me a message here.
        </p>
      </div>
      <div className="my-4 w-full">
        <TextArea value={message} onChange={handleMessageChange} />
      </div>
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

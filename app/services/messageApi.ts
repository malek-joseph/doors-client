/** @format */

// services/messageApi.ts
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const fetchMessages = (
  currentUserId: string,
  listingOwnerId: string,
  listingId: string
) => {
  return axios.get(
    `${API_BASE_URL}/api/messages/${currentUserId}/${listingOwnerId}/${listingId}`
  );
};

export const fetchConversations = (currentUserId: string) => {
  return axios.get(`${API_BASE_URL}/api/conversations/${currentUserId}`);
};

export const startConversation = (
  currentUserId: string,
  listingId: string,
  listingType: string
) => {
  return axios
    .post(`${API_BASE_URL}/api/conversations`, {
      currentUserId,
      listingId,
      listingType,
    })
    .then((response) => response.data);
};

export const deleteConversation = async (
  userId: string,
  listingId: string,
 

 
) => {
  const response = await axios.delete(
  `${API_BASE_URL}/api/conversations/${userId}/${listingId}`
  );
     

 
  return response.data;
};

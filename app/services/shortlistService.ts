/** @format */

// services/shortlistService.ts

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your backend API URL

interface ShortlistItem {
  id: string;
  type: "place" | "person";
  title?: string;
  name?: string;
  city: string;
  monthlyRent: number;
  billsIncluded: boolean;
  governorate: string;
  photos: string[];
}

export const getShortlists = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/shortlists/${userId}`);
  
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch shortlists");
  }
};

export const addShortlist = async (shortlistData: ShortlistItem) => {
  const response = await axios.post(`${API_URL}/api/shortlists`, shortlistData);
  return response.data;
};

export const updateShortlist = async (
  id: string,
  shortlistData: Partial<ShortlistItem>
) => {
  const response = await axios.put(
    `${API_URL}/api/shortlists/${id}`,
    shortlistData
  );
  return response.data;
};

export const deleteShortlist = async (id: string) => {
  await axios.delete(`${API_URL}/api/shortlists/${id}`);
};

// publishProperty.ts

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const publishProperty = async (
  imageFiles: FileList,
  userDetails: any,
  updatedPropertyDetails: any,
  accommodationType: any
) => {
  const formData = new FormData();
  formData.append("userId", userDetails.id);
  formData.append("propertyDetails", JSON.stringify(updatedPropertyDetails));
  formData.append("accommodationType", accommodationType);
  // Convert FileList to array of File objects
  const filesArray: File[] = Array.from(imageFiles);

  // Append photos in the same way as Postman
  filesArray.forEach((file, index) => {
    formData.append(`photos`, file);
  });

  try {
    const createPropertyResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/createProperty`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Handle the response from the createProperty endpoint
    const responseData = createPropertyResponse.data;
    toast.success("Property published successfully");
  } catch (error) {
    toast.error("Error publishing property");
  }
};

export default publishProperty;

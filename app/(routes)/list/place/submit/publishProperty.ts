// publishProperty.ts

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const publishProperty = async (
  imageURLs: string[],
  userDetails: any,
  updatedPropertyDetails: any,
  accommodationType: any
) => {

  try {
    // Prepare data to be sent to the backend
    const data = {
      userId: userDetails.id,
      propertyDetails: updatedPropertyDetails,
      accommodationType: accommodationType,
      photos: imageURLs,
    };

    // Send data to the backend
    const createPropertyResponse = await axios.post(
      "http://localhost:8000/api/properties/createProperty",
      data
    );

    // Handle the response from the createProperty endpoint
    const responseData = createPropertyResponse.data;
    toast.success('Property published successfully');
  } catch (error) {
    toast.error('Error publishing property');
  }
};

export default publishProperty;

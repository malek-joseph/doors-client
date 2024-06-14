// publishPerson.ts

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const publishPerson = async (
  imageFiles: FileList,
  userDetails: any,
  updatedPersonDetails: any,
  accommodationType: any,
  setLoading: any

) => {
  const formData = new FormData();
  formData.append("userId", userDetails.id);
  formData.append("personDetails", JSON.stringify(updatedPersonDetails));
  formData.append("accommodationType", accommodationType);
  // Convert FileList to array of File objects
  const filesArray: File[] = Array.from(imageFiles);

  // Append photos in the same way as Postman
  filesArray.forEach((file, index) => {
    formData.append(`photos`, file);
  });

  try {
    setLoading(true)
    const createPersonResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/persons/createPerson`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Handle the response from the createPerson endpoint
    const responseData = createPersonResponse.data;
    toast.success("Person published successfully");
    setLoading(false)
  } catch (error) {
    toast.error("Error publishing person");
    setLoading(false)
  }
};

export default publishPerson;

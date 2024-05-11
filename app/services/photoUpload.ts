/** @format */

export async function uploadFileToServer(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  // Replace URL with your actual upload endpoint
  const response = await fetch("http://localhost:8000/api/places", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const data = await response.json();
  return data.url; // Assuming the server responds with the URL of the uploaded file
}

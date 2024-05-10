/** @format */

export async function uploadFileToServer(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  // Replace URL with your actual upload endpoint
  const response = await fetch("https://your-upload-endpoint.com/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const data = await response.json();
  return data.url; // Assuming the server responds with the URL of the uploaded file
}

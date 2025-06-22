import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export default async function generateBlog(topic) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/generate-blog`, {
      topic,
    });

    return response.data;
  } catch (error) {
    console.error(
      "AI generation error:",
      error.response?.data || error.message
    );
    throw error;
  }
}

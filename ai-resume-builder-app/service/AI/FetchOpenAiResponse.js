const API_KEY = import.meta.env.VITE_OPENAI_KEY;

// src/openAiService.js
export const fetchOpenAiResponse = async (message) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Replace with your desired model
      messages: message, // Pass the entire conversation history
      max_tokens: 150,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response from OpenAI " + response.status);
  }

  const data = await response.json();
  console.log(data.choices[0].message.content);
};

const makeRequest = async () => {
  let message = {
    role: "user",
    content: "How Are You?",
  };
  try {
    const aiResponse = await fetchOpenAiResponse(message);
    const data = await aiResponse.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

makeRequest();

export default {
  fetchOpenAiResponse,
};

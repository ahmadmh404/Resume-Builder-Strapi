const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const getUserResumes = async (userEmail) => {
  const response = await fetch(
    `http://localhost:1337/api/user-resumes?filters[userEmail][$eq]=` +
      userEmail,
    // Filter The response to be specific about that user with this very email Address.
    // With ?filters[userEmail][$operator] = value
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export default {
  getUserResumes,
};

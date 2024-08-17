const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const createNewResume = async (data) => {
  const response = await fetch(`http://localhost:1337/api/user-resumes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export default {
  createNewResume,
};

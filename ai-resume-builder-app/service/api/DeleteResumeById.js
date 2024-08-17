const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const deleteResumeById = async (id) => {
  const response = await fetch(`http://localhost:1337/api/user-resumes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export default {
  deleteResumeById,
};

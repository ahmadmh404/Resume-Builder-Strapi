const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const updateResumeDetails = async (id, data) => {
  console.log(id);
  const response = await fetch(`http://localhost:1337/api/user-resumes/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export default {
  updateResumeDetails,
};

// in strapi when updating the record you need to pass the id

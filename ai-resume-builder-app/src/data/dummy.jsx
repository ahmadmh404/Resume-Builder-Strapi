/**
 * Provides a dummy data object with information about a person, including their name, job title, contact details, work experience, education, and skills.
 * This data is typically used for testing or demonstration purposes, and should not be used in a production environment.
 */
export default {
  firstName: "James",
  lastName: "Carter",
  jobTitle: "full stack developer",
  address: "525 N tryon Street, NC 28117",
  phone: "(123)-456-7890",
  email: "exmaple@gmail.com",
  themeColor: "#ff6666",
  summery:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  experience: [
    {
      id: 1,
      title: "Full Stack Developer",
      companyName: "Amazon",
      city: "New York",
      state: "NY ",
      startDate: "Jan 2021",
      endDate: "",
      currentlyWorking: true,
      workSummery:
        " Designed, developed, and maintained full-stack applications using React and Node.js.\n" +
        "• Implemented responsive user interfaces with React, ensuring seamless user experiences across\n" +
        "various devices and browsers.\n" +
        "• Maintaining the React Native in-house organization application." +
        "• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end" +
        "and back-end systems.",
    },
  ],
  education: [
    {
      id: 1,
      universityName: "Western Illinois University",
      startDate: "Aug 2018",
      endDate: "Dec:2019",
      degree: "Master",
      major: "Computer Science",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    },
  ],
  skills: [
    {
      id: 1,
      name: "Angular",
      rating: 80,
    },
    {
      id: 1,
      name: "React",
      rating: 100,
    },
    {
      id: 1,
      name: "MySql",
      rating: 80,
    },
    {
      id: 1,
      name: "React Native",
      rating: 100,
    },
  ],
};

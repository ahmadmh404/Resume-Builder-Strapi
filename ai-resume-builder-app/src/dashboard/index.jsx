import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import AddResume from "./components/AddResume";
import GetUserResumes from "../../service/api/GetUserResumes";
import ResumeCard from "./components/ResumeCard";

function DAshboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  // Get User Resumes to show in the dashboard.
  const getResumesList = () => [
    // Pass the current user email address to get his resumes list from strapi.
    GetUserResumes.getUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (response) => {
        setResumeList(response.data);
      }
    ),
  ];

  // I Will Get This Resumes Whenever The user info is loaded or changed.
  useEffect(() => {
    user && getResumesList();
  }, [user]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="text-3xl font-bold">My Resume</h2>
      <p>Start Creating AI resume for your next job</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10">
        <AddResume />
        {resumeList.length > 0
          ? resumeList.map((resume, index) => {
              return (
                <ResumeCard
                  resume={resume}
                  key={index}
                  refreshData={getResumesList}
                />
              );
            })
          : [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[380px] rounded-lg bg-slate-200 animate-pulse mr-5"
              ></div>
            ))}
        ;
      </div>
    </div>
  );
}

export default DAshboard;

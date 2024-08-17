import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ResumeDataContext } from "@/context/ResumeDataContext";
import FormSection from "../../component/FormSection";
import ResumePreview from "../../component/ResumePreview";
import dummy from "@/data/dummy";
import getResumeByID from "../../../../../service/api/getResumeByID";

const EditResume = () => {
  const params = useParams();
  const [resumeData, setResumeData] = useState();
  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    getResumeByID.getResumeById(params?.resumeId).then((resp) => {
      setResumeData(resp.data.attributes);
    });
  };
  return (
    <ResumeDataContext.Provider value={{ resumeData, setResumeData }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-19 gap-19">
        {/* Fill Your Resume Info */}
        <FormSection />
        {/* Preview Your Current Resume */}
        <ResumePreview />
      </div>
    </ResumeDataContext.Provider>
  );
};

export default EditResume;

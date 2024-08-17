import React, { useContext } from "react";

import { ResumeDataContext } from "@/context/ResumeDataContext";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ProfessionalExperiencePreview from "./preview/ProfessionalExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillPreview from "./preview/SkillPreview";

const ResumePreview = () => {
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  return (
    <div
      className="shadow-lg h-full p-10 lg:p-40 border-t-[20px]"
      style={{
        borderColor: resumeData?.themeColor,
      }}
    >
      {/* Personal Details`` */}

      <PersonalDetailPreview resumeData={resumeData} />

      {/* Summary */}

      <SummaryPreview resumeData={resumeData} />

      {/* Professional Experience */}

      <ProfessionalExperiencePreview resumeData={resumeData} />

      {/* Educational */}

      <EducationalPreview resumeData={resumeData} />

      {/* Skills */}
      <SkillPreview resumeData={resumeData} />
    </div>
  );
};

export default ResumePreview;

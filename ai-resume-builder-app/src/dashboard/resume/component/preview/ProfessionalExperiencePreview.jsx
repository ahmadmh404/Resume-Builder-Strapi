import React from "react";

const ProfessionalExperiencePreview = ({ resumeData }) => {
  console.log(resumeData);
  return (
    <div className="my-2">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeData?.themeColor,
        }}
      >
        Professional Experience
      </h2>
      <hr
        className="my-2"
        style={{
          borderColor: resumeData?.themeColor,
        }}
      />

      {resumeData?.experience &&
        resumeData?.experience.map((exp, index) => {
          return (
            <div className="my-5" key={index}>
              <h2
                className="text-sm font-bold"
                style={{
                  color: resumeData?.themeColor,
                }}
              >
                {exp?.title}
              </h2>
              <div className="flex justify-between">
                <h2 className="flex gap-2 font-normal text-xs mb-2">
                  <span className="text-xs font-normal">
                    {exp?.companyName}/
                  </span>
                  <span className="text-xs font-normal">{exp?.city}</span>
                  <span className="text-xs font-normal">{exp?.state}</span>
                </h2>
                <span className="text-xs font-normal">
                  {exp?.startDate}
                  {exp?.currentlyWorking ? "Present" : exp.endDate}
                </span>
              </div>
              <div
                className="text-xs font-normal"
                dangerouslySetInnerHTML={{ __html: exp?.workSummery }}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ProfessionalExperiencePreview;

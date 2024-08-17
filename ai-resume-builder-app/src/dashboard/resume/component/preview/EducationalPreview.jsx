import React from "react";

const EducationalPreview = ({ resumeData }) => {
  return (
    <div className="my-2">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeData?.themeColor,
        }}
      >
        Educational Preview
      </h2>
      <hr
        className="my-2"
        style={{
          borderColor: resumeData?.themeColor,
        }}
      />
      {resumeData?.education &&
        resumeData?.education.map((edu, index) => {
          return (
            <div className="my-3" key={index}>
              <h2
                className="text-sm font-bold "
                style={{
                  color: resumeData?.themeColor,
                }}
              >
                {edu?.universityName}
              </h2>
              <h2 className="flex justify-between items-center text-xs font-semibold">
                {edu?.degree} in {edu?.major}
                <span>
                  {edu?.startDate} - {edu?.endDate}
                </span>
              </h2>
              <p className="text-xs">{edu?.description}</p>
            </div>
          );
        })}
    </div>
  );
};

export default EducationalPreview;

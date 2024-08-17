import React from "react";

const SkillPreview = ({ resumeData }) => {
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
      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeData?.skills.map((skill, index) => {
          return (
            <div className="flex items-center justify-between" key={index}>
              <h2 className="text-sm font-semibold">{skill?.name}</h2>
              <div className="h-2 bg-gray-200 w-[120px]">
                <div
                  className="h-2"
                  style={{
                    backgroundColor: resumeData?.themeColor,
                    width: skill?.rating * 20 + "%",
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillPreview;

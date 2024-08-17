import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const PersonalDetailPreview = ({ resumeData }) => {
  return (
    <div>
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: resumeData?.themeColor,
        }}
      >
        {resumeData?.firstName} {resumeData?.lastName}
      </h2>
      <h2 className="text-center text-sm font-medium">
        {resumeData?.jobTitle}
      </h2>
      <h2
        className="text-center font-normal text-xs"
        style={{
          color: resumeData?.themeColor,
        }}
      >
        {resumeData?.address}
      </h2>
      <div className="flex justify-between mt-3">
        <h2 className="font-normal text-xs">{resumeData?.phone}</h2>

        <h2 className="font-normal text-xs">{resumeData?.email}</h2>
      </div>
      <hr
        className="border-[2.5px]  my-2"
        style={{
          borderColor: resumeData?.themeColor,
        }}
      />
    </div>
  );
};

export default PersonalDetailPreview;

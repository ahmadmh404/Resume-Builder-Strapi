import React from "react";

const SummaryPreview = ({ resumeData }) => {
  return <p className="text-xs font-normal">{resumeData?.summery}</p>;
};

export default SummaryPreview;

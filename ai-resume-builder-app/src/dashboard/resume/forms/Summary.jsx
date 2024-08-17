import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ResumeDataContext } from "@/context/ResumeDataContext";
import { useParams } from "react-router-dom";
import UpdateResumeDetail from "../../../../service/api/UpdateResumeDetail";
import { Brain, Loader2 } from "lucide-react";
import { toast } from "sonner";
import QueryOpenAI from "../../../../service/AI/FetchOpenAiResponse";

const Summery = ({ enableNext }) => {
  const prompt =
    "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

  const { resumeData, setResumeData } = useContext(ResumeDataContext);

  const [summery, setSummery] = useState(resumeData?.summery);

  const [loading, setLoading] = useState(false);

  const params = useParams();

  const [aiSummeryGeneratedList, setAiSummeryGeneratedList] = useState();

  useEffect(() => {
    summery &&
      setResumeData({
        ...resumeData,
        summery: summery,
      });
  }, [summery]);

  function onSave(event) {
    event.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };

    UpdateResumeDetail.updateResumeDetails(params?.resumeId, data).then(
      (response) => {
        enableNext(true);
        toast("Details Updated..");
        setLoading(false);
      }
    ),
      (error) => {
        setLoading(false);
      };
  }

  // const generateSummeryFromAI = async () => {
  //   setLoading(true);
  //   if (resumeData?.jobTitle) {
  //     const PROMPT = prompt.replace("{jobTitle}", resumeData.jobTitle);
  //     const result = await QueryOpenAI.queryOpenAI(PROMPT);
  //     // setAiSummeryGeneratedList(JSON.parse(result.response.text()));
  //     setLoading(false);
  //     console.log(typeof result);
  //   } else {
  //     toast("Please Enter Your Job Title!");
  //     return;
  //   }
  // };

  return (
    <div>
      <div className="p-5 shadow-lg border-primary border-t-4 mt-10 rounded-lg">
        <h2 className="text-lg font-bold"> Summery Details</h2>
        <p>Get Summary to your job title.</p>
        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label className="font-semibold">Add Summary</label>
            <Button
              type="button"
              variant="outline"
              className="border-primary text-primary flex gap-2"
              onClick={() => {
                generateSummeryFromAI();
              }}
            >
              <Brain className="w-4 h-4" />
              Generate From AI
            </Button>
          </div>
          <Textarea
            onChange={(event) => {
              setSummery(event.target.value);
            }}
            className="mt-7"
            required
            defaultValue={resumeData?.summery}
          />
          <div className="flex justify-end mt-4">
            <Button disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-1" /> : "Save"}
            </Button>
          </div>
        </form>
        {aiSummeryGeneratedList && (
          <div>
            <h2 className="font-bold  text-lg">Suggestions</h2>
            {aiSummeryGeneratedList &&
              aiSummeryGeneratedList.map((item, index) => {
                <div key={index}>
                  <h2 className="font-bold my-1">
                    Label: {item.experience_level}
                  </h2>
                  <p>{item.summary}</p>
                </div>;
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Summery;

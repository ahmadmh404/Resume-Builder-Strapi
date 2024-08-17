import React, { useContext, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../component/RichTextEditor";
import { ResumeDataContext } from "@/context/ResumeDataContext";
import UpdateResumeDetail from "../../../../service/api/UpdateResumeDetail";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const experienceDAta = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

const Experience = () => {
  // We Can Have More Than 1 Experience For the User So It'ss An Array Of Objects.

  const { resumeData, setResumeData } = useContext(ResumeDataContext);

  const [experienceList, setExperienceList] = useState([experienceDAta]);

  const [loading, setLoading] = useState(false);

  const params = useParams();

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  console.log(resumeData);

  const addNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
      },
    ]);
  };

  const removeNewExperience = () => {
    if (experienceList && experienceList.length === 1) return;
    setExperienceList([...experienceList].slice(0, -1));
  };

  useEffect(() => {
    resumeData?.experience.length > 0 &&
      setExperienceList(resumeData?.experience);
  }, []);

  const handleTextEditorChange = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeData({
      ...resumeData,
      experience: experienceList,
    });
  }, [experienceList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList,
      },
    };
    UpdateResumeDetail.updateResumeDetails(params?.resumeId, data).then(
      (resp) => {
        if (resp) {
          toast("Details Updated Successfully.");
          setLoading(false);
        }
      },

      // "Some of the provided components in experience are not related to the entity"

      (error) => {
        console.log(`error happened: ${error.response.data}`);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg border-primary border-t-4 mt-10 rounded-lg">
        <h2 className="text-lg font-bold"> Professional Experience </h2>
        <p>Add Your Last Job Experience</p>
        <div>
          {experienceList &&
            experienceList.map((experience, index) => {
              console.log(experience);
              return (
                <div key={index}>
                  <div className="grid grid-cols-2 gap-3 p-3 my-5 rounded-lg">
                    <div>
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor=""
                      >
                        Position Title:
                      </label>
                      <Input
                        defaultValue={experience?.title}
                        className="w-full"
                        type="text"
                        name="title"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor=""
                      >
                        Company Name:
                      </label>
                      <Input
                        defaultValue={experience?.companyName}
                        className="w-full"
                        type="text"
                        name="companyName"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>{" "}
                    <div>
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor=""
                      >
                        City:
                      </label>
                      <Input
                        defaultValue={experience?.city}
                        className="w-full"
                        type="text"
                        name="city"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>{" "}
                    <div>
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor=""
                      >
                        State:
                      </label>
                      <Input
                        defaultValue={experience?.state}
                        className="w-full"
                        type="text"
                        name="state"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>{" "}
                    <div>
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor=""
                      >
                        Start Date:
                      </label>
                      <Input
                        defaultValue={experience?.startDate}
                        className="w-full appearance-none"
                        type="date"
                        name="startDate"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>{" "}
                    <div>
                      <label
                        className="block text-sm font-bold mb-2"
                        htmlFor=""
                      >
                        End Date:
                      </label>
                      <Input
                        defaultValue={experience?.endDate}
                        className="w-full"
                        type="date"
                        name="endDate"
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    <div className="col-span-2">
                      {/* Work Summery */}
                      <RichTextEditor
                        index={index}
                        workSummery={experience?.workSummery}
                        onRichTextEditorChange={(event) =>
                          handleTextEditorChange(event, "workSummery", index)
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex  justify-between">
          <div className="flex gap-2">
            <Button
              onClick={addNewExperience}
              className="text-primary"
              variant="outline"
            >
              + Add More Experience
            </Button>
            <Button
              onClick={removeNewExperience}
              className="text-primary"
              variant="outline"
            >
              - Remove
            </Button>
          </div>
          <Button onClick={onSave}>
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Experience;

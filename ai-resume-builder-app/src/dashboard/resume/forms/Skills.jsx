import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResumeDataContext } from "@/context/ResumeDataContext";
import UpdateResumeDetail from "../../../../service/api/UpdateResumeDetail";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Skills = () => {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  const params = useParams();

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  useEffect(() => {
    resumeData?.skills.length > 0 && setSkillsList(resumeData?.skills);
  }, []);
  const addNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const removeSkills = () => {
    if (skillsList.length === 1) return;
    setSkillsList([...skillsList].slice(0, -1));
  };

  const onSave = () => {
    const data = {
      data: {
        skills: skillsList,
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
        toast(`error happened: ${error.response.data}`);
      }
    );
  };

  useEffect(() => {
    skillsList &&
      setResumeData({
        ...resumeData,
        skills: skillsList,
      });
  }, [skillsList]);

  return (
    <div>
      <div className="p-5 shadow-lg border-primary border-t-4 mt-10 mb-2 rounded-lg">
        <div>
          <h2 className="text-lg font-bold"> Skills </h2>
          <p className="mb-4 text-sm">Add Your Top Professional Key Skills</p>
        </div>
        <div>
          {skillsList.map((item, index) => (
            <div
              className="flex justify-between items-center relative border rounded-lg p-3"
              key={index}
            >
              <div className="mb-3 basis-1/2">
                <label className="font-bold text-sm" htmlFor="name">
                  Name
                </label>
                <Input
                  className="w-full"
                  type="text"
                  placeholder="Enter Skill Name"
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>
              <div>
                <Rating
                  style={{ maxWidth: 250, height: 40 }}
                  value={item.rating}
                  onChange={(v) => handleChange(index, "rating", v)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex gap-2">
            <Button
              onClick={addNewSkills}
              className="text-primary"
              variant="outline"
            >
              + Add More Experience
            </Button>
            <Button
              onClick={removeSkills}
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

export default Skills;

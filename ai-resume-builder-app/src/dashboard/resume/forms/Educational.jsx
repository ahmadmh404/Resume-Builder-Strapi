import React, { useContext, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeDataContext } from "@/context/ResumeDataContext";
import { useParams } from "react-router-dom";
import UpdateResumeDetail from "../../../../service/api/UpdateResumeDetail";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formField = {
  universityName: "",
  startDate: "",
  endDate: "",
  degree: "",
  major: "",
  description: "",
};

const Educational = () => {
  const { resumeData, setResumeData } = useContext(ResumeDataContext);

  const [educationalList, setEducationalList] = useState([]);

  const [loading, setLoading] = useState(false);

  const { resumeId } = useParams();

  useEffect(() => {
    resumeData?.education.length > 0 &&
      setEducationalList(resumeData?.education);
  }, []);

  const handleChange = (e, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const addNewEducational = () => {
    setEducationalList([...educationalList, formField]);
  };
  const removeEducational = () => {
    if (educationalList && educationalList.length === 1) return;
    setEducationalList([...educationalList].slice(0, -1));
  };

  useEffect(() => {
    educationalList &&
      setResumeData({
        ...resumeData,
        education: educationalList,
      });
  }, [educationalList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList,
      },
    };

    UpdateResumeDetail.updateResumeDetails(resumeId, data).then(
      (resp) => {
        setLoading(false);
        toast("details updated successfully.");
      },
      (error) => {
        console.log(`error: ${error.message}`);
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg border-primary border-t-4 mt-10 rounded-lg">
        <h2 className="text-lg font-bold"> Educational </h2>
        <p>Add Your Educational details.</p>
        <div>
          {educationalList.map((item, index) => {
            console.log(item);
            return (
              <div key={index}>
                <div className=" grid grid-cols-2 gap-3 p-3 my-5 rounded-lg">
                  <div>
                    <label className="block text-sm font-bold mb-2" htmlFor="">
                      University Name
                    </label>
                    <Input
                      defaultValue={item?.universityName}
                      name="universityName"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" htmlFor="">
                      Degree
                    </label>
                    <Input
                      defaultValue={item?.degree}
                      name="degree"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold mb-2" htmlFor="">
                      Major
                    </label>
                    <Input
                      defaultValue={item?.major}
                      name="major"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" htmlFor="">
                      Start tDate
                    </label>
                    <Input
                      type="date"
                      defaultValue={item?.startDate}
                      name="statDate"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2" htmlFor="">
                      End tDate
                    </label>
                    <Input
                      type="date"
                      defaultValue={item?.endDate}
                      name="endDate"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-bold mb-2" htmlFor="">
                      Description
                    </label>
                    <Textarea
                      defaultValue={item?.description}
                      name="description"
                      onChange={(e) => handleChange(e, index)}
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
              onClick={addNewEducational}
              className="text-primary"
              variant="outline"
            >
              + Add More Education
            </Button>
            <Button
              onClick={removeEducational}
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

export default Educational;

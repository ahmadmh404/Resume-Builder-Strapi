import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { ResumeDataContext } from "@/context/ResumeDataContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UpdateResumeDetail from "../../../../service/api/UpdateResumeDetail";
import { toast } from "sonner";

const PersonalDetails = ({ enableNext }) => {
  const { resumeData, setResumeData } = useContext(ResumeDataContext);

  const params = useParams();

  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(firstName, lastName, jobTitle, address, phone, email);
  }, []);

  function handleInputChange(event) {
    enableNext(false);
    const { name, value } = event.target;
    setResumeData({
      ...resumeData,
      [name]: value,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function onSave(event) {
    event.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
    };

    UpdateResumeDetail.updateResumeDetails(params?.resumeId, data).then(
      (response) => {
        console.log(response);
        enableNext(true);
        setLoading(false);
        toast("Details Updated..");
      }
    ),
      (error) => {
        setLoading(false);
      };
  }

  return (
    <div className="p-5 shadow-lg border-primary border-t-4 mt-10 rounded-lg">
      <h2 className="text-lg font-bold"> Personal Details</h2>
      <p>Get started with basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5  gap-5">
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="">
              First Name:
            </label>
            <Input
              required
              className="w-full"
              name="firstName"
              onChange={handleInputChange}
              defaultValue={resumeData?.firstName}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="">
              Last Name:
            </label>
            <Input
              required
              className="w-full"
              name="lastName"
              onChange={handleInputChange}
              defaultValue={resumeData?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-bold mb-2 " htmlFor="">
              Job Title
            </label>
            <Input
              required
              className="w-full"
              name="jobTitle"
              onChange={handleInputChange}
              defaultValue={resumeData?.jobTitle}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-bold mb-2 " htmlFor="">
              Address
            </label>
            <Input
              required
              className="w-full"
              name="address"
              onChange={handleInputChange}
              defaultValue={resumeData?.address}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="">
              Phone
            </label>
            <Input
              required
              className="w-full"
              name="phone"
              onChange={handleInputChange}
              defaultValue={resumeData?.phone}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="">
              Email
            </label>
            <Input
              required
              className="w-full"
              name="email"
              onChange={handleInputChange}
              defaultValue={resumeData?.email}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <Button disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import { Loader2Icon } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateNewResume from "../../../service/api/CreateNewResume";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const [resumeTitle, setResumeTitle] = useState("");

  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const navigation = useNavigate();

  const onCreate = () => {
    setLoading(true);
    const resumeId = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: resumeId,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    CreateNewResume.createNewResume(data).then(
      (resp) => {
        if (resp) {
          setLoading(false);
          setOpenDialog(false);
          navigation(`/dashboard/resume/${resp.data.attributes.resumeId}/edit`);
        }
      },
      (error) => {
        setLoading(true);
      }
    );
  };
  return (
    <div className="mr-8 w-[300px]">
      <div
        className="p-20 py-24 border flex items-center justify-center rounded-lg bg-secondary h-[380px] hover:scale-105 transition-all shadow hover:shadow-md cursor-pointer"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <i className="fas fa-plus-square text-4xl text-primary hover:scale-105 transition-all"></i>
      </div>
      <Dialog open={openDialog}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create A New Resume!</DialogTitle>
            <DialogDescription>
              <p>Add title for your new resume!</p>
              <Input
                className="my-4"
                placeholder="Ex. Full Stack Developer.."
                onChange={(e) => [setResumeTitle(e.target.value)]}
              />
            </DialogDescription>

            <div className="flex justify-end gap-5 mt-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setOpenDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2Icon className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;

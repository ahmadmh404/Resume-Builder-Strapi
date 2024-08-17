import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  DotSquare,
  Loader2,
  MoreHorizontal,
  MoreVertical,
  Notebook,
} from "lucide-react";
import DeleteResumeById from "../../../service/api/DeleteResumeById";
import { toast } from "sonner";

const ResumeCard = ({ resume, refreshData }) => {
  const navigation = useNavigate();
  console.log(resume);

  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = (id) => {
    DeleteResumeById.deleteResumeById(resume.id).then(
      (response) => {
        setLoading(true);
        console.log(response);
        toast("Resume Deleted!");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        console.log(error.message);
        setLoading(false);
        setOpenAlert(false);
      }
    );
  };

  return (
    <div>
      <Link
        className="relative text-center h-[380px]"
        to={`/dashboard/resume/${resume?.id}/edit`}
      >
        <div
          className="p-14 flex items-center justify-center rounded-tr-lg rounded-tl-lg bg-secondary  transition-all shadow hover:shadow cursor-pointer ml-10 hover:shadow-primary 
        bg-gradient-to-r from-cyan-200 to-blue-200  h-full"
        >
          <img className="w-[100px]" src="../cv.png" alt="cover-image" />
        </div>
      </Link>
      <div
        className="flex justify-between text-white font-semibold capitalize p-2 ml-[40px] rounded-br-lg rounded-bl-lg"
        style={{
          background: resume?.attributes?.themeColor,
        }}
      >
        <h2>{resume?.attributes?.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="w-7 text-white font-bold cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel
              className="font-semibold"
              onClick={() => navigation(`/dashboard/resume/${resume?.id}/edit`)}
            >
              View
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="font-semibold"
              onClick={() => navigation(`/my-resume/${resume?.id}/view`)}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-semibold"
              onClick={() => navigation()}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-semibold"
              onClick={() => setOpenAlert(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ResumeCard;

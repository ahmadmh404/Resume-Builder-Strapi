import React, { useContext } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { LayoutGridIcon } from "lucide-react";
import { ResumeDataContext } from "@/context/ResumeDataContext";
import { useParams } from "react-router-dom";
import UpdateResumeDetail from "../../../../service/api/UpdateResumeDetail";
import { toast } from "sonner";

const ThemeColor = () => {
  const { resumeData, setResumeData } = useContext(ResumeDataContext);
  const { resumeId } = useParams();

  const selectOnColor = (color) => {
    setResumeData({
      ...resumeData,
      themeColor: color,
    });

    const data = {
      data: {
        ...resumeData,
        themeColor: color,
      },
    };
    console.log(data);
    UpdateResumeDetail.updateResumeDetails(resumeId, data).then((response) => {
      console.log(response);
      toast("Theme Color Updated!");
    });
  };

  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex gap-4">
          <LayoutGridIcon />
          Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="text-lg font-bold mb-3">Select Theme Color:</h2>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((item, index) => {
            return (
              <div
                className={`h-7 w-7 rounded-lg cursor-pointer border hover:border-black `}
                style={{
                  background: item,
                }}
                onClick={() => selectOnColor(item)}
              ></div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;

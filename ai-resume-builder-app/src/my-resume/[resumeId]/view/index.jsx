import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeDataContext } from "@/context/ResumeDataContext";
import ResumePreview from "@/dashboard/resume/component/ResumePreview";
import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getResumeByID from "../../../../service/api/getResumeByID";
import "../../../print.css";
import {
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { X } from "lucide-react";

const ViewResume = () => {
  const [resumeData, setResumeData] = useState();
  const { resumeID } = useParams();
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    getResumeByID.getResumeById(resumeID).then((resp) => {
      setResumeData(resp.data.attributes);
    });
  };

  const handleDownload = () => {
    window.print();
  };

  const shareUrl = `http://localhost:5173/my-resume/${resumeID}/view`;

  return (
    <ResumeDataContext.Provider value={{ resumeData, setResumeData }}>
      <div
        className={`w-full ${
          showShare
            ? "backdrop-blur-xl max-h-screen overflow-y-hidden"
            : "backdrop-blur-0 "
        }`}
      >
        <div className={`print-nothing`}>
          <Header />
          <div className="my-20 m-10 md:mx-20 lg:mx-36 flex flex-col gap-4 items-center">
            <h2 className="text-2xl font-semibold">
              Congrats! Your AI Generated Resume Is Ready!
            </h2>
            <p className="text-slate-800">
              Now You Are Ready To Download Your Resume Or YOu Can Share Unique
              Resume Url With Your friends And Family
            </p>
            <div className="w-full flex justify-between px-44 my-10">
              <Button onClick={handleDownload}>Download</Button>
              <Button
                onClick={() => {
                  setShowShare(true);
                }}
              >
                Share
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full px-20">
            <div id="print-area">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          showShare
            ? "absolute flex translate-y-0 w-full min-h-screen opacity-100 "
            : "translate-y-[-1000p0x] opacity-0"
        } share-box  items-center justify-center left-0 top-0 z-10 bg-black/50 transition-all duration-500 `}
      >
        <div
          className={`relative grid grid-cols-2 gap-4 px-20 py-20 bg-white rounded-lg transition-all duration-500 ${
            showShare ? "translate-y-0" : "translate-y-[1000px]"
          }`}
        >
          <FacebookShareButton url={shareUrl}>
            <Button className="bg-blue-500 text-white text-xl font-semibold flex gap-2">
              Share On Reddit
            </Button>
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title="Flamingos">
            <Button className="bg-purple-500 text-white text-xl font-semibold">
              Share On Reddit
            </Button>
          </TwitterShareButton>

          <WhatsappShareButton url={shareUrl} title="Flamingos">
            <Button className="bg-green-500 text-white text-xl font-semibold">
              Share On Reddit
            </Button>
          </WhatsappShareButton>

          <RedditShareButton url={shareUrl} title="Flamingos">
            <Button className="bg-red-500 text-white text-xl font-semibold">
              Share On Reddit
            </Button>
          </RedditShareButton>
          <button
            type="button"
            className="absolute top-4 right-4 text-4xl"
            onClick={() => {
              setShowShare(false);
            }}
          >
            <X />
          </button>
        </div>
      </div>
    </ResumeDataContext.Provider>
  );
};

export default ViewResume;

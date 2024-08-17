import { Button } from "@/components/ui/button";
import { ResumeDataContext } from "@/context/ResumeDataContext";
import { Brain, Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
// import { AIchatSession } from "../../../../service/api/AIModel";
import { toast } from "sonner";

const RichTextEditor = ({ onRichTextEditorChange, index, workSummery }) => {
  const [value, setValue] = useState(workSummery);

  console.log(value);

  const [loading, setLoading] = useState(false);

  const { resumeData, setResumeData } = useContext(ResumeDataContext);

  const PROMPT =
    "position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array) , give me result in HTML tags";

  const generateSummeryFromSI = async () => {
    setLoading(true);
    if (!resumeData?.experience[index]?.title) {
      toast("Please Provide A Job Title..");
      setLoading(false);
      return;
    }
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeData?.experience?.title
    );
    const result = await AIchatSession.sendMessage(prompt);
    const resp = JSON.parse(result.response.text());
    if (!resp) {
      setLoading(false);
      return;
    }
    setValue(resp.replace("[", "").replace("]", ""));
    setLoading(false);
  };

  useEffect(() => {
    setValue(workSummery);
  }, []);

  useEffect(() => {
    value && setResumeData({ ...resumeData, workSummery: value });
  }, [value]);

  return (
    <div>
      <div className="flex justify-between align-center my-3">
        <label className="text-sm font-bold" htmlFor="">
          Summery
        </label>
        <Button
          onClick={generateSummeryFromSI}
          size="sm"
          variant="outline"
          className="flex gap-2 border-primary text-primary"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Brain className="w-4 h-4 " />
              Generate With AI.
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            onRichTextEditorChange(event);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <BtnNumberedList />
            <BtnBulletList />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;

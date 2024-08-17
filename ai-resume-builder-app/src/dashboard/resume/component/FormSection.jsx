import React, { useState } from "react";
import PersonalDetails from "../forms/PersonalDetails";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  LayoutGrid,
  LayoutGridIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Summery from "../forms/Summary";
import Experience from "../forms/Experience";
import Educational from "../forms/Educational";
import Skills from "../forms/Skills";
import { document } from "postcss";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

const FormSection = () => {
  const [enableNext, setEnableNext] = useState(false);
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const params = useParams();

  return (
    <div className="p-5 px-7 ">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Link to={"/dashboard"}>
            <Button className="flex items-center justify-center font-semibold">
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-3">
          {activeFormIndex > 1 ? (
            <Button>
              <ArrowLeft
                onClick={() => {
                  setActiveFormIndex((prev) => --prev);
                }}
              />
            </Button>
          ) : null}
          <Button
            onClick={() => {
              setActiveFormIndex((prev) => ++prev);
            }}
            className="flex gap-2"
            disabled={!enableNext}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Personal Derails Form */}

      {activeFormIndex === 1 && (
        <PersonalDetails enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Summery */}

      {activeFormIndex === 2 && (
        <Summery enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Experience  */}

      {activeFormIndex === 3 && <Experience />}

      {/* Educational  */}

      {activeFormIndex === 4 && <Educational />}

      {/* Skill */}

      {activeFormIndex === 5 && <Skills />}

      {activeFormIndex === 6 && (
        <Navigate to={`/my-resume/${params?.resumeId}/view`} />
      )}
    </div>
  );
};

export default FormSection;

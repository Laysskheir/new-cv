// src/components/TemplateSelector.tsx

import React from "react";
import { useAtom } from "jotai";
import { resumeTemplateAtom } from "../state/resumeAtoms";
import { templateList } from "../config/templates";
import MiniCard from "./MiniCard";

const TemplateSelector: React.FC = () => {
  const [, setTemplate] = useAtom(resumeTemplateAtom);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {templateList.map(({ key }) => (
        <button
          key={key}
          className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition ease-in-out"
          onClick={() => setTemplate(key)}
        >
          <MiniCard template={key} />
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;

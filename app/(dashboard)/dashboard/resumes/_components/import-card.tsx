import { cn } from "@/lib/utils";
import { DownloadSimple } from "@phosphor-icons/react";
import { BaseCard } from "./base-card";
import { ImportResume } from "../_dialogs/import-resume";

export const ImportResumeCard = () => {
  return (
    <ImportResume>
      <BaseCard>
        <DownloadSimple size={64} weight="thin" />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end space-y-0.5 p-4 pt-12",
            "bg-gradient-to-t from-background/80 to-transparent"
          )}
        >
          <h4 className="font-medium">Import a resume</h4>

          <p className="text-xs opacity-75">Upload an existing resume</p>
        </div>
      </BaseCard>
    </ImportResume>
  );
};

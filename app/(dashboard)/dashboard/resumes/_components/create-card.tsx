
import { cn } from "@/lib/utils";
import { Plus } from "@phosphor-icons/react";
import { BaseCard } from "./base-card";
import { CreateResume } from "../_dialogs/create-resume";

export const CreateResumeCard = () => {
  return (
    <CreateResume>
      <BaseCard>
        <Plus size={64} weight="thin" />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end space-y-0.5 p-4 pt-12",
            "bg-gradient-to-t from-background/80 to-transparent"
          )}
        >
          <h4 className="font-medium">Create a new resume</h4>

          <p className="text-xs opacity-75">Start building from scratch</p>
        </div>
      </BaseCard>
    </CreateResume>
  );
};

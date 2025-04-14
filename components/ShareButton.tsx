import React, { useState } from "react";
import { useAtom } from "@/state/store";
import {
  shareIdAtom,
  resumeStateAtom,
  resumeTemplateAtom,
} from "@/state/resumeAtoms";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

export function ShareButton() {
  const { toast } = useToast();
  const [shareId, setShareId] = useAtom(shareIdAtom);
  const [resumeState] = useAtom(resumeStateAtom);
  const [template] = useAtom(resumeTemplateAtom);
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = async () => {
    setIsLoading(true);
    try {
      // Generate a unique ID (you might want to use a more robust method)
      const newShareId = Math.random().toString(36).substr(2, 9);

      // Store the resume state and template in local storage
      localStorage.setItem(
        `resume_${newShareId}`,
        JSON.stringify({
          resumeState,
          template,
        })
      );

      setShareId(newShareId);
      const shareUrl = `${window.location.origin}/share/${newShareId}`;
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Share URL copied!",
      });
    } catch (error) {
      console.error("Error sharing resume:", error);
      toast({
        title: "Error sharing resume",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleShare} variant="outline" disabled={isLoading}>
      <Share2 className="w-4 h-4 mr-1" />
      Share
    </Button>
  );
}

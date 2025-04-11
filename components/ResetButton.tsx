import React, { useState } from "react";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"

const ResetButton = () => {

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <AlertDialog >
      <AlertDialogTrigger>
        <Button variant="outline">
          <Icons.reset className="w-5 h-5 mr-1" />
          Reset 
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently reset the form
            and remove all your data from the form.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetButton;

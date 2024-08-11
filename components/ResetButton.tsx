import React from "react";
import { Button } from "./ui/button";
import { Icons } from "./icons";

const ResetButton = () => {
  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Button onClick={handleReset} variant="outline">
      <Icons.reset className="w-5 h-5 mr-1" />
      Reset
    </Button>
  );
};

export default ResetButton;

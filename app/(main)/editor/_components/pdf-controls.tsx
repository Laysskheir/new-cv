import { Button } from "@/components/ui/button";
import {
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  ArrowLeft,
  ArrowRight,
  ArrowsIn,
  ArrowsOut,
  Download,
  Printer,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

interface PDFControlsProps {
  currentPage: number;
  totalPages: number;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  onFitToScreen?: () => void;
  onDownload?: () => void;
  onPrint?: () => void;
  onTogglePreview?: () => void;
  isPreviewVisible?: boolean;
}

export const PDFControls = ({
  currentPage,
  totalPages,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onNextPage,
  onPrevPage,
  onFitToScreen,
  onDownload,
  onPrint,
  onTogglePreview,
  isPreviewVisible = true,
}: PDFControlsProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showZoomSlider, setShowZoomSlider] = useState(false);

  // Auto-hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      setIsVisible(true);
      timeout = setTimeout(() => setIsVisible(false), 3000);
    };

    resetTimeout();

    const handleMouseMove = () => resetTimeout();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-background/95 backdrop-blur-sm rounded-lg border shadow-sm px-3 py-2"
          onMouseEnter={() => setIsVisible(true)}
        >
          <TooltipProvider delayDuration={300}>
            {/* Zoom Controls */}
            <div className="flex items-center gap-2 border-r pr-2">
              <Tooltip side="bottom" content="Zoom out">
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8 hover:bg-accent"
                  onClick={onZoomOut}
                  disabled={zoomLevel <= 0.5}
                >
                  <MagnifyingGlassMinus size={16} />
                </Button>
              </Tooltip>

              <div className="relative">
                <Button
                  variant="ghost"
                  className="px-2 h-8 text-sm font-medium min-w-12"
                  onClick={() => setShowZoomSlider(!showZoomSlider)}
                >
                  {Math.round(zoomLevel * 100)}%
                </Button>

                {showZoomSlider && (
                  <div className="absolute top-full left-0 mt-1 w-32 bg-background border rounded-md shadow-md p-2">
                    <Slider
                      value={[zoomLevel]}
                      min={0.5}
                      max={2}
                      step={0.1}
                      onValueChange={(value) => {
                        const newZoom = value[0];
                        if (newZoom > zoomLevel) onZoomIn();
                        else if (newZoom < zoomLevel) onZoomOut();
                      }}
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              <Tooltip side="bottom" content="Zoom in">
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8 hover:bg-accent"
                  onClick={onZoomIn}
                  disabled={zoomLevel >= 2}
                >
                  <MagnifyingGlassPlus size={16} />
                </Button>
              </Tooltip>

              {onFitToScreen && (
                <Tooltip side="bottom" content="Fit to screen">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-accent"
                    onClick={onFitToScreen}
                  >
                    <ArrowsIn size={16} />
                  </Button>
                </Tooltip>
              )}
            </div>

            {/* Page Navigation */}
            <div className="flex items-center gap-2 border-r pr-2">
              <Tooltip side="bottom" content="Previous page">
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8 hover:bg-accent"
                  onClick={onPrevPage}
                  disabled={currentPage <= 1}
                >
                  <ArrowLeft size={16} />
                </Button>
              </Tooltip>

              <span className="text-sm font-medium min-w-16 text-center">
                {currentPage} / {totalPages}
              </span>

              <Tooltip side="bottom" content="Next page">
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8 hover:bg-accent"
                  onClick={onNextPage}
                  disabled={currentPage >= totalPages}
                >
                  <ArrowRight size={16} />
                </Button>
              </Tooltip>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {onTogglePreview && (
                <Tooltip
                  side="bottom"
                  content={isPreviewVisible ? "Hide preview" : "Show preview"}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-accent"
                    onClick={onTogglePreview}
                  >
                    {isPreviewVisible ? (
                      <EyeSlash size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </Button>
                </Tooltip>
              )}

              {onDownload && (
                <Tooltip side="bottom" content="Download PDF">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-accent"
                    onClick={onDownload}
                  >
                    <Download size={16} />
                  </Button>
                </Tooltip>
              )}

              {onPrint && (
                <Tooltip side="bottom" content="Print resume">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-accent"
                    onClick={onPrint}
                  >
                    <Printer size={16} />
                  </Button>
                </Tooltip>
              )}
            </div>
          </TooltipProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useAtom } from "@/state/store";
import { resumeStateAtom, resumeTemplateAtom } from "../state/resumeAtoms";
import ResumeTemplate from "./ResumeTemplate";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Tooltip, TooltipProvider } from "./ui/tooltip";
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
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { pdfGenerator } from "@/lib/pdf-generator";

export const Mockup: React.FC = () => {
  const [resumeData] = useAtom(resumeStateAtom);
  const [selectedTemplate] = useAtom(resumeTemplateAtom);
  const resumeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(0.8);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showPagePreview, setShowPagePreview] = useState(false);

  // Motion values for drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Calculate page count based on resume height
  useEffect(() => {
    if (resumeRef.current) {
      const resumeHeight = resumeRef.current.scrollHeight;
      const pageHeight = 29.7 * 37.8; // A4 height in pixels (29.7cm)
      const calculatedPageCount = Math.ceil(resumeHeight / pageHeight);
      setPageCount(calculatedPageCount);
    }
  }, [resumeData, selectedTemplate]);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [resumeData, selectedTemplate]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts if not in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "+":
        case "=":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleZoomIn();
          }
          break;
        case "-":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleZoomOut();
          }
          break;
        case "0":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleFitToScreen();
          }
          break;
        case "ArrowRight":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleNextPage();
          }
          break;
        case "ArrowLeft":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handlePrevPage();
          }
          break;
        case "c":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleCenter();
          }
          break;
        case "h":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setShowControls((prev) => !prev);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  }, []);

  const handleZoomChange = useCallback((value: number[]) => {
    setZoomLevel(value[0]);
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount));
  }, [pageCount]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleCenter = useCallback(() => {
    // Animate back to center with spring effect
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleFitToScreen = useCallback(() => {
    if (containerRef.current && resumeRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const resumeWidth = 21 * 37.8; // 21cm in pixels (approximate)
      const resumeHeight = 29.7 * 37.8; // 29.7cm in pixels (approximate)

      const scaleX = (containerWidth - 40) / resumeWidth;
      const scaleY = (containerHeight - 40) / resumeHeight;

      const newZoom = Math.min(scaleX, scaleY, 1);
      setZoomLevel(newZoom);
      handleCenter();
    }
  }, [handleCenter]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);
  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const element = document.getElementById('resume-content');
      if (!element) {
        throw new Error("Resume element not found");
      }

      await pdfGenerator.generatePDF(element, {
        filename: "resume.pdf",
        scale: 2
      });

      toast({
        title: "Success",
        description: "Resume downloaded successfully",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to download resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate page positions for preview
  const pagePositions = useMemo(() => {
    if (!resumeRef.current) return [];

    const positions = [];
    const pageHeight = 1056; // Approximate height of an A4 page in pixels
    const totalHeight = resumeRef.current.scrollHeight;

    for (let i = 0; i < pageCount; i++) {
      const position = i * pageHeight;
      positions.push({
        page: i + 1,
        position,
        isVisible:
          position >= y.get() && position <= y.get() + window.innerHeight,
      });
    }

    return positions;
  }, [pageCount, y]);

  return (
    <Card className="relative w-full rounded-none">
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-background/80 z-50"
          >
            <div className="flex flex-col items-center gap-2">
              <Loader className="animate-spin w-5 h-5" />
              <p className="text-sm text-muted-foreground">Loading resume...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-background/95 backdrop-blur-sm rounded-full border shadow-lg px-4 py-2"
          >
            <TooltipProvider>
              <div className="flex items-center gap-2 border-r pr-2">
                <Tooltip content="Zoom out (Ctrl -)">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-accent rounded-full"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.5}
                  >
                    <MagnifyingGlassMinus size={16} />
                  </Button>
                </Tooltip>

                <Slider
                  value={[zoomLevel]}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onValueChange={handleZoomChange}
                  className="w-24"
                />

                <Tooltip content="Zoom in (Ctrl +)">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-accent rounded-full"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 2}
                  >
                    <MagnifyingGlassPlus size={16} />
                  </Button>
                </Tooltip>
              </div>

              <div className="flex items-center gap-2 border-r pr-2">
                <Tooltip content="Previous page (Ctrl ←)">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-accent rounded-full"
                    onClick={handlePrevPage}
                    disabled={currentPage <= 1}
                  >
                    <ArrowLeft size={16} />
                  </Button>
                </Tooltip>

                <Tooltip content="Page navigation">
                  <Button
                    variant="ghost"
                    className="px-2 hover:bg-accent rounded-full"
                    onClick={() => setShowPagePreview(!showPagePreview)}
                  >
                    <span className="text-sm font-medium min-w-16 text-center">
                      {currentPage} / {pageCount}
                    </span>
                  </Button>
                </Tooltip>

                <Tooltip content="Next page (Ctrl →)">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-accent rounded-full"
                    onClick={handleNextPage}
                    disabled={currentPage >= pageCount}
                  >
                    <ArrowRight size={16} />
                  </Button>
                </Tooltip>
              </div>

              <div className="flex items-center gap-2 border-r pr-2">
                <Tooltip content="Center resume (Ctrl C)">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-accent rounded-full"
                    onClick={handleCenter}
                    title="Center Resume"
                  >
                    <ArrowsIn size={16} />
                  </Button>
                </Tooltip>

                <Tooltip content="Fit to screen (Ctrl 0)">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-accent rounded-full"
                    onClick={handleFitToScreen}
                    title="Fit to Screen"
                  >
                    <ArrowsOut size={16} />
                  </Button>
                </Tooltip>
              </div>

              <div className="flex items-center gap-2">
                <Tooltip content="Print resume">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-accent rounded-full"
                    onClick={handlePrint}
                  >
                    <Printer size={16} />
                  </Button>
                </Tooltip>

                <Tooltip content="Download PDF">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-accent rounded-full"
                    onClick={handleDownload}
                  >
                    <Download size={16} />
                  </Button>
                </Tooltip>

                <Tooltip content="Hide controls (Ctrl H)">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8 hover:bg-accent rounded-full"
                    onClick={() => setShowControls(false)}
                  >
                    <EyeSlash size={16} />
                  </Button>
                </Tooltip>
              </div>
            </TooltipProvider>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show controls button when hidden */}
      <AnimatePresence>
        {!showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <TooltipProvider>
              <Tooltip content="Show controls (Ctrl H)">
                <Button
                  size="icon"
                  variant="secondary"
                  className="size-10 rounded-full shadow-lg"
                  onClick={() => setShowControls(true)}
                >
                  <Eye size={20} />
                </Button>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page preview */}
      <AnimatePresence>
        {showPagePreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-background/95 backdrop-blur-sm rounded-lg border shadow-sm p-2"
          >
            <div className="flex gap-1">
              {pagePositions.map((page) => (
                <button
                  key={page.page}
                  onClick={() => setCurrentPage(page.page)}
                  className={cn(
                    "w-8 h-10 flex items-center justify-center text-xs rounded border transition-colors",
                    currentPage === page.page
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-accent"
                  )}
                >
                  {page.page}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={containerRef}
        className="overflow-hidden h-[326px] md:h-[620px] bg-card"
      >
        <ScrollArea className="h-full w-full flex items-center justify-center p-1">
          <div className="relative min-h-full flex items-center justify-center">
            <motion.div
              id="resume-content"
              ref={resumeRef}
              style={{
                scale: zoomLevel,
                x,
                y,
                transformOrigin: "center center",
              }}
              drag
              dragMomentum={false}
              dragElastic={0.1}
              animate={{ scale: zoomLevel }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "w-[21cm] bg-white rounded-lg overflow-hidden cursor-grab active:cursor-grabbing",
                "transition-shadow duration-200",
                "shadow-xl"
              )}
            >
              {/* Use the selected template instead of always using Dynamic */}
              <ResumeTemplate template={selectedTemplate} data={resumeData} />
            </motion.div>
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};

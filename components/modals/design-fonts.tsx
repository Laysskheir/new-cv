import React from "react";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MinusIcon, PlusIcon } from "lucide-react";
import {
  fontSizeAtom,
  pageMarginsAtom,
  sectionSpacingAtom,
  fontFamilyAtom,
} from "@/state/resumeAtoms";
import { Icons } from "../icons";

const FONT_OPTIONS = [
  "Arial", "Times New Roman", "Calibri", "Garamond",
  "Georgia", "Palatino",
];

interface DesignFontsProps {
  children: React.ReactNode;
}

export function DesignFonts({ children }: DesignFontsProps) {
  const [pageMargins, setPageMargins] = useAtom(pageMarginsAtom);
  const [sectionSpacing, setSectionSpacing] = useAtom(sectionSpacingAtom);
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);
  const [fontFamily, setFontFamily] = useAtom(fontFamilyAtom);

  function adjustValue(setter: (value: number) => void, currentValue: number, delta: number, min: number, max: number) {
    setter(Math.min(Math.max(currentValue + delta, min), max));
  }

  function renderSliderWithButtons(label: string, value: number, setter: (value: number) => void, min: number, max: number, step: number) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">{label}</Label>
          <span className="text-sm font-semibold">{value}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustValue(setter, value, -step, min, max)}
            className="rounded-full w-7 h-7 p-2"
          >
            <MinusIcon className="w-4 h-4" />
          </Button>
          <Slider
            value={[value]}
            max={max}
            min={min}
            step={step}
            className="flex-grow"
            onValueChange={(newValue) => setter(newValue[0])}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustValue(setter, value, step, min, max)}
            className="rounded-full w-7 h-7 p-2"
          >
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Icons.font className="w-4 h-4" />
          <span>{children}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-center mb-6">
            Design & Font
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Layout</h3>
            {renderSliderWithButtons("Page Margins", pageMargins, setPageMargins, 1, 5, 1)}
            {renderSliderWithButtons("Section Spacing", sectionSpacing, setSectionSpacing, 1, 5, 1)}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Typography</h3>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Font Style</Label>
              <Select value={fontFamily || "Rubik"} onValueChange={setFontFamily}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FONT_OPTIONS.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {renderSliderWithButtons("Font Size", fontSize, setFontSize, 12, 24, 1)}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DownloadButton from "../download-button";
import { useAtom } from "jotai";
import { downloadFormatAtom } from "@/state/resumeAtoms";

export function FormatDownloadPopper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [downloadFormat, setDownloadFormat] = useAtom(downloadFormatAtom);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon">{children}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="space-y-4">
          <h4 className="font-medium">Choose Download Format</h4>
          <RadioGroup value={downloadFormat} onValueChange={(value: "pdf" | "docx" | "txt") => setDownloadFormat(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pdf" id="pdf" />
              <Label htmlFor="pdf">PDF</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="docx" id="docx" />
              <Label htmlFor="docx">DOCX</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="txt" id="txt" />
              <Label htmlFor="txt">TXT</Label>
            </div>
          </RadioGroup>
          <DownloadButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}
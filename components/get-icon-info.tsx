import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

export default function GetIconInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" id="al" aria-label="icons">
          <Info className="size-4 text-muted-foreground hover:text-accent-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Get icon key</DialogTitle>
          <DialogDescription>
            Find the icon that best matches your link and copy the icon key,
            which looks like this:
            <code className="rounded-md border bg-background px-1 py-0.5">
              ic:sharp-cloud-queue
            </code>
            .
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

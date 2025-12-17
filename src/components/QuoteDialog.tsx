import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TallyEmbed from "./TallyEmbed";

interface QuoteDialogProps {
  children?: React.ReactNode; // Allow custom button text/styles
}

const QuoteDialog = ({ children }: QuoteDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-gradient-accent hover:opacity-90">
            Get Free Quote
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request a Free Quote</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {/* Quote Form ID: 0Qd4p9 */}
          <TallyEmbed formId="0Qd4p9" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;

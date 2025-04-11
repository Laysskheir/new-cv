import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Questions() {
  return (
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col max-w-7xl pb-16">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col mb-8 p-4"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          More questions?
        </h1>
        <p className="text-lg text-muted-foreground">We&apos;ve got answers.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem
            value="item-1"
            className="border rounded-lg overflow-hidden bg-background/50 hover:bg-background/80 transition-colors duration-300"
          >
            <div className="px-4 py-3">
              <AccordionTrigger className="text-base font-medium hover:no-underline">
                Is this resume builder really free?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 text-sm">
                Yes, our resume builder is completely free to use. We believe in
                providing equal opportunities for all job seekers, regardless of
                their financial situation.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border rounded-lg overflow-hidden bg-background/50 hover:bg-background/80 transition-colors duration-300"
          >
            <div className="px-4 py-3">
              <AccordionTrigger className="text-base font-medium hover:no-underline">
                Can I customize the resume templates?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 text-sm">
                Absolutely. Our templates are highly customizable, allowing you
                to adjust styles, layouts, and content to fit your unique
                professional profile and needs.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border rounded-lg overflow-hidden bg-background/50 hover:bg-background/80 transition-colors duration-300"
          >
            <div className="px-4 py-3">
              <AccordionTrigger className="text-base font-medium hover:no-underline">
                Are the resume templates professional and up-to-date?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 text-sm">
                Yes, we continuously update our templates to ensure they meet
                current industry standards and trends in resume design and
                content.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="border rounded-lg overflow-hidden bg-background/50 hover:bg-background/80 transition-colors duration-300"
          >
            <div className="px-4 py-3">
              <AccordionTrigger className="text-base font-medium hover:no-underline">
                Is there guidance on creating an effective resume?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 text-sm">
                Yes, we offer comprehensive tips and guidance throughout the
                resume creation process to help you craft a compelling and
                professional CV.
              </AccordionContent>
            </div>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="border rounded-lg overflow-hidden bg-background/50 hover:bg-background/80 transition-colors duration-300"
          >
            <div className="px-4 py-3">
              <AccordionTrigger className="text-base font-medium hover:no-underline">
                Can I download my resume in different formats?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 text-sm">
                Yes, you can download your completed resume in various formats,
                including PDF and Word, to suit different application
                requirements.
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </div>
  );
}

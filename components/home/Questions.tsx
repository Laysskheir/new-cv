import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Questions() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8  flex flex-col max-w-7xl pb-16">
      <div className="flex flex-col text-4xl font-semibold mb-8 p-4">
        <h1>More questions?</h1>
        <p className="text-muted-foreground">We&apos;ve got answers.</p>
      </div>

      <Accordion type="single" collapsible className="space-y-2 ">
        <AccordionItem value="item-1">
          <div className="px-4">
            <AccordionTrigger>Is this resume builder really free?</AccordionTrigger>
            <AccordionContent>
              Yes, our resume builder is completely free to use. We believe in providing equal opportunities for all job seekers, regardless of their financial situation.
            </AccordionContent>
          </div>
        </AccordionItem>

        <AccordionItem value="item-2">
          <div className="px-4">
            <AccordionTrigger>Can I customize the resume templates?</AccordionTrigger>
            <AccordionContent>
              Absolutely. Our templates are highly customizable, allowing you to adjust styles, layouts, and content to fit your unique professional profile and needs.
            </AccordionContent>
          </div>
        </AccordionItem>

        <AccordionItem value="item-3">
          <div className="px-4">
            <AccordionTrigger>
              Are the resume templates professional and up-to-date?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we continuously update our templates to ensure they meet current industry standards and trends in resume design and content.
            </AccordionContent>
          </div>
        </AccordionItem>

        <AccordionItem value="item-4">
          <div className="px-4">
            <AccordionTrigger>Is there guidance on creating an effective resume?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer comprehensive tips and guidance throughout the resume creation process to help you craft a compelling and professional CV.
            </AccordionContent>
          </div>
        </AccordionItem>

        <AccordionItem value="item-5">
          <div className="px-4">
            <AccordionTrigger>Can I download my resume in different formats?</AccordionTrigger>
            <AccordionContent>
              Yes, you can download your completed resume in various formats, including PDF and Word, to suit different application requirements.
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
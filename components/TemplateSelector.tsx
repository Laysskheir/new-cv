// src/components/TemplateSelector.tsx

import React from "react";
import { useAtom } from "@/state/store";
import { resumeTemplateAtom } from "../state/resumeAtoms";
import { templateList } from "../config/templates";
import MiniCard from "./MiniCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";

const TemplateSelector: React.FC = () => {
  const [selectedTemplate, setTemplate] = useAtom(resumeTemplateAtom);
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  // Group templates by category
  const templatesByCategory = React.useMemo(() => {
    const grouped = templateList.reduce((acc, template) => {
      const category = template.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(template);
      return acc;
    }, {} as Record<string, typeof templateList>);

    return grouped;
  }, []);

  // Get all unique categories
  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(templateList.map((t) => t.category))
    );
    return ["all", ...uniqueCategories];
  }, []);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Choose a Template</h2>
        <p className="text-muted-foreground">
          Select a professional template for your resume
        </p>
      </div>

      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={setActiveCategory}
      >
        <TabsList className="mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(category === "all"
                ? templateList
                : templatesByCategory[category] || []
              ).map(({ key, name, description }) => (
                <Card
                  key={key}
                  className={cn(
                    "transition-all duration-200 hover:shadow-lg cursor-pointer group",
                    selectedTemplate === key && "ring-2 ring-primary"
                  )}
                  onClick={() => setTemplate(key)}
                >
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{name}</CardTitle>
                      {selectedTemplate === key && (
                        <Badge variant="default" className="ml-2">
                          Selected
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="aspect-[3/4] relative rounded-md overflow-hidden">
                      <MiniCard
                        template={key}
                        showPreview={true}
                        className="group-hover:shadow-md transition-all duration-300"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <button
                      className="w-full py-2 text-sm font-medium text-primary hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTemplate(key);
                      }}
                    >
                      Use this template
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TemplateSelector;

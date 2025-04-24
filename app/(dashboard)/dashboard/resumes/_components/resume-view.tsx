"use client";

import { useState } from "react";
import { GridView } from "./grid";
import { ListView } from "./list";
import { ViewToggle } from "./view-toggle";

export function ResumeView({ initialResumes }: { initialResumes: any[] }) {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [resumes, setResumes] = useState(initialResumes);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Resumes</h1>
                <ViewToggle view={view} onChange={setView} />
            </div>

            {view === "grid" ? (
                <GridView resumes={resumes} />
            ) : (
                <ListView resumes={resumes} />
            )}
        </div>
    );
}


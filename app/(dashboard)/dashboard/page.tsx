// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   FileText,
//   Plus,
//   Settings,
//   Star,
//   Download,
//   Edit,
//   Trash2,
// } from "lucide-react";
// import Link from "next/link";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { getServerSession } from "@/lib/auth";
// import { getAllResumes } from "@/actions/resume/getAllResumes";
// import { formatDistanceToNow } from "date-fns";

import ResumesPage from "./resumes/page";

// export default async function DashboardPage() {
//   const session = await getServerSession();

//   if (!session || !session.user?.id) {
//     return <div>Please log in to view your dashboard.</div>;
//   }

//   const { success, resumes, error } = await getAllResumes(session.user.id);

//   if (!success) {
//     return <div>Error fetching data: {error}</div>;
//   }

//   return (
//     <div className="space-y-6 p-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">
//             Welcome back, {session.user.name?.split(" ")[0] || "User"}
//           </h1>
//           <p className="text-muted-foreground">
//             Manage and create your professional resumes
//           </p>
//         </div>
//         <Button asChild>
//           <Link href="/dashboard/resumes/new">
//             <Plus className="mr-2 h-4 w-4" />
//             Create New CV
//           </Link>
//         </Button>
//       </div>

//       {resumes && resumes.length > 0 ? (
//         <div className="grid gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Your Resumes</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 {resumes.map((resume) => (
//                   <div
//                     key={resume.id}
//                     className="flex flex-col rounded-lg border p-4 hover:border-primary/50 transition-colors"
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="space-y-1">
//                         <h3 className="font-medium">{resume.title}</h3>
//                         <p className="text-sm text-muted-foreground">
//                           Last updated{" "}
//                           {formatDistanceToNow(new Date(resume.updatedAt), {
//                             addSuffix: true,
//                           })}
//                         </p>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button variant="ghost" size="icon" asChild>
//                           <Link href={`/dashboard/resumes/${resume.id}`}>
//                             <Edit className="h-4 w-4" />
//                           </Link>
//                         </Button>
//                         <Button variant="ghost" size="icon" asChild>
//                           <Link
//                             href={`/dashboard/resumes/${resume.id}/download`}
//                           >
//                             <Download className="h-4 w-4" />
//                           </Link>
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="text-destructive hover:text-destructive"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                     <div className="mt-4 flex gap-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="w-full"
//                         asChild
//                       >
//                         <Link href={`/dashboard/resumes/${resume.id}`}>
//                           Edit CV
//                         </Link>
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="w-full"
//                         asChild
//                       >
//                         <Link href={`/dashboard/resumes/${resume.id}/preview`}>
//                           Preview
//                         </Link>
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           <div className="grid gap-4 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid gap-2">
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start"
//                     asChild
//                   >
//                     <Link href="/dashboard/resumes/new">
//                       <Plus className="mr-2 h-4 w-4" />
//                       Create New CV
//                     </Link>
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start"
//                     asChild
//                   >
//                     <Link href="/dashboard/settings">
//                       <Settings className="mr-2 h-4 w-4" />
//                       Customize Templates
//                     </Link>
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Recent Activity</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {resumes.slice(0, 3).map((resume) => (
//                     <div key={resume.id} className="flex items-center gap-4">
//                       <div className="rounded-full bg-primary/10 p-2">
//                         <FileText className="h-4 w-4 text-primary" />
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium">{resume.title}</p>
//                         <p className="text-xs text-muted-foreground">
//                           Updated{" "}
//                           {formatDistanceToNow(new Date(resume.updatedAt), {
//                             addSuffix: true,
//                           })}
//                         </p>
//                       </div>
//                       <Button variant="ghost" size="sm" asChild>
//                         <Link href={`/dashboard/resumes/${resume.id}`}>
//                           View
//                         </Link>
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       ) : (
//         <Card className="text-center">
//           <CardContent className="pt-6">
//             <div className="mx-auto w-fit rounded-full bg-primary/10 p-3">
//               <FileText className="h-6 w-6 text-primary" />
//             </div>
//             <h3 className="mt-4 text-lg font-medium">No Resumes Yet</h3>
//             <p className="mt-2 text-muted-foreground">
//               Create your first professional resume to get started
//             </p>
//             <Button className="mt-4" asChild>
//               <Link href="/dashboard/resumes/new">
//                 <Plus className="mr-2 h-4 w-4" />
//                 Create Your First CV
//               </Link>
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

const Page = () => {
  return <ResumesPage />;
};

export default Page;

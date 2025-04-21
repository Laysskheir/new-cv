import Navbar from "@/components/layouts/navbar";
import dynamic from "next/dynamic";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const DynamicComponentWithNoSSR = dynamic(
    () => import("../../components/layouts/navbar"),
    { ssr: false }
  );
  return (
    <>
      <DynamicComponentWithNoSSR />
      {children}
    </>
  );
}

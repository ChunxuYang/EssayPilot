import Image from "next/image";
import Editor from "@/components/editor";
import SideBar from "@/components/sidebar";

export default function Home() {
  return (
    <main className="w-screen h-screen flex gap-5 p-5">
      <div className="flex-1">
        <Editor />
      </div>
      <div>
        <SideBar />
      </div>
    </main>
  );
}

"use client";

import { useRouter } from "next/navigation";
import DeveloperIntro from "../components/DeveloperIntro";

export default function DeveloperPage() {
  const router = useRouter();

  function handleBackToHome() {
    router.push("/");
  }

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#08080c]">
      <DeveloperIntro onEnter={handleBackToHome} />
    </div>
  );
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import ListRooms from "@/components/listRooms";
import Navbar from "@/components/Navbar";
import SectionWelcome from "@/components/sectionWelcome";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <SectionWelcome />
      <ListRooms />
      <Footer />
    </>
  );
}

'use client' ;

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";


// Dynamically import Scene with SSR disabled
const Scene = dynamic(() => import('@/components/Scene'), { ssr: true });

export default function Home() {
  return (
  <div className="relative h-screen w-[100vw]  ">
    <Navbar />
    <Scene/>
  </div>
  );
}

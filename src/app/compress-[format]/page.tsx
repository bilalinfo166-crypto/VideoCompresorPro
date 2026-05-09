import React from "react";
import FormatPageClient from "./FormatPageClient";

export async function generateStaticParams() {
  return [
    { format: "mp4" },
    { format: "mov" },
    { format: "avi" },
    { format: "mkv" },
    { format: "webm" },
  ];
}

export default function CompressFormatPage({ params }: { params: { format: string } }) {
  const format = params.format.toUpperCase();
  
  return <FormatPageClient format={format} />;
}

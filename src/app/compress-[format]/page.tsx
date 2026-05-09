import dynamic from "next/dynamic";

const FormatPageClient = dynamic(() => import("./FormatPageClient"), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center text-white">Loading Tool...</div>
});

export default function CompressFormatPage({ params }: { params: { format: string } }) {
  const format = (params?.format || "mp4").toUpperCase();
  
  return <FormatPageClient format={format} />;
}

import { Shield, Lock, EyeOff, ServerOff, Database, Globe } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Video Compressor",
  description: "Learn how we protect your data. Our Video Compressor works 100% locally in your browser - your files never leave your device.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-bold mb-6 backdrop-blur-md">
            <Shield className="w-4 h-4" />
            Privacy First Architecture
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-[var(--foreground)]">Privacy Policy</h1>
          <p className="text-[var(--muted-text)] text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Your privacy is our core feature. We've built this platform so that you don't have to trust us with your data.
          </p>
        </div>

        {/* Content */}
        <div className="glass-card p-8 md:p-12 rounded-[40px] border border-[var(--card-border)] space-y-12 leading-relaxed">
          
          <section>
            <div className="flex items-center gap-4 mb-4">
               <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <ServerOff className="w-5 h-5 text-indigo-400" />
               </div>
               <h2 className="text-2xl font-bold text-[var(--foreground)]">Local-First Processing</h2>
            </div>
            <p className="text-[var(--muted-text)] leading-relaxed font-medium">
              Unlike traditional video compressors, we do <strong>not</strong> upload your videos to our servers. All compression, cutting, and cropping happens directly in your browser using <strong>WebAssembly (WASM)</strong>. This means your files never leave your computer or mobile device.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-4">
               <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <EyeOff className="w-5 h-5 text-emerald-400" />
               </div>
               <h2 className="text-2xl font-bold text-[var(--foreground)]">No Tracking of Content</h2>
            </div>
            <p className="text-[var(--muted-text)] leading-relaxed font-medium">
              Because your files are processed locally, we have zero visibility into what you are compressing. We do not see your family videos, confidential business presentations, or any other sensitive content. We do not collect metadata from your video files.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-4">
               <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-400" />
               </div>
               <h2 className="text-2xl font-bold text-[var(--foreground)]">Data Collection</h2>
            </div>
            <p className="text-[var(--muted-text)] leading-relaxed font-medium">
              We collect minimal, anonymous usage data (such as page views and browser types) to improve the performance of our tool. This data is never linked to your identity or your files. We use industry-standard analytics that comply with global privacy standards.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-4">
               <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-400" />
               </div>
               <h2 className="text-2xl font-bold text-[var(--foreground)]">Cookies</h2>
            </div>
            <p className="text-[var(--muted-text)] leading-relaxed font-medium">
              We use essential cookies to remember your preferences (like your language settings). You can disable these in your browser settings, though some parts of the site may not function as expected.
            </p>
          </section>

          <div className="pt-8 border-t border-white/5 text-sm text-slate-500">
            Last Updated: May 2026. For any privacy-related questions, please visit our <a href="/contact" className="text-indigo-400 hover:underline">Contact Page</a>.
          </div>
        </div>
      </div>
    </div>
  );
}

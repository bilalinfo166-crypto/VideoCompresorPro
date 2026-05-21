import { FileText, Scale, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Service - Video Compressor",
  description: "Read the terms and conditions for using our free video compression tools.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm font-bold mb-6 backdrop-blur-md">
            <Scale className="w-4 h-4" />
            Legal Agreement
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-[var(--foreground)]">Terms of Service</h1>
          <p className="text-[var(--muted-text)] text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Please read these terms carefully before using our video processing tools.
          </p>
        </div>

        {/* Content */}
        <div className="glass-card p-8 md:p-12 rounded-[40px] border border-[var(--card-border)] space-y-10 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">1. Acceptance of Terms</h2>
            <p className="text-[var(--muted-text)] font-medium">
              By accessing and using our website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">2. Use of Service</h2>
            <p className="text-[var(--muted-text)] mb-4 font-medium">
              We provide video compression, cutting, and cropping tools that run locally in your browser. You are responsible for:
            </p>
            <ul className="space-y-3">
              {[
                "Ensuring you have the legal right to the videos you process.",
                "Using the tool for lawful purposes only.",
                "Not attempting to disrupt or damage the website's infrastructure."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-[var(--muted-text)] text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">3. Local Processing</h2>
            <p className="text-[var(--muted-text)] font-medium">
              You understand that all video processing happens on your local device. We do not store, view, or manage your files. You are solely responsible for the backup and security of your original and processed files.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">4. Intellectual Property</h2>
            <p className="text-[var(--muted-text)] font-medium">
              The website's design, code, and branding are the intellectual property of Video Compressor. You may not copy, reverse engineer, or redistribute our code without explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">5. Disclaimer of Warranty</h2>
            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex gap-4">
              <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
              <p className="text-[var(--muted-text)] text-sm italic font-medium">
                Our tools are provided "as is" without any warranty of any kind. We do not guarantee that the tool will always be error-free or that the output will meet your specific quality requirements.
              </p>
            </div>
          </section>

          <div className="pt-8 border-t border-[var(--card-border)] text-sm text-[var(--muted-text)] font-bold">
            Last Updated: May 2026. These terms may be updated from time to time.
          </div>
        </div>
      </div>
    </div>
  );
}

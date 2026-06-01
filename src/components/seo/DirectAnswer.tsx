import React from "react";
import { HelpCircle } from "lucide-react";

interface DirectAnswerProps {
  question: string;
  answer: string;
  steps?: string[];
}

export default function DirectAnswer({ question, answer, steps }: DirectAnswerProps) {
  return (
    <div className="my-8 p-6 sm:p-8 rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 backdrop-blur-md relative overflow-hidden shadow-lg">
      {/* Decorative premium glass background gradients */}
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black mb-4 select-none">
          <HelpCircle className="w-3.5 h-3.5" /> Quick Summary
        </div>
        
        <h3 className="text-lg sm:text-xl font-black text-[var(--foreground)] mb-3 leading-snug tracking-tight">
          {question}
        </h3>
        
        <p className="text-sm sm:text-base text-[var(--muted-text)] font-semibold leading-relaxed mb-4">
          {answer}
        </p>
        
        {steps && steps.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[var(--card-border)]/50">
            <h4 className="text-xs font-black uppercase tracking-wider text-[var(--muted-text)] mb-3">
              Step-by-Step Guide:
            </h4>
            <ol className="space-y-3.5 pl-4 list-decimal text-sm font-bold text-[var(--foreground)]">
              {steps.map((step, idx) => (
                <li key={idx} className="pl-1 leading-relaxed">
                  <span className="font-semibold text-[var(--muted-text)]">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

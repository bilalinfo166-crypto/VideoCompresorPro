"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chrome, X, Sparkles, ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function OneTapSignup() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Show popup after 3 seconds for new users
    const hasSeenPopup = localStorage.getItem("one_tap_signup_seen");
    const isLoggedIn = localStorage.getItem("user_logged_in");

    if (!hasSeenPopup && !isLoggedIn) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Try to get a mock email or a previously entered one
        const savedEmail = localStorage.getItem("temp_email");
        setUserEmail(savedEmail || "user@example.com");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("one_tap_signup_seen", "true");
  };

  const handleAutoSignup = () => {
    // Mock auto-signup
    localStorage.setItem("user_logged_in", "true");
    localStorage.setItem("user_email", userEmail);
    setIsVisible(false);
    // You could redirect or show a success message here
    window.dispatchEvent(new Event("auth_change"));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed top-20 right-4 z-[9999] w-full max-w-[320px]"
        >
          <div className="glass-card rounded-2xl p-6 border border-[var(--card-border)] shadow-2xl relative overflow-hidden group">
            {/* Decorative Sparkle */}
            <div className="absolute -top-2 -left-2 w-12 h-12 bg-blue-600/20 rounded-full blur-xl group-hover:bg-blue-600/30 transition-colors" />
            
            <button 
              onClick={handleClose}
              className="absolute top-3 right-3 text-[var(--muted-text)] hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-lg border border-slate-200 dark:border-slate-700">
                <Chrome className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-black text-[var(--foreground)] leading-tight">
                  Continue with Google
                </h4>
                <p className="text-[10px] text-[var(--muted-text)] font-bold uppercase tracking-widest">
                  Instant Signup
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-3 mb-4 border border-[var(--card-border)] flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {userEmail[0].toUpperCase()}
               </div>
               <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-[var(--muted-text)] font-bold truncate">{userEmail}</p>
               </div>
            </div>

            <button 
              onClick={handleAutoSignup}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group/btn"
            >
              Continue as {userEmail.split('@')[0]}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>

            <p className="text-[9px] text-[var(--muted-text)] text-center mt-3 leading-tight opacity-70">
              By clicking continue, you agree to our Terms and Privacy Policy.
            </p>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

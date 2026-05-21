"use client";

import Link from "next/link";
import { Video, ArrowLeft, Mail, Lock, Eye, EyeOff, Chrome, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (loginError) {
        setError(loginError.message);
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        const userDetails = data.user;
        const name = userDetails.user_metadata?.full_name || userDetails.email?.split("@")[0] || "User";

        // Local state synchronization for Header components
        localStorage.setItem("user_logged_in", "true");
        localStorage.setItem("user_email", userDetails.email || email);
        localStorage.setItem("user_name", name);
        
        // Dispatch auth_change event so header updates instantly
        window.dispatchEvent(new Event("auth_change"));
        
        // Redirect to dashboard
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard',
        }
      });
      if (oauthError) {
        setError(oauthError.message);
      }
    } catch (err: any) {
      setError(err.message || "OAuth login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center items-center p-4 relative overflow-hidden transition-colors duration-300">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />

      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-[var(--muted-text)] hover:text-blue-600 transition-colors font-medium group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {t("auth.back_home")}
      </Link>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20 mb-4 transform hover:rotate-6 transition-transform cursor-pointer">
            <Video className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tight">{t("auth.login_title")}</h1>
          <p className="text-[var(--muted-text)] font-medium mt-2">{t("auth.login_subtitle")}</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-[32px] p-8 border border-[var(--card-border)] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          {/* Optional account benefits notice */}
          <div className="mb-6 p-4 rounded-2xl bg-blue-600/10 border border-blue-600/20 text-xs text-[var(--muted-text)] font-semibold leading-relaxed text-left">
            💡 <span className="text-blue-500 font-bold">{t("auth.optional_info_badge")?.includes("auth.") ? "Optional Benefit" : (t("auth.optional_info_badge") || "Optional Benefit")}:</span> {t("auth.optional_info")}
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-500 text-left">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[var(--foreground)] px-1">{t("auth.email_label")}</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-text)] group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com" 
                  className="w-full bg-[var(--background)] border border-[var(--card-border)] p-4 pl-12 rounded-2xl text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between px-1">
                <label className="text-sm font-bold text-[var(--foreground)]">{t("auth.password_label")}</label>
                <Link href="#" className="text-xs font-bold text-blue-600 hover:underline">{t("auth.forgot_password")}</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-text)] group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-[var(--background)] border border-[var(--card-border)] p-4 pl-12 pr-12 rounded-2xl text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-text)] hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : t("auth.login_btn")}
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[var(--card-border)]"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-[var(--muted-text)] uppercase tracking-widest">{t("auth.or_email")}</span>
              <div className="flex-grow border-t border-[var(--card-border)]"></div>
            </div>

            {/* Social Login */}
            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border border-[var(--card-border)] p-4 rounded-2xl font-bold text-[var(--foreground)] hover:bg-slate-50 dark:hover:bg-slate-700 transition-all group active:scale-[0.98]"
            >
              <div className="w-5 h-5 flex items-center justify-center bg-white rounded-full p-0.5 shadow-sm border border-slate-200">
                <Chrome className="w-full h-full text-blue-600" />
              </div>
              {t("auth.google_login")}
            </button>
          </form>

          <p className="text-center text-[var(--muted-text)] text-sm font-medium mt-8">
            {t("auth.no_account")}{" "}
            <Link href="/signup" className="text-blue-600 font-bold hover:underline">{t("auth.signup_link")}</Link>
          </p>
        </div>

        {/* Footer info */}
        <p className="text-center text-[var(--muted-text)] text-xs mt-8 opacity-60">
          {t("auth.terms_privacy")}
        </p>
      </div>
    </div>
  );
}

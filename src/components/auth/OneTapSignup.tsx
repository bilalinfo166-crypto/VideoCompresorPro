"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chrome, X, Sparkles, ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function OneTapSignup() {
  useEffect(() => {
    const handleOneTap = () => {
      if (typeof window === "undefined" || !window.google) return;

      const hasSeenInSession = sessionStorage.getItem("one_tap_dismissed");
      const isLoggedIn = localStorage.getItem("user_logged_in");

      if (hasSeenInSession || isLoggedIn) return;

      window.google.accounts.id.initialize({
        client_id: "735320161789-fjurchka2qn37vj34at1fkgspp5g2r3p.apps.googleusercontent.com",
        callback: (response: any) => {
          // Handle successful login
          localStorage.setItem("user_logged_in", "true");
          localStorage.setItem("user_token", response.credential);
          window.dispatchEvent(new Event("auth_change"));
          window.location.reload(); // Refresh to update state
        },
        itp_support: true,
      });

      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isDismissedMoment()) {
          // If user clicks X, save to session so it doesn't show again in THIS tab/session
          sessionStorage.setItem("one_tap_dismissed", "true");
        }
      });
    };

    // Small delay to ensure script is ready and page is loaded
    const timer = setTimeout(handleOneTap, 2000);
    return () => clearTimeout(timer);
  }, []);

  return null; // Official Google UI handles the rendering
}

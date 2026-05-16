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

      const clientId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID || "969090107342-r11haf11a8q75tq03s27nqh9rd4ko5pf.apps.googleusercontent.com";

      const decodeJwt = (token: string) => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          return JSON.parse(jsonPayload);
        } catch (e) {
          return null;
        }
      };

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: any) => {
          const payload = decodeJwt(response.credential);
          if (payload) {
            localStorage.setItem("user_logged_in", "true");
            localStorage.setItem("user_email", payload.email);
            localStorage.setItem("user_name", payload.name);
            localStorage.setItem("user_image", payload.picture);
            localStorage.setItem("user_token", response.credential);
            window.dispatchEvent(new Event("auth_change"));
            window.location.reload(); 
          }
        },
        itp_support: true,
      });

      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isSkippedMoment()) {
          console.warn("One Tap skipped:", notification.getSkippedReason());
        }
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

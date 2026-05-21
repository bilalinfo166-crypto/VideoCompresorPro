"use client";

import { useEffect, useState } from "react";
import { 
  User, Mail, Settings, History, Video, Clock, 
  Download, HardDrive, ShieldCheck, LogOut, LayoutDashboard,
  BarChart3, Sparkles, Scissors, Crop, Music, Loader2
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function DashboardPage() {
  const { t } = useLanguage();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalProcesses: 0, storageSaved: "0 MB" });

  useEffect(() => {
    const fetchUserDataAndHistory = async () => {
      setLoading(true);
      try {
        // 1. Get Session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          // If no session, redirect to login
          window.location.href = "/login";
          return;
        }

        const user = session.user;
        const email = user.email || "";
        const name = user.user_metadata?.full_name || email.split("@")[0] || "User";
        
        setUserEmail(email);
        setUserName(name);
        setUserImage(user.user_metadata?.avatar_url || "");

        // Sync with localStorage so header stays matching
        localStorage.setItem("user_logged_in", "true");
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_name", name);

        // 2. Fetch compression history
        const { data: logs, error: logsError } = await supabase
          .from("compression_history")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (logsError) {
          console.error("Failed to fetch logs:", logsError.message);
        } else if (logs) {
          setHistory(logs);
          
          // Calculate dynamic stats
          const total = logs.length;
          const totalSavingsBytes = logs.reduce((sum, item) => sum + Math.max(0, item.original_size - item.compressed_size), 0);
          const totalSavingsMB = totalSavingsBytes / (1024 * 1024);
          
          let formattedSaved = "0 MB";
          if (totalSavingsMB >= 1024) {
            formattedSaved = `${(totalSavingsMB / 1024).toFixed(2)} GB`;
          } else {
            formattedSaved = `${totalSavingsMB.toFixed(1)} MB`;
          }

          setStats({
            totalProcesses: total,
            storageSaved: formattedSaved
          });
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndHistory();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user_logged_in");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_token");
    
    // Notify header
    window.dispatchEvent(new Event("auth_change"));
    window.location.href = "/";
  };

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center items-center gap-4 transition-colors duration-300">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-sm font-bold text-[var(--muted-text)] tracking-wider uppercase">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pt-8 pb-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass-card rounded-[32px] p-6 border border-[var(--card-border)] flex items-center gap-5">
             <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center">
                <Video className="w-7 h-7 text-blue-600" />
             </div>
             <div>
                <p className="text-[10px] font-black text-[var(--muted-text)] uppercase tracking-widest">Total Processes</p>
                <h3 className="text-2xl font-black text-[var(--foreground)]">{stats.totalProcesses}</h3>
             </div>
          </div>
          <div className="glass-card rounded-[32px] p-6 border border-[var(--card-border)] flex items-center gap-5">
             <div className="w-14 h-14 bg-emerald-600/10 rounded-2xl flex items-center justify-center">
                <HardDrive className="w-7 h-7 text-emerald-600" />
             </div>
             <div>
                <p className="text-[10px] font-black text-[var(--muted-text)] uppercase tracking-widest">Storage Saved</p>
                <h3 className="text-2xl font-black text-[var(--foreground)]">{stats.storageSaved}</h3>
             </div>
          </div>
          <div className="glass-card rounded-[32px] p-6 border border-[var(--card-border)] flex items-center gap-5">
             <div className="w-14 h-14 bg-purple-600/10 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-purple-600" />
             </div>
             <div>
                <p className="text-[10px] font-black text-[var(--muted-text)] uppercase tracking-widest">Account Status</p>
                <h3 className="text-2xl font-black text-[var(--foreground)]">Premium</h3>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: User Profile */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-[40px] p-8 border border-[var(--card-border)] text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-2 bg-blue-600" />
               <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-violet-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-blue-600/20 overflow-hidden">
                  {userImage ? (
                    <img src={userImage} alt={userName} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
               </div>
               <h2 className="text-2xl font-black text-[var(--foreground)] capitalize mb-1">{userName}</h2>
               <p className="text-sm font-bold text-[var(--muted-text)] mb-8">{userEmail}</p>

               <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl font-bold text-sm text-[var(--foreground)] hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                     <Settings className="w-4 h-4 text-slate-500" />
                     Account Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-500/20 transition-colors"
                  >
                     <LogOut className="w-4 h-4" />
                     Sign Out
                  </button>
               </div>
            </div>

            <div className="glass-card rounded-[40px] p-8 border border-[var(--card-border)]">
               <h4 className="font-black text-sm uppercase tracking-widest mb-6">Quick Tools</h4>
               <div className="grid grid-cols-2 gap-4">
                  <Link href="/video-cutter" className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center hover:scale-105 transition-transform group">
                     <Scissors className="w-6 h-6 mx-auto mb-2 text-violet-500 group-hover:rotate-12 transition-transform" />
                     <span className="text-[10px] font-black uppercase tracking-wider">Cutter</span>
                  </Link>
                  <Link href="/crop-video" className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center hover:scale-105 transition-transform group">
                     <Crop className="w-6 h-6 mx-auto mb-2 text-purple-500 group-hover:rotate-12 transition-transform" />
                     <span className="text-[10px] font-black uppercase tracking-wider">Cropper</span>
                  </Link>
               </div>
            </div>
          </div>

          {/* Right: History & Activity */}
          <div className="lg:col-span-8">
            <div className="glass-card rounded-[40px] p-8 border border-[var(--card-border)] h-full">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                     <History className="w-6 h-6 text-blue-600" />
                     <h3 className="text-xl font-black text-[var(--foreground)]">Recent Activity</h3>
                  </div>
               </div>

               <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-blue-600/20 transition-all group">
                       <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-[var(--card-border)]">
                          <HardDrive className="w-5 h-5 text-blue-600" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-[var(--foreground)] truncate">{item.file_name}</h5>
                          <div className="flex items-center gap-3 mt-1">
                             <span className="text-[10px] font-black uppercase tracking-tighter text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded-md">{item.file_type}</span>
                             <span className="text-[10px] text-[var(--muted-text)] font-bold">{new Date(item.created_at).toLocaleDateString()}</span>
                          </div>
                       </div>
                       <div className="text-right hidden sm:block mr-2">
                          <p className="text-xs font-black text-[var(--foreground)]">{formatSize(item.compressed_size)}</p>
                          <p className="text-[10px] text-[var(--muted-text)] line-through">{formatSize(item.original_size)}</p>
                       </div>
                    </div>
                  ))}
               </div>

               {/* Empty State placeholder */}
               {history.length === 0 && (
                 <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                       <HardDrive className="w-10 h-10 text-slate-300" />
                    </div>
                    <p className="text-[var(--muted-text)] font-bold">No history found. Start using our tools!</p>
                 </div>
               )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

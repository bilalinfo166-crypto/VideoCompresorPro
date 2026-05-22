const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
    }
  });
} catch (e) {
  console.log("⚠️ Could not read .env.local file. Trying process.env...");
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Environment variables are missing! Check your .env.local file.");
  process.exit(1);
}

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key starts with:", supabaseAnonKey.substring(0, 15) + "...");

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log("Connecting to Supabase...");
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("❌ Supabase Auth check failed:", error.message);
      process.exit(1);
    }
    
    console.log("✅ Successfully connected to Supabase Auth!");
    console.log("Session details:", data);
    process.exit(0);
  } catch (err) {
    console.error("❌ Unexpected connection error:", err.message);
    process.exit(1);
  }
}

testConnection();

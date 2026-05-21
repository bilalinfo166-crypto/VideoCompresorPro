import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function logCompressionMetadata(
  fileName: string,
  fileType: string,
  originalSize: number, // in bytes
  compressedSize: number // in bytes
) {
  try {
    // 1. Get current session
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || null;

    // Calculate savings in MB
    const savingsBytes = originalSize - compressedSize;
    const savingsMb = Number((Math.max(0, savingsBytes) / (1024 * 1024)).toFixed(2));

    const { error } = await supabase.from('compression_history').insert({
      user_id: userId,
      file_name: fileName,
      file_type: fileType,
      original_size: originalSize,
      compressed_size: compressedSize,
      savings_mb: savingsMb
    });

    if (error) {
      console.error("Failed to insert compression log into Supabase:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Unexpected error logging compression:", err);
    return { success: false, error: err.message };
  }
}


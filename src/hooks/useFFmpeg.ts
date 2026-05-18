import { useState, useRef, useCallback } from 'react';

// Detect if user is on a mobile/low-power device
export function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || (navigator.maxTouchPoints > 1 && window.innerWidth < 768);
}

// Returns file size in MB
export function fileSizeMB(file: File): number {
  return file.size / (1024 * 1024);
}

// Detect number of logical CPU cores for multi-thread support
function getThreadCount(): number {
  if (typeof navigator === 'undefined') return 1;
  const cores = navigator.hardwareConcurrency || 2;
  // Use half the cores to avoid freezing the browser, min 1, max 8
  return Math.min(Math.max(Math.floor(cores / 2), 1), 8);
}

// Get video duration from a File object
function getVideoDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };
    video.onerror = () => resolve(60);
    video.src = URL.createObjectURL(file);
  });
}

export function useFFmpeg() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');
  const ffmpegRef = useRef<any>(null);

  const load = useCallback(async () => {
    if (isLoaded || isLoading) return;

    setIsLoading(true);
    setStatusMsg('Loading engine...');
    try {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      const { toBlobURL } = await import('@ffmpeg/util');

      // Use jsDelivr CDN (faster and more reliable than unpkg)
      const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd';
      const ffmpeg = new FFmpeg();
      ffmpegRef.current = ffmpeg;

      ffmpeg.on('progress', ({ progress: p }: { progress: number }) => {
        setProgress(Math.round(p * 100));
      });

      ffmpeg.on('log', ({ message }: { message: string }) => {
        if (message.includes('frame=') || message.includes('time=')) {
          setStatusMsg('Compressing...');
        } else if (message.includes('muxing overhead')) {
          setStatusMsg('Finalizing...');
        }
      });

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });

      setIsLoaded(true);
      setStatusMsg('');
    } catch (error) {
      console.error('Error loading FFmpeg:', error);
      // Fallback to unpkg if jsDelivr fails
      try {
        const { FFmpeg } = await import('@ffmpeg/ffmpeg');
        const { toBlobURL } = await import('@ffmpeg/util');
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        const ffmpeg = new FFmpeg();
        ffmpegRef.current = ffmpeg;
        ffmpeg.on('progress', ({ progress: p }: { progress: number }) => {
          setProgress(Math.round(p * 100));
        });
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        setIsLoaded(true);
        setStatusMsg('');
      } catch (fallbackError) {
        console.error('Fallback CDN also failed:', fallbackError);
        setStatusMsg('Load failed. Please refresh and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, isLoading]);

  const executeCommand = useCallback(async (
    file: File,
    args: string[],
    outputExt: string = 'mp4',
    mimeType: string = 'video/mp4',
  ): Promise<Blob | null> => {
    if (!isLoaded) await load();

    setProgress(0);
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) return null;

    const ext = file.name.split('.').pop() || 'mp4';
    const inputName = `in_${Date.now()}.${ext}`;
    const outputName = `out_${Date.now()}.${outputExt}`;

    try {
      const { fetchFile } = await import('@ffmpeg/util');

      setStatusMsg('Reading file...');
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      setStatusMsg('Compressing...');
      const finalArgs = ['-i', inputName, ...args, '-y', outputName];
      await ffmpeg.exec(finalArgs);

      const data = await ffmpeg.readFile(outputName);

      // Clean up files from FFmpeg's virtual filesystem
      try { await ffmpeg.deleteFile(inputName); } catch (_) {}
      try { await ffmpeg.deleteFile(outputName); } catch (_) {}

      setStatusMsg('Done!');
      setProgress(100);
      return new Blob([data as any], { type: mimeType });
    } catch (error) {
      console.error('FFmpeg exec error:', error);
      setStatusMsg('Compression failed. Please try again.');
      try { await ffmpeg.deleteFile(inputName); } catch (_) {}
      try { await ffmpeg.deleteFile(outputName); } catch (_) {}
      return null;
    }
  }, [isLoaded, load]);

  /**
   * SMART COMPRESS — Best quality + size balance for desktop
   * Uses CRF-based VBR for maximum quality preservation.
   * Falls back to stricter CRF if the result is still too large.
   */
  const smartCompress = useCallback(async (
    file: File,
    targetSizeMB: number,
  ): Promise<Blob | null> => {
    const threads = getThreadCount();
    const fileMB = fileSizeMB(file);

    // Calculate ideal CRF based on compression ratio requested
    const ratio = targetSizeMB / fileMB;
    let crf: number;
    if (ratio >= 0.8) crf = 22;       // Very mild compression — near original quality
    else if (ratio >= 0.6) crf = 24;  // Light compression
    else if (ratio >= 0.4) crf = 26;  // Moderate — good quality
    else if (ratio >= 0.25) crf = 28; // Standard
    else if (ratio >= 0.1) crf = 30;  // Aggressive
    else crf = 33;                     // Very small output

    const args = [
      '-c:v', 'libx264',
      '-crf', `${crf}`,
      '-preset', 'fast',          // 'fast' is 3-4x quicker than 'medium' with minimal quality loss
      '-tune', 'film',            // Best for general video content
      '-pix_fmt', 'yuv420p',
      '-profile:v', 'high',
      '-level', '4.1',
      '-movflags', '+faststart',  // Web-optimized: starts playing before fully downloaded
      '-c:a', 'aac',
      '-b:a', '128k',
      '-ac', '2',
      '-threads', `${threads}`,   // Multi-threaded for speed
    ];

    setStatusMsg('Analyzing video...');
    const result = await executeCommand(file, args, 'mp4', 'video/mp4');

    // If still too large (>15% over target), do a second pass with stricter CRF
    if (result && result.size > targetSizeMB * 1024 * 1024 * 1.15) {
      setStatusMsg('Optimizing further...');
      setProgress(0);
      const strictArgs = [...args];
      const crfIdx = strictArgs.indexOf('-crf') + 1;
      strictArgs[crfIdx] = `${Math.min(crf + 4, 36)}`;
      const secondResult = await executeCommand(file, strictArgs, 'mp4', 'video/mp4');
      return secondResult || result;
    }

    return result;
  }, [executeCommand]);

  /**
   * MOBILE FAST COMPRESS — optimized for low-power/touch devices
   * Strategy: CRF28 + ultrafast + 720p scale = fastest possible output
   */
  const mobileFastCompress = useCallback(async (file: File): Promise<Blob | null> => {
    const args = [
      '-vf', "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease",
      '-c:v', 'libx264',
      '-crf', '28',
      '-preset', 'ultrafast',
      '-tune', 'zerolatency',
      '-profile:v', 'baseline',
      '-level', '3.1',
      '-movflags', '+faststart',
      '-c:a', 'aac',
      '-b:a', '96k',
      '-ac', '2',
      '-threads', '2',
    ];
    return executeCommand(file, args, 'mp4', 'video/mp4');
  }, [executeCommand]);

  const compressVideo = useCallback(async (
    file: File,
    quality: 'basic' | 'strong' | 'extreme' = 'basic',
  ): Promise<Blob | null> => {
    if (isMobileDevice()) {
      return mobileFastCompress(file);
    }
    const crfMap = { basic: 24, strong: 28, extreme: 33 };
    const threads = getThreadCount();
    const args = [
      '-c:v', 'libx264',
      '-crf', `${crfMap[quality]}`,
      '-preset', 'fast',
      '-tune', 'film',
      '-pix_fmt', 'yuv420p',
      '-profile:v', 'high',
      '-level', '4.1',
      '-movflags', '+faststart',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-ac', '2',
      '-threads', `${threads}`,
    ];
    return executeCommand(file, args, 'mp4', 'video/mp4');
  }, [executeCommand, mobileFastCompress]);

  return {
    isLoaded,
    isLoading,
    progress,
    statusMsg,
    load,
    executeCommand,
    compressVideo,
    mobileFastCompress,
    smartCompress,
    isMobile: isMobileDevice(),
  };
}

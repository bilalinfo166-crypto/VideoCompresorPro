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
      
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      const ffmpeg = new FFmpeg();
      ffmpegRef.current = ffmpeg;

      ffmpeg.on('progress', ({ progress: p }: { progress: number }) => {
        setProgress(Math.round(p * 100));
      });

      ffmpeg.on('log', ({ message }: { message: string }) => {
        // Parse useful info from FFmpeg logs
        if (message.includes('frame=') || message.includes('time=')) {
          setStatusMsg('Compressing...');
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
      setStatusMsg('Load failed');
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
    
    try {
      const { fetchFile } = await import('@ffmpeg/util');
      const inputName = `input_${Date.now()}.${file.name.split('.').pop()}`;
      const outputName = `output_${Date.now()}.${outputExt}`;
      
      setStatusMsg('Loading file...');
      await ffmpeg.writeFile(inputName, await fetchFile(file));
      
      setStatusMsg('Compressing...');
      const finalArgs = ['-i', inputName, ...args, outputName];
      await ffmpeg.exec(finalArgs);
      
      const data = await ffmpeg.readFile(outputName);
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
      
      setStatusMsg('Done!');
      return new Blob([data as any], { type: mimeType });
    } catch (error) {
      console.error('Error executing FFmpeg command:', error);
      setStatusMsg('Error occurred');
      return null;
    }
  }, [isLoaded, load]);

  /**
   * MOBILE FAST COMPRESS — optimized for low-power devices
   * Strategy:
   * 1. Scale down to 720p max (biggest speedup)
   * 2. Use CRF (no bitrate calculation needed — faster)
   * 3. ultrafast preset
   * 4. baseline profile (max hardware compatibility)
   * 5. Lower audio bitrate
   */
  const mobileFastCompress = useCallback(async (file: File): Promise<Blob | null> => {
    const args = [
      '-vf', 'scale=\'min(1280,iw)\':\'min(720,ih)\':force_original_aspect_ratio=decrease',
      '-c:v', 'libx264',
      '-crf', '30',              // Higher CRF = smaller/faster (26=good quality, 35=very small)
      '-preset', 'ultrafast',
      '-tune', 'zerolatency',    // Minimizes internal buffering — faster output
      '-profile:v', 'baseline',
      '-level', '3.1',
      '-movflags', '+faststart',
      '-c:a', 'aac',
      '-b:a', '96k',             // Lower audio on mobile is fine
      '-ac', '2',                // Force stereo
    ];
    return executeCommand(file, args, 'mp4', 'video/mp4');
  }, [executeCommand]);

  const compressVideo = useCallback(async (
    file: File, 
    quality: 'basic' | 'strong' | 'extreme' = 'basic',
  ): Promise<Blob | null> => {
    // On mobile, always use the fast path regardless of quality setting
    if (isMobileDevice()) {
      return mobileFastCompress(file);
    }

    let args: string[] = [];
    if (quality === 'basic') {
      args = ['-c:v', 'libx264', '-crf', '28', '-preset', 'ultrafast', '-tune', 'zerolatency', '-profile:v', 'baseline', '-level', '3.0'];
    } else if (quality === 'strong') {
      args = ['-c:v', 'libx264', '-crf', '32', '-preset', 'ultrafast', '-tune', 'zerolatency', '-profile:v', 'baseline', '-level', '3.0'];
    } else if (quality === 'extreme') {
      args = ['-c:v', 'libx264', '-crf', '35', '-preset', 'ultrafast', '-vf', 'scale=\'min(1280,iw)\':-2', '-profile:v', 'baseline', '-level', '3.0'];
    }
    args.push('-c:a', 'aac', '-b:a', '128k');
    
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
    isMobile: isMobileDevice(),
  };
}



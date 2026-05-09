import { useState, useRef, useCallback } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export function useFFmpeg() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef<string>('');

  const load = useCallback(async () => {
    if (isLoaded || isLoading) return;
    
    setIsLoading(true);
    try {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      const ffmpeg = ffmpegRef.current;

      ffmpeg.on('progress', ({ progress, time }) => {
        setProgress(Math.round(progress * 100));
      });

      ffmpeg.on('log', ({ message }) => {
        messageRef.current = message;
        console.log('[FFmpeg Log]:', message);
      });

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });

      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading FFmpeg:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, isLoading]);

  const executeCommand = useCallback(async (
    file: File,
    args: string[],
    outputExt: string = 'mp4',
    mimeType: string = 'video/mp4',
    addWatermark: boolean = false
  ): Promise<Blob | null> => {
    if (!isLoaded) await load();
    
    setProgress(0);
    const ffmpeg = ffmpegRef.current;
    
    try {
      const inputName = `input_${Date.now()}.${file.name.split('.').pop()}`;
      const outputName = `output_${Date.now()}.${outputExt}`;
      
      await ffmpeg.writeFile(inputName, await fetchFile(file));
      
      const finalArgs = ['-i', inputName, ...args, outputName];
      
      await ffmpeg.exec(finalArgs);
      
      const data = await ffmpeg.readFile(outputName);
      
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
      
      return new Blob([data as any], { type: mimeType });
    } catch (error) {
      console.error('Error executing FFmpeg command:', error);
      return null;
    }
  }, [isLoaded, load]);

  const compressVideo = useCallback(async (
    file: File, 
    quality: 'basic' | 'strong' | 'extreme' = 'basic',
    addWatermark: boolean = false
  ): Promise<Blob | null> => {
    let args: string[] = [];
    if (quality === 'basic') {
      args = ['-c:v', 'libx264', '-crf', '28', '-preset', 'ultrafast', '-tune', 'zerolatency', '-profile:v', 'baseline', '-level', '3.0'];
    } else if (quality === 'strong') {
      args = ['-c:v', 'libx264', '-crf', '32', '-preset', 'ultrafast', '-tune', 'zerolatency', '-profile:v', 'baseline', '-level', '3.0'];
    } else if (quality === 'extreme') {
      args = ['-c:v', 'libx264', '-crf', '35', '-preset', 'ultrafast', '-vf', 'scale=\'min(1280,iw)\':-2', '-profile:v', 'baseline', '-level', '3.0'];
    }
    args.push('-c:a', 'aac', '-b:a', '128k');
    
    return executeCommand(file, args, 'mp4', 'video/mp4', addWatermark);
  }, [executeCommand]);

  return {
    isLoaded,
    isLoading,
    progress,
    load,
    executeCommand,
    compressVideo
  };
}

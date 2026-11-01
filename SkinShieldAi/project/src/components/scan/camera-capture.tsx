'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraCaptureProps {
  onCapture: (photo: File) => void;
  onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<'starting' | 'ready' | 'error'>('starting');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;

    if (!navigator.mediaDevices?.getUserMedia) {
      setErrorMessage('Your browser does not support camera access. Upload a photo instead.');
      setStatus('error');
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false })
      .then((mediaStream) => {
        if (cancelled) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }
        stream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setErrorMessage('We could not access your camera. Check your permissions or upload a photo instead.');
        setStatus('error');
      });

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob) onCapture(new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' }));
    }, 'image/jpeg', 0.92);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-50">Live camera</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close camera"
          className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl bg-slate-950">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          onLoadedMetadata={() => videoRef.current?.play()}
          className={`h-full w-full scale-x-[-1] object-cover ${status === 'ready' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        />
        {status === 'starting' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-emerald-400" />
          </div>
        )}
        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <CameraOff className="h-8 w-8 text-amber-300" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-slate-300">{errorMessage}</p>
          </div>
        )}
        {status === 'ready' && (
          <div className="pointer-events-none absolute inset-6 rounded-[2rem] border border-dashed border-emerald-300/50" />
        )}
      </div>

      <Button
        onClick={handleCapture}
        disabled={status !== 'ready'}
        className="mt-5 h-12 w-full rounded-full bg-emerald-500 text-base font-semibold text-slate-950 transition-all duration-300 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-400"
      >
        <Camera className="mr-2 h-5 w-5" aria-hidden="true" />
        Capture photo
      </Button>
    </div>
  );
}

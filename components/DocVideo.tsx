"use client";

import { useEffect, useRef } from "react";

interface DocVideoProps {
  src: string;
  /** Playback speed multiplier, default 1.5 */
  rate?: number;
}

export function DocVideo({ src, rate = 1.5 }: DocVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.playbackRate = rate;
  }, [rate]);

  return (
    <div className="my-8 not-prose">
      <div className="relative w-full overflow-hidden rounded-xl border border-border bg-black shadow-2xl">
        {/* Subtle top glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full block"
          onLoadedMetadata={(e) => {
            // Ensure rate is set after metadata loads (some browsers reset it)
            (e.currentTarget as HTMLVideoElement).playbackRate = rate;
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      </div>
    </div>
  );
}

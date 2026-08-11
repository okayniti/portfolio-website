"use client"

import type { ReactNode } from "react"

interface GlowingShadowProps {
  children: ReactNode
  /** Applied to the inner card surface — use it for padding, text alignment, etc. */
  className?: string
}

/**
 * Adapted from a fixed-size (vw/aspect-ratio) showcase card into a flexible
 * wrapper that fills whatever box it's placed in and grows with its content
 * (grid cells, expandable panels, image-grid layouts).
 *
 * Structurally this now uses three layers instead of the original two:
 * glow-shell (holds the animated color-burn gradient, clipped to the card's
 * rounded silhouette) -> glow-surface (an opaque inset "card face" that
 * covers the gradient everywhere except a thin border-width rim, which is
 * where the animated glow actually reads as a border) -> children. The
 * original component painted content directly inside the gradient layer,
 * which is fine for a small pill with big centered text (content fully
 * covers the gradient anyway) but bled color across real body text/images
 * once this card grows to arbitrary sizes — the inset opaque surface is
 * what keeps the effect looking like a border instead of a tinted wash.
 */
export function GlowingShadow({ children, className = "" }: GlowingShadowProps) {
  return (
    <>
      <style jsx>{`
        @property --hue {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --rotate {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-x {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-translate-y {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --bg-size {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-opacity {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-blur {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }
        @property --glow-scale {
          syntax: "<number>";
          inherits: true;
          initial-value: 2;
        }
        @property --glow-radius {
          syntax: "<number>";
          inherits: true;
          initial-value: 2;
        }
        @property --white-shadow {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }

        .glow-container {
          --card-color: #1c0d02;
          --card-radius: 1.5rem;
          --border-width: 2px;
          --bg-size: 1;
          --hue: 0;
          --hue-speed: 1;
          --rotate: 0;
          --animation-speed: 4s;
          --interaction-speed: 0.55s;
          --glow-scale: 1.5;
          --scale-factor: 1;
          --glow-blur: 6;
          --glow-opacity: 1;
          --glow-radius: 100;
          --glow-rotate-unit: 1deg;

          width: 100%;
          color: white;
          position: relative;
          isolation: isolate;
          border-radius: var(--card-radius);
        }

        .glow-shell {
          position: relative;
          z-index: 1;
          border-radius: var(--card-radius);
          overflow: hidden;
        }

        .glow-shell:before {
          content: "";
          display: block;
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: 0 0 20px black;
          mix-blend-mode: color-burn;
          z-index: 0;
          background: hsl(0deg 0% 16%) radial-gradient(
            30% 30% at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
            hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 90%) calc(0% * var(--bg-size)),
            hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 80%) calc(20% * var(--bg-size)),
            hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 60%) calc(40% * var(--bg-size)),
            transparent 100%
          );
          animation: hue-animation var(--animation-speed) linear infinite,
                     rotate-bg var(--animation-speed) linear infinite;
          transition: --bg-size var(--interaction-speed) ease;
        }

        .glow-surface {
          position: relative;
          z-index: 1;
          margin: var(--border-width);
          background: var(--card-color);
          border-radius: calc(var(--card-radius) - var(--border-width));
          overflow: hidden;
        }

        .glow {
          --glow-translate-y: 0;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 24%;
          aspect-ratio: 1;
          z-index: 0;
          animation: rotate var(--animation-speed) linear infinite;
          transform: translate(-50%, -50%) rotateZ(calc(var(--rotate) * var(--glow-rotate-unit)));
          transform-origin: center;
          border-radius: 9999px;
        }

        .glow:after {
          content: "";
          display: block;
          z-index: -2;
          filter: blur(calc(var(--glow-blur) * 10px));
          width: 130%;
          height: 130%;
          left: -15%;
          top: -15%;
          background: hsl(calc(var(--hue) * var(--hue-speed) * 1deg) 100% 60%);
          position: relative;
          border-radius: 9999px;
          animation: hue-animation var(--animation-speed) linear infinite;
          transform: scaleY(calc(var(--glow-scale) * var(--scale-factor) / 1.1))
                     scaleX(calc(var(--glow-scale) * var(--scale-factor) * 1.2))
                     translateY(calc(var(--glow-translate-y) * 1%));
          opacity: var(--glow-opacity);
        }

        .glow-container:hover .glow-surface {
          box-shadow: 0 0 calc(var(--white-shadow) * 1vw) calc(var(--white-shadow) * 0.15vw) rgb(255 255 255 / 20%);
          animation: shadow-pulse calc(var(--animation-speed) * 2) linear infinite;
        }

        .glow-container:hover .glow-shell:before {
          --bg-size: 15;
          animation-play-state: paused;
          transition: --bg-size var(--interaction-speed) ease;
        }

        .glow-container:hover .glow {
          --glow-blur: 1.5;
          --glow-opacity: 0.6;
          --glow-scale: 2.5;
          --glow-radius: 0;
          --rotate: 900;
          --glow-rotate-unit: 0;
          --scale-factor: 1.25;
          animation-play-state: paused;
        }

        .glow-container:hover .glow:after {
          --glow-translate-y: 0;
          animation-play-state: paused;
          transition: --glow-translate-y 0s ease, --glow-blur 0.05s ease,
                      --glow-opacity 0.05s ease, --glow-scale 0.05s ease,
                      --glow-radius 0.05s ease;
        }

        @keyframes shadow-pulse {
          0%, 24%, 46%, 73%, 96% {
            --white-shadow: 0.5;
          }
          12%, 28%, 41%, 63%, 75%, 82%, 98% {
            --white-shadow: 2.5;
          }
          6%, 32%, 57% {
            --white-shadow: 1.3;
          }
          18%, 52%, 88% {
            --white-shadow: 3.5;
          }
        }

        @keyframes rotate-bg {
          0% {
            --bg-x: 0;
            --bg-y: 0;
          }
          25% {
            --bg-x: 100;
            --bg-y: 0;
          }
          50% {
            --bg-x: 100;
            --bg-y: 100;
          }
          75% {
            --bg-x: 0;
            --bg-y: 100;
          }
          100% {
            --bg-x: 0;
            --bg-y: 0;
          }
        }

        @keyframes rotate {
          from {
            --rotate: -70;
            --glow-translate-y: -65;
          }
          25% {
            --glow-translate-y: -65;
          }
          50% {
            --glow-translate-y: -65;
          }
          60%, 75% {
            --glow-translate-y: -65;
          }
          85% {
            --glow-translate-y: -65;
          }
          to {
            --rotate: calc(360 - 70);
            --glow-translate-y: -65;
          }
        }

        @keyframes hue-animation {
          0% {
            --hue: 0;
          }
          100% {
            --hue: 360;
          }
        }
      `}</style>

      <div className="glow-container">
        <span className="glow" />
        <div className="glow-shell">
          <div className={`glow-surface ${className}`}>{children}</div>
        </div>
      </div>
    </>
  )
}

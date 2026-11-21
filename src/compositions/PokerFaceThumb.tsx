import React from "react";
import { Img, staticFile } from "remotion";
import { COLORS, FONTS } from "../constants";

export const PokerFaceThumb: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: 1280,
        height: 720,
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        display: "flex",
      }}
    >
      {/* Subtle architectural grain / grid lines in negative space */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "60%",
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          zIndex: 1,
        }}
      />

      {/* Left 55%: Bold Typography & High-CTR Curiosity-Gap Copy */}
      <div
        style={{
          flex: 1.2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "80px",
          zIndex: 10,
        }}
      >
        {/* Category Pill with Stark Red Geometric Accent */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: COLORS.darkPill,
            color: COLORS.darkPillText,
            padding: "8px 18px",
            borderRadius: "6px",
            width: "fit-content",
            marginBottom: "24px",
          }}
        >
          {/* Stark Red Dot */}
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: COLORS.accentDot,
              boxShadow: "0 0 10px rgba(255, 59, 48, 0.8)",
            }}
          />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            BEHAVIORAL STRATEGY
          </span>
        </div>

        {/* Bold 3-Word Headline with High Visual Contrast */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: "88px",
              fontWeight: 950,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              color: COLORS.fg,
              textTransform: "uppercase",
            }}
          >
            NEVER
          </span>
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: "88px",
              fontWeight: 950,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              color: COLORS.fg,
              textTransform: "uppercase",
            }}
          >
            SHOW
          </span>
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: "96px",
              fontWeight: 950,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              color: COLORS.accentRed,
              textTransform: "uppercase",
            }}
          >
            FEAR.
          </span>
        </div>

        {/* Secondary Curiosity Subtext */}
        <div
          style={{
            marginTop: "28px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "2px",
              backgroundColor: COLORS.fg,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: "18px",
              fontWeight: 600,
              color: COLORS.muted,
              letterSpacing: "-0.01em",
            }}
          >
            The unreadable mind protocol
          </span>
        </div>
      </div>

      {/* Right 45%: Dramatic Close-Up Crop of Zyph in Real Clothing */}
      <div
        style={{
          flex: 0.8,
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 5,
        }}
      >
        {/* Soft 3D Ground Shadow */}
        <div
          style={{
            position: "absolute",
            bottom: "0%",
            width: "480px",
            height: "40px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(8px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Zyph Matte-Black Mannequin */}
        <Img
          src={staticFile("zyph/zyph_7.png")}
          alt="Zyph Mannequin Close Up"
          style={{
            position: "absolute",
            bottom: "-30px",
            right: "-40px",
            height: "115%",
            objectFit: "contain",
            mixBlendMode: "multiply", // Pure white blends seamlessly into canvas
            zIndex: 2,
            filter: "contrast(1.08) drop-shadow(-10px 10px 30px rgba(0, 0, 0, 0.08))",
          }}
        />

        {/* Stark Red Framing Edge Accent on the right boundary */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "40px",
            width: "36px",
            height: "36px",
            borderTop: `4px solid ${COLORS.accentRed}`,
            borderRight: `4px solid ${COLORS.accentRed}`,
            zIndex: 15,
          }}
        />
      </div>
    </div>
  );
};

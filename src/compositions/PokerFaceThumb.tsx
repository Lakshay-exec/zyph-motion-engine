import React from "react";
import { Img, staticFile } from "remotion";
import { GlitchSlice } from "../components/GlitchSlice";
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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 1. Massive Editorial Display Serif Background Typography: "POKER" */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.editorialSerif,
            fontSize: "270px",
            fontWeight: 900,
            letterSpacing: "0.08em",
            color: COLORS.fg,
            lineHeight: 0.85,
            textTransform: "uppercase",
            filter: "drop-shadow(0 14px 28px rgba(0, 0, 0, 0.32))",
          }}
        >
          POKER
        </span>
      </div>

      {/* 2. Graphic Code/Punctuation Accents: "||" and "!=" */}
      <div
        style={{
          position: "absolute",
          left: "280px",
          top: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 8,
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ width: "8px", height: "55px", backgroundColor: COLORS.fg }} />
          <div style={{ width: "8px", height: "55px", backgroundColor: COLORS.fg }} />
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <div style={{ width: "8px", height: "20px", backgroundColor: COLORS.fg }} />
          <div style={{ width: "8px", height: "20px", backgroundColor: COLORS.fg }} />
        </div>
      </div>

      {/* 3. Centerpiece: The Iconic Sliced Glitch Masked Mannequin */}
      <div
        style={{
          position: "relative",
          width: "720px",
          height: "640px",
          marginTop: "120px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        {/* Soft 3D Ground Shadow */}
        <div
          style={{
            position: "absolute",
            bottom: "0%",
            width: "560px",
            height: "40px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 72%)",
            filter: "blur(8px)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* The Exact POKER Slice-Glitch Artwork */}
        <Img
          src={staticFile("zyph/poker_glitch.png")}
          alt="Poker Face Glitch Mannequin"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            mixBlendMode: "multiply",
            zIndex: 15,
            filter: "contrast(1.06) brightness(0.99)",
          }}
        />
      </div>
    </div>
  );
};

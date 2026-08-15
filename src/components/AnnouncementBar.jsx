import { useState, useEffect } from "react";

const MESSAGES = [
  { text: "BUILT FOR THE ONES WHO NEVER FIT", prefix: "—" },
  { text: "FREE SHIPPING ON ORDERS OVER $100", prefix: "✦" },
  { text: "THE VILLAIN WORLD IS OPEN", prefix: "—" },
  { text: "CHAPTER ONE · NOW AVAILABLE", prefix: "✦" },
  { text: "WEAR IT LIKE A WARNING", prefix: "—" },
  { text: "LIMITED · INTENTIONAL · VILLAIN", prefix: "✦" },
];

function AnnouncementBar() {
  const [displayText, setDisplayText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [phase, setPhase] = useState("typing");
  const [glitch, setGlitch] = useState(false);
  const [flash, setFlash] = useState(false);

  // ── GLITCH EFFECT ──
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 80);
        setTimeout(() => {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 60);
        }, 120);
      }
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  // ── FLASH ON MESSAGE CHANGE ──
  useEffect(() => {
    if (phase === "typing" && displayText.length === 0) {
      setFlash(true);
      setTimeout(() => setFlash(false), 120);
    }
  }, [messageIndex]);

  // ── TYPEWRITER ──
  useEffect(() => {
    const currentMessage = MESSAGES[messageIndex].text;
    let timeout;

    if (phase === "typing") {
      if (displayText.length < currentMessage.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentMessage.slice(0, displayText.length + 1));
        }, 55);
      } else {
        timeout = setTimeout(() => setPhase("holding"), 2400);
      }
    }

    if (phase === "holding") {
      timeout = setTimeout(() => setPhase("erasing"), 300);
    }

    if (phase === "erasing") {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 22);
      } else {
        setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, messageIndex]);

  const currentPrefix = MESSAGES[messageIndex].prefix;

  return (
    <div
      style={{
        width: "100%",
        height: "32px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 300,
        overflow: "hidden",
        background: "#0A0A0A",
        borderBottom: "1px solid rgba(204,0,0,0.4)",
        transition: "background 0.06s ease",
      }}
    >
      {/* Red scan line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "#CC0000",
          opacity: 0.6,
        }}
      />

      {/* Content */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          position: "relative",
        }}
      >
        {/* Left decoration */}
        <span
          style={{
            fontFamily: "Special Elite",
            fontSize: "8px",
            color: "rgba(204,0,0,0.7)",
            letterSpacing: "2px",
            userSelect: "none",
          }}
        >
          {currentPrefix}
        </span>

        {/* Main text */}
        <p
          style={{
            fontFamily: "Special Elite",
            fontSize: "9px",
            letterSpacing: "5px",
            color: glitch ? "#CC0000" : flash ? "#0A0A0A" : "#F5F0E8",
            whiteSpace: "nowrap",
            transform: glitch
              ? `translateX(${Math.random() > 0.5 ? "2px" : "-2px"})`
              : "none",
            transition: glitch ? "none" : "color 0.1s ease",
            textShadow: glitch
              ? "2px 0 #CC0000, -2px 0 rgba(204,0,0,0.5)"
              : "none",
          }}
        >
          {displayText}
        </p>

        {/* Cursor */}
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#CC0000",
            flexShrink: 0,
            boxShadow: "0 0 6px rgba(204,0,0,0.8)",
            animation:
              phase === "holding"
                ? "dotPulse 0.8s ease-in-out infinite"
                : "none",
            opacity: phase === "holding" ? 1 : 0.4,
          }}
        />

        {/* Right decoration */}
        <span
          style={{
            fontFamily: "Special Elite",
            fontSize: "8px",
            color: "rgba(204,0,0,0.7)",
            letterSpacing: "2px",
            userSelect: "none",
          }}
        >
          {currentPrefix}
        </span>

        {/* Left edge line */}
        <div
          style={{
            position: "absolute",
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "1px",
            height: "14px",
            background: "rgba(204,0,0,0.3)",
          }}
        />

        {/* Right edge line */}
        <div
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "1px",
            height: "14px",
            background: "rgba(204,0,0,0.3)",
          }}
        />
      </div>

      <style>{`
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 6px rgba(204,0,0,0.8); }
          50% { transform: scale(1.4); opacity: 0.6; box-shadow: 0 0 12px rgba(204,0,0,1); }
        }
      `}</style>
    </div>
  );
}

export default AnnouncementBar;

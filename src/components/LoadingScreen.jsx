import { useEffect, useState } from "react";

function LoadingScreen({ onComplete }) {
  const [opacity, setOpacity] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Preload image before anything starts
    const img = new window.Image();
    img.src = "/mascot.png";
    img.onload = () => setImgLoaded(true);
    img.onerror = () => setImgLoaded(true);
  }, []);

  useEffect(() => {
    if (!imgLoaded) return;

    const fadeTimer = setTimeout(() => setOpacity(0), 2200);
    const removeTimer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 2900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [imgLoaded]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#030201",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        opacity,
        transition: "opacity 0.7s ease",
      }}
    >
      {/* Glow ring behind mascot */}
      <div
        style={{
          position: "relative",
          marginBottom: "32px",
          width: "120px",
          height: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(200,110,15,0.2)",
            animation: imgLoaded ? "ringPulse 2s ease-in-out infinite" : "none",
          }}
        />

        {/* Inner glow ring */}
        <div
          style={{
            position: "absolute",
            inset: "10px",
            borderRadius: "50%",
            border: "1px solid rgba(200,110,15,0.1)",
            animation: imgLoaded
              ? "ringPulse 2s ease-in-out infinite 0.3s"
              : "none",
          }}
        />

        {/* Mascot — smooth CSS spin using transform only ──
            key trick: use transform3d to force GPU rendering
            so it never drops frames or glitches */}
        <div
          style={{
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.4s ease",
            animation: imgLoaded ? "smoothSpin 3s linear infinite" : "none",
            willChange: "transform",
            transformOrigin: "center center",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <img
            src="/mascot.png"
            alt="Villain Culture"
            width="90"
            height="90"
            style={{
              width: "90px",
              height: "90px",
              objectFit: "contain",
              filter: "sepia(0.8) saturate(0.6) brightness(1.1)",
              display: "block",
              // Force GPU layer
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />
        </div>
      </div>

      {/* Brand name */}
      <p
        style={{
          fontFamily: "Metal Mania",
          fontSize: "18px",
          letterSpacing: "8px",
          color: "rgba(200,110,15,0.8)",
          marginBottom: "8px",
          opacity: imgLoaded ? 1 : 0,
          transition: "opacity 0.4s ease 0.1s",
        }}
      >
        VILLAIN CULTURE
      </p>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "Special Elite",
          fontSize: "8px",
          letterSpacing: "5px",
          color: "rgba(200,110,15,0.3)",
          marginBottom: "28px",
          opacity: imgLoaded ? 1 : 0,
          transition: "opacity 0.4s ease 0.2s",
        }}
      >
        EST 2026
      </p>

      {/* Loading bar */}
      <div
        style={{
          width: "120px",
          height: "1px",
          background: "rgba(200,110,15,0.1)",
          borderRadius: "999px",
          overflow: "hidden",
          opacity: imgLoaded ? 1 : 0,
          transition: "opacity 0.4s ease 0.3s",
        }}
      >
        <div
          style={{
            height: "100%",
            background:
              "linear-gradient(to right, rgba(200,110,15,0.4), rgba(200,110,15,0.9))",
            borderRadius: "999px",
            animation: imgLoaded ? "loadBar 2.2s ease forwards" : "none",
          }}
        />
      </div>

      <style>{`
        @keyframes smoothSpin {
          0%   { transform: rotate3d(0, 1, 0, 0deg); }
          100% { transform: rotate3d(0, 1, 0, 360deg); }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.3; transform: scale(1);    }
          50%       { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes loadBar {
          0%   { width: 0%;   }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;

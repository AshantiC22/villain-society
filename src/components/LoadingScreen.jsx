import { useEffect, useState } from "react";

function LoadingScreen({ onComplete }) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 2000);

    // Remove completely after fade
    const removeTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

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
        transition: "opacity 0.6s ease",
      }}
    >
      {/* 3D spinning mascot */}
      <div
        style={{
          animation: "spin3d 2s linear infinite",
          marginBottom: "32px",
        }}
      >
        <img
          src="/mascot.png"
          alt="Villain Culture"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            filter: "sepia(0.8) saturate(0.6) brightness(1.1)",
          }}
        />
      </div>

      {/* Brand name */}
      <p
        style={{
          fontFamily: "Metal Mania",
          fontSize: "18px",
          letterSpacing: "8px",
          color: "rgba(200,110,15,0.8)",
          marginBottom: "24px",
        }}
      >
        VILLAIN CULTURE
      </p>

      {/* Loading bar */}
      <div
        style={{
          width: "120px",
          height: "1px",
          background: "rgba(200,110,15,0.15)",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "rgba(200,110,15,0.8)",
            borderRadius: "999px",
            animation: "loadBar 2s ease forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes spin3d {
          0% { transform: perspective(400px) rotateY(0deg); }
          100% { transform: perspective(400px) rotateY(360deg); }
        }
        @keyframes loadBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;

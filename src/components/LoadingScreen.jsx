import { useEffect, useState } from "react";

function LoadingScreen({ onComplete }) {
  const [opacity, setOpacity] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Preload image first
    const img = new window.Image();
    img.src = "/mascot.png";
    img.onload = () => setImgLoaded(true);
    img.onerror = () => setImgLoaded(true); // show anyway if error
  }, []);

  useEffect(() => {
    if (!imgLoaded) return;

    // Only start timer AFTER image is loaded
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 2000);

    const removeTimer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 2700);

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
      {/* Mascot — only animates after loaded */}
      <div
        style={{
          marginBottom: "32px",
          opacity: imgLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
          animation: imgLoaded ? "spin3d 2s linear infinite" : "none",
          willChange: "transform",
        }}
      >
        <img
          src="/mascot.png"
          alt="Villain Culture"
          width="100"
          height="100"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            filter: "sepia(0.8) saturate(0.6) brightness(1.1)",
            display: "block",
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
          opacity: imgLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        VILLAIN CULTURE
      </p>

      {/* Loading bar — only starts after image loaded */}
      <div
        style={{
          width: "120px",
          height: "1px",
          background: "rgba(200,110,15,0.15)",
          borderRadius: "999px",
          overflow: "hidden",
          opacity: imgLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "rgba(200,110,15,0.8)",
            borderRadius: "999px",
            width: imgLoaded ? undefined : "0%",
            animation: imgLoaded ? "loadBar 2s ease forwards" : "none",
          }}
        />
      </div>

      <style>{`
        @keyframes spin3d {
          0%   { transform: perspective(400px) rotateY(0deg);   }
          100% { transform: perspective(400px) rotateY(360deg); }
        }
        @keyframes loadBar {
          0%   { width: 0%;    }
          100% { width: 100%;  }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;

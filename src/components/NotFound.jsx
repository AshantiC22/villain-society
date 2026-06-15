import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#030201",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          pointerEvents: "none",
        }}
      />

      {/* Mascot */}
      <img
        src="/mascot.png"
        alt="Villain Society"
        style={{
          width: "120px",
          height: "120px",
          objectFit: "contain",
          opacity: 0.3,
          filter: "sepia(0.8) saturate(0.6) brightness(1.1)",
          marginBottom: "32px",
        }}
      />

      {/* 404 */}
      <p
        style={{
          fontFamily: "Metal Mania",
          fontSize: "clamp(80px, 15vw, 140px)",
          letterSpacing: "0.1em",
          color: "rgba(200,110,15,0.15)",
          lineHeight: 1,
          marginBottom: "0px",
          position: "absolute",
          userSelect: "none",
        }}
      >
        404
      </p>

      {/* Title */}
      <h1
        style={{
          fontFamily: "Metal Mania",
          fontSize: "clamp(28px, 5vw, 48px)",
          letterSpacing: "0.2em",
          color: "rgba(245,240,232,0.95)",
          lineHeight: 1.1,
          textAlign: "center",
          marginBottom: "16px",
          zIndex: 2,
        }}
      >
        YOU ARE <span style={{ color: "rgba(200,110,15,1)" }}>LOST</span>
      </h1>

      {/* Divider */}
      <div
        style={{
          width: "40px",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(200,110,15,0.7), transparent)",
          margin: "0 auto 16px",
          zIndex: 2,
        }}
      />

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "Special Elite",
          fontSize: "12px",
          letterSpacing: "4px",
          color: "rgba(245,240,232,0.25)",
          textAlign: "center",
          marginBottom: "48px",
          zIndex: 2,
          maxWidth: "320px",
          lineHeight: 1.8,
        }}
      >
        This page does not exist in Villain World.
        <br />
        Even villains get lost sometimes.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          fontFamily: "Special Elite",
          fontSize: "11px",
          letterSpacing: "5px",
          padding: "16px 40px",
          borderRadius: "12px",
          border: "1px solid rgba(200,110,15,0.4)",
          cursor: "pointer",
          background: "transparent",
          color: "rgba(200,110,15,0.8)",
          transition: "all 0.3s ease",
          zIndex: 2,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(200,95,8,0.9)";
          e.currentTarget.style.color = "rgba(5,3,1,0.95)";
          e.currentTarget.style.borderColor = "rgba(200,95,8,0.9)";
          e.currentTarget.style.boxShadow = "0 0 30px rgba(200,110,15,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "rgba(200,110,15,0.8)";
          e.currentTarget.style.borderColor = "rgba(200,110,15,0.4)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        RETURN TO VILLAIN Society
      </button>

      {/* Bottom text */}
      <p
        style={{
          position: "absolute",
          bottom: "24px",
          fontFamily: "Special Elite",
          fontSize: "9px",
          letterSpacing: "5px",
          color: "rgba(245,240,232,0.08)",
          zIndex: 2,
        }}
      >
        VILLAIN CULTURE · EST 2026
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default NotFound;

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect, useRef } from "react";

function VillainEye() {
  const { totalItems } = useCart();
  const hasItems = totalItems > 0;
  const [isBlinking, setIsBlinking] = useState(false);
  const [eyeHeight, setEyeHeight] = useState(12);
  const prevCount = useRef(totalItems);

  // Color based on item count
  const getColor = () => {
    if (totalItems === 0) return "rgba(200,110,15,0.7)";
    if (totalItems === 1) return "rgba(200,0,0,0.8)";
    if (totalItems === 2) return "rgba(200,0,0,0.9)";
    return "#CC0000";
  };

  const getGlow = () => {
    if (totalItems === 0) return "drop-shadow(0 0 4px rgba(200,110,15,0.3))";
    if (totalItems === 1) return "drop-shadow(0 0 6px rgba(200,0,0,0.6))";
    if (totalItems === 2) return "drop-shadow(0 0 10px rgba(200,0,0,0.8))";
    return "drop-shadow(0 0 14px rgba(200,0,0,1))";
  };

  const color = getColor();
  const glow = getGlow();

  // Trigger blink when item count increases
  useEffect(() => {
    if (totalItems > prevCount.current) {
      // Start blink sequence
      setIsBlinking(true);

      // Close eye
      setTimeout(() => setEyeHeight(1), 0);
      // Open eye
      setTimeout(() => setEyeHeight(12), 300);
      // Close again
      setTimeout(() => setEyeHeight(1), 600);
      // Open final
      setTimeout(() => {
        setEyeHeight(12);
        setIsBlinking(false);
      }, 900);
    }
    prevCount.current = totalItems;
  }, [totalItems]);

  return (
    <Link
      to="/cart"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        cursor: "pointer",
        width: "44px",
        height: "44px",
      }}
    >
      {/* Eye SVG */}
      <svg
        width="40"
        height="28"
        viewBox="0 0 40 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: "filter 0.3s ease",
          filter: glow,
          overflow: "visible",
        }}
      >
        {/* Outer eye shape — top lid */}
        <path
          d={`M2 14 C10 ${14 - eyeHeight}, 30 ${14 - eyeHeight}, 38 14`}
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          style={{ transition: "d 0.15s ease" }}
        />

        {/* Outer eye shape — bottom lid */}
        <path
          d={`M2 14 C10 ${14 + eyeHeight}, 30 ${14 + eyeHeight}, 38 14`}
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          style={{ transition: "d 0.15s ease" }}
        />

        {/* Iris */}
        <ellipse
          cx="20"
          cy="14"
          rx="7"
          ry={Math.min(7, eyeHeight * 0.8)}
          stroke={color}
          strokeWidth="1"
          fill="rgba(0,0,0,0.6)"
          style={{ transition: "all 0.15s ease" }}
        />

        {/* Pupil */}
        <ellipse
          cx="20"
          cy="14"
          rx="3.5"
          ry={Math.min(3.5, eyeHeight * 0.4)}
          fill={color}
          style={{ transition: "all 0.15s ease" }}
        />

        {/* Shine */}
        {eyeHeight > 4 && (
          <circle cx="22" cy="11" r="1" fill="rgba(245,240,232,0.4)" />
        )}

        {/* Eyelashes top */}
        {eyeHeight > 6 && (
          <>
            <line
              x1="20"
              y1={14 - eyeHeight}
              x2="20"
              y2={14 - eyeHeight - 4}
              stroke={color}
              strokeWidth="0.8"
              opacity="0.6"
            />
            <line
              x1="13"
              y1={14 - eyeHeight + 3}
              x2="11"
              y2={14 - eyeHeight - 1}
              stroke={color}
              strokeWidth="0.8"
              opacity="0.6"
            />
            <line
              x1="27"
              y1={14 - eyeHeight + 3}
              x2="29"
              y2={14 - eyeHeight - 1}
              stroke={color}
              strokeWidth="0.8"
              opacity="0.6"
            />
            <line
              x1="16"
              y1={14 - eyeHeight + 1}
              x2="15"
              y2={14 - eyeHeight - 3}
              stroke={color}
              strokeWidth="0.8"
              opacity="0.5"
            />
            <line
              x1="24"
              y1={14 - eyeHeight + 1}
              x2="25"
              y2={14 - eyeHeight - 3}
              stroke={color}
              strokeWidth="0.8"
              opacity="0.5"
            />
          </>
        )}

        {/* Corner lines */}
        <line
          x1="2"
          y1="14"
          x2="0"
          y2="14"
          stroke={color}
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="38"
          y1="14"
          x2="40"
          y2="14"
          stroke={color}
          strokeWidth="0.8"
          opacity="0.4"
        />
      </svg>

      {/* Item count badge */}
      {totalItems > 0 && (
        <span
          style={{
            position: "absolute",
            top: "2px",
            right: "0px",
            background: "#CC0000",
            color: "white",
            borderRadius: "50%",
            width: "16px",
            height: "16px",
            fontSize: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Special Elite",
            boxShadow: "0 0 8px rgba(200,0,0,0.8)",
            animation: "badgePulse 2s infinite",
          }}
        >
          {totalItems}
        </span>
      )}

      <style>{`
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 8px rgba(200,0,0,0.6); }
          50% { box-shadow: 0 0 16px rgba(200,0,0,1); transform: scale(1.1); }
        }
      `}</style>
    </Link>
  );
}

export default VillainEye;

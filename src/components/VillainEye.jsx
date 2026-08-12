import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect, useRef, useCallback } from "react";

function VillainEye() {
  const { totalItems } = useCart();
  const [eyeHeight, setEyeHeight] = useState(12);
  const [pupilX, setPupilX] = useState(20);
  const [pupilY, setPupilY] = useState(14);
  const prevCount = useRef(0);
  const timerRef = useRef(null);
  const isReactingRef = useRef(false);

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

  // ── STOP ALL MOVEMENT ──
  const stopMovement = useCallback(() => {
    isReactingRef.current = true;
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  // ── RESET TO CENTER ──
  const resetToCenter = useCallback(() => {
    setPupilX(20);
    setPupilY(14);
    setEyeHeight(12);
  }, []);

  // ── BLINK HELPER — closes lid over eyeball ──
  const blink = useCallback((speed = 80) => {
    return new Promise((resolve) => {
      setEyeHeight(6);
      setTimeout(() => setEyeHeight(1), speed);
      setTimeout(() => setEyeHeight(6), speed * 2);
      setTimeout(() => {
        setEyeHeight(12);
        resolve();
      }, speed * 3);
    });
  }, []);

  // ── AUTONOMOUS BEHAVIORS ──
  const runBehavior = useCallback(() => {
    if (isReactingRef.current) return;

    const behaviors = [
      // Natural blink — lid closes over eye
      (done) => {
        setEyeHeight(6);
        setTimeout(() => setEyeHeight(1), 60);
        setTimeout(() => setEyeHeight(6), 120);
        setTimeout(() => {
          setEyeHeight(12);
          done();
        }, 180);
      },

      // Double blink
      (done) => {
        setEyeHeight(1);
        setTimeout(() => setEyeHeight(12), 100);
        setTimeout(() => setEyeHeight(1), 200);
        setTimeout(() => setEyeHeight(12), 300);
        setTimeout(done, 400);
      },

      // Look left — lid dips slightly while moving
      (done) => {
        setEyeHeight(8);
        setPupilX(14);
        setTimeout(() => setEyeHeight(12), 100);
        setTimeout(() => {
          setPupilX(20);
          done();
        }, 900);
      },

      // Look right — lid dips slightly while moving
      (done) => {
        setEyeHeight(8);
        setPupilX(26);
        setTimeout(() => setEyeHeight(12), 100);
        setTimeout(() => {
          setPupilX(20);
          done();
        }, 900);
      },

      // Look up
      (done) => {
        setEyeHeight(8);
        setPupilY(10);
        setTimeout(() => setEyeHeight(12), 100);
        setTimeout(() => {
          setPupilY(14);
          done();
        }, 800);
      },

      // Look down — lid follows down
      (done) => {
        setEyeHeight(9);
        setPupilY(18);
        setTimeout(() => setEyeHeight(12), 100);
        setTimeout(() => {
          setPupilY(14);
          done();
        }, 800);
      },

      // Suspicious — look left then right fast
      (done) => {
        setEyeHeight(7);
        setPupilX(13);
        setTimeout(() => setPupilX(27), 400);
        setTimeout(() => {
          setPupilX(20);
          setEyeHeight(12);
          done();
        }, 800);
      },

      // Squint — lid half closes
      (done) => {
        setEyeHeight(5);
        setTimeout(() => {
          setEyeHeight(12);
          done();
        }, 1200);
      },

      // Dart around — lid dips on each move
      (done) => {
        setEyeHeight(7);
        setPupilX(24);
        setPupilY(10);
        setTimeout(() => {
          setEyeHeight(7);
          setPupilX(15);
          setPupilY(18);
        }, 250);
        setTimeout(() => {
          setEyeHeight(12);
          setPupilX(20);
          setPupilY(14);
          done();
        }, 550);
      },

      // Wide open — surprised
      (done) => {
        setEyeHeight(14);
        setTimeout(() => {
          setEyeHeight(12);
          done();
        }, 600);
      },

      // Slow blink — sleepy
      (done) => {
        setEyeHeight(8);
        setTimeout(() => setEyeHeight(3), 150);
        setTimeout(() => setEyeHeight(8), 400);
        setTimeout(() => {
          setEyeHeight(12);
          done();
        }, 600);
      },
    ];

    const random = behaviors[Math.floor(Math.random() * behaviors.length)];

    random(() => {
      if (!isReactingRef.current) {
        const delay = 800 + Math.random() * 2500;
        timerRef.current = setTimeout(runBehavior, delay);
      }
    });
  }, []);

  // ── START LOOP ──
  useEffect(() => {
    timerRef.current = setTimeout(runBehavior, 1500);
    return () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [runBehavior]);

  // ── REACT TO ITEM ADDED ──
  useEffect(() => {
    if (totalItems > prevCount.current) {
      stopMovement();
      resetToCenter();

      // Shock — wide open
      setTimeout(() => setEyeHeight(14), 50);

      // Lid closes then opens — processing
      setTimeout(() => setEyeHeight(6), 200);
      setTimeout(() => setEyeHeight(1), 280);
      setTimeout(() => setEyeHeight(12), 360);

      // Look down at cart
      setTimeout(() => {
        setEyeHeight(9);
        setPupilY(18);
      }, 500);

      // Blink again
      setTimeout(() => setEyeHeight(1), 800);
      setTimeout(() => setEyeHeight(12), 900);

      // Look left then right
      setTimeout(() => {
        setEyeHeight(8);
        setPupilX(14);
      }, 1100);
      setTimeout(() => setPupilX(26), 1400);
      setTimeout(() => {
        setEyeHeight(12);
        setPupilX(20);
      }, 1700);

      // Settle back
      setTimeout(() => setPupilY(14), 1800);

      // Final blink
      setTimeout(() => setEyeHeight(1), 2000);
      setTimeout(() => setEyeHeight(12), 2100);

      // Resume
      setTimeout(() => {
        isReactingRef.current = false;
        timerRef.current = setTimeout(runBehavior, 1000);
      }, 2400);
    }

    prevCount.current = totalItems;
  }, [totalItems, stopMovement, resetToCenter, runBehavior]);

  // ── CLIP PATH for lid covering eyeball ──
  const topLidY = 14 - eyeHeight;
  const bottomLidY = 14 + eyeHeight;
  const clipId = "eyeClip";

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
        <defs>
          {/* Clip path shaped by eyelids — hides pupil when lid closes */}
          <clipPath id={clipId}>
            <path
              d={`
                M2 14
                C10 ${topLidY}, 30 ${topLidY}, 38 14
                C30 ${bottomLidY}, 10 ${bottomLidY}, 2 14
                Z
              `}
            />
          </clipPath>
        </defs>

        {/* Top lid */}
        <path
          d={`M2 14 C10 ${topLidY}, 30 ${topLidY}, 38 14`}
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          style={{ transition: "d 0.08s ease" }}
        />

        {/* Bottom lid */}
        <path
          d={`M2 14 C10 ${bottomLidY}, 30 ${bottomLidY}, 38 14`}
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          style={{ transition: "d 0.08s ease" }}
        />

        {/* Eyeball group — clipped by lids */}
        <g clipPath={`url(#${clipId})`}>
          {/* Iris */}
          <ellipse
            cx={pupilX}
            cy={pupilY}
            rx="7"
            ry={Math.min(7, eyeHeight * 0.8)}
            stroke={color}
            strokeWidth="1"
            fill="rgba(0,0,0,0.6)"
            style={{
              transition: "cx 0.15s ease, cy 0.15s ease, ry 0.08s ease",
            }}
          />

          {/* Pupil */}
          <ellipse
            cx={pupilX}
            cy={pupilY}
            rx="3.5"
            ry={Math.min(3.5, eyeHeight * 0.4)}
            fill={color}
            style={{
              transition: "cx 0.15s ease, cy 0.15s ease, ry 0.08s ease",
            }}
          />

          {/* Shine */}
          {eyeHeight > 4 && (
            <circle
              cx={pupilX + 2}
              cy={pupilY - 3}
              r="1"
              fill="rgba(245,240,232,0.5)"
              style={{ transition: "cx 0.15s ease, cy 0.15s ease" }}
            />
          )}
        </g>

        {/* Eyelashes — outside clip so always visible */}
        {eyeHeight > 6 && (
          <>
            <line
              x1="20"
              y1={topLidY}
              x2="20"
              y2={topLidY - 4}
              stroke={color}
              strokeWidth="0.8"
              opacity="0.6"
            />
            <line
              x1="13"
              y1={topLidY + 3}
              x2="11"
              y2={topLidY - 1}
              stroke={color}
              strokeWidth="0.8"
              opacity="0.6"
            />
            <line
              x1="27"
              y1={topLidY + 3}
              x2="29"
              y2={topLidY - 1}
              stroke={color}
              strokeWidth="0.8"
              opacity="0.6"
            />
            <line
              x1="16"
              y1={topLidY + 1}
              x2="15"
              y2={topLidY - 3}
              stroke={color}
              strokeWidth="0.8"
              opacity="0.5"
            />
            <line
              x1="24"
              y1={topLidY + 1}
              x2="25"
              y2={topLidY - 3}
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

      {/* Badge */}
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

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

  // ── AUTONOMOUS BEHAVIORS ──
  const runBehavior = useCallback(() => {
    // Do not run if reacting to cart
    if (isReactingRef.current) return;

    const behaviors = [
      // Natural blink
      (done) => {
        setEyeHeight(8);
        setTimeout(() => setEyeHeight(2), 80);
        setTimeout(() => setEyeHeight(8), 180);
        setTimeout(() => {
          setEyeHeight(12);
          done();
        }, 260);
      },

      // Double blink
      (done) => {
        setEyeHeight(2);
        setTimeout(() => setEyeHeight(12), 120);
        setTimeout(() => setEyeHeight(2), 280);
        setTimeout(() => setEyeHeight(12), 400);
        setTimeout(done, 500);
      },

      // Look left
      (done) => {
        setPupilX(15);
        setTimeout(() => {
          setPupilX(20);
          done();
        }, 1200);
      },

      // Look right
      (done) => {
        setPupilX(25);
        setTimeout(() => {
          setPupilX(20);
          done();
        }, 1200);
      },

      // Look up
      (done) => {
        setPupilY(11);
        setTimeout(() => {
          setPupilY(14);
          done();
        }, 900);
      },

      // Look down
      (done) => {
        setPupilY(17);
        setTimeout(() => {
          setPupilY(14);
          done();
        }, 900);
      },

      // Suspicious — left then right
      (done) => {
        setPupilX(14);
        setTimeout(() => setPupilX(26), 600);
        setTimeout(() => setPupilX(20), 1200);
        setTimeout(done, 1400);
      },

      // Squint
      (done) => {
        setEyeHeight(5);
        setTimeout(() => {
          setEyeHeight(12);
          done();
        }, 1500);
      },

      // Dart around
      (done) => {
        setPupilX(24);
        setPupilY(11);
        setTimeout(() => {
          setPupilX(16);
          setPupilY(17);
        }, 300);
        setTimeout(() => {
          setPupilX(20);
          setPupilY(14);
          done();
        }, 700);
      },

      // Wide open
      (done) => {
        setEyeHeight(14);
        setTimeout(() => {
          setEyeHeight(12);
          done();
        }, 800);
      },

      // Long stare
      (done) => {
        setPupilX(23);
        setTimeout(() => {
          setPupilX(20);
          done();
        }, 2500);
      },

      // Sleepy
      (done) => {
        setEyeHeight(6);
        setTimeout(() => setEyeHeight(4), 400);
        setTimeout(() => setEyeHeight(12), 800);
        setTimeout(done, 1000);
      },
    ];

    const random = behaviors[Math.floor(Math.random() * behaviors.length)];

    random(() => {
      // Only schedule next if still not reacting
      if (!isReactingRef.current) {
        const delay = 1500 + Math.random() * 4000;
        timerRef.current = setTimeout(runBehavior, delay);
      }
    });
  }, []);

  // ── START AUTONOMOUS LOOP ──
  useEffect(() => {
    timerRef.current = setTimeout(runBehavior, 2000);
    return () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [runBehavior]);

  // ── REACT TO ITEM ADDED ──
  useEffect(() => {
    if (totalItems > prevCount.current) {
      // STOP everything immediately
      stopMovement();
      resetToCenter();

      // Stage 1 — wide open shock
      setTimeout(() => setEyeHeight(14), 50);

      // Stage 2 — look down at cart
      setTimeout(() => {
        setEyeHeight(12);
        setPupilY(18);
      }, 250);

      // Stage 3 — slow blink processing
      setTimeout(() => setEyeHeight(2), 750);
      setTimeout(() => setEyeHeight(12), 950);

      // Stage 4 — look left then right
      setTimeout(() => setPupilX(15), 1150);
      setTimeout(() => setPupilX(25), 1550);
      setTimeout(() => setPupilX(20), 1950);

      // Stage 5 — look back forward
      setTimeout(() => setPupilY(14), 2050);

      // Stage 6 — final calm blink
      setTimeout(() => setEyeHeight(2), 2250);
      setTimeout(() => setEyeHeight(12), 2450);

      // Stage 7 — resume autonomous
      setTimeout(() => {
        isReactingRef.current = false;
        timerRef.current = setTimeout(runBehavior, 1500);
      }, 2900);
    }

    prevCount.current = totalItems;
  }, [totalItems, stopMovement, resetToCenter, runBehavior]);

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
        {/* Top lid */}
        <path
          d={`M2 14 C10 ${14 - eyeHeight}, 30 ${14 - eyeHeight}, 38 14`}
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          style={{ transition: "d 0.12s ease" }}
        />

        {/* Bottom lid */}
        <path
          d={`M2 14 C10 ${14 + eyeHeight}, 30 ${14 + eyeHeight}, 38 14`}
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          style={{ transition: "d 0.12s ease" }}
        />

        {/* Iris */}
        <ellipse
          cx={pupilX}
          cy={pupilY}
          rx="7"
          ry={Math.min(7, eyeHeight * 0.8)}
          stroke={color}
          strokeWidth="1"
          fill="rgba(0,0,0,0.6)"
          style={{ transition: "cx 0.25s ease, cy 0.25s ease, ry 0.12s ease" }}
        />

        {/* Pupil */}
        <ellipse
          cx={pupilX}
          cy={pupilY}
          rx="3.5"
          ry={Math.min(3.5, eyeHeight * 0.4)}
          fill={color}
          style={{ transition: "cx 0.25s ease, cy 0.25s ease, ry 0.12s ease" }}
        />

        {/* Shine follows pupil */}
        {eyeHeight > 4 && (
          <circle
            cx={pupilX + 2}
            cy={pupilY - 3}
            r="1"
            fill="rgba(245,240,232,0.5)"
            style={{ transition: "cx 0.25s ease, cy 0.25s ease" }}
          />
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

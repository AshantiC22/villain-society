import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect, useRef, useCallback } from "react";

function VillainEye() {
  const { totalItems } = useCart();
  const [eyeHeight, setEyeHeight] = useState(12);
  const [pupilX, setPupilX] = useState(20);
  const [pupilY, setPupilY] = useState(14);
  const [mood, setMood] = useState("calm");
  const [shake, setShake] = useState(false);
  const [bloodshot, setBloodshot] = useState(false);
  const prevCount = useRef(0);
  const timerRef = useRef(null);
  const isReactingRef = useRef(false);

  const getColor = () => {
    if (mood === "furious") return "#FF0000";
    if (mood === "angry") return "#CC0000";
    return "rgba(200,110,15,0.7)";
  };

  const getGlow = () => {
    if (mood === "furious")
      return `
      drop-shadow(0 0 20px rgba(255,0,0,1))
      drop-shadow(0 0 10px rgba(255,0,0,0.9))
      drop-shadow(0 0 4px rgba(255,0,0,0.8))
    `;
    if (mood === "angry") return "drop-shadow(0 0 10px rgba(200,0,0,0.8))";
    return "drop-shadow(0 0 4px rgba(200,110,15,0.3))";
  };

  const color = getColor();
  const glow = getGlow();

  const stopMovement = useCallback(() => {
    isReactingRef.current = true;
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const resetToCenter = useCallback(() => {
    setPupilX(20);
    setPupilY(14);
    setEyeHeight(12);
  }, []);

  // ── CALM BEHAVIORS ──
  const calmBehaviors = [
    (done) => {
      setEyeHeight(7);
      setTimeout(() => setEyeHeight(1), 50);
      setTimeout(() => setEyeHeight(7), 110);
      setTimeout(() => {
        setEyeHeight(12);
        done();
      }, 160);
    },
    (done) => {
      setEyeHeight(1);
      setTimeout(() => setEyeHeight(12), 80);
      setTimeout(() => setEyeHeight(1), 160);
      setTimeout(() => setEyeHeight(12), 240);
      setTimeout(done, 300);
    },
    (done) => {
      setEyeHeight(10);
      setPupilX(13);
      setTimeout(() => setEyeHeight(12), 80);
      setTimeout(() => {
        setPupilX(20);
        done();
      }, 700);
    },
    (done) => {
      setEyeHeight(10);
      setPupilX(27);
      setTimeout(() => setEyeHeight(12), 80);
      setTimeout(() => {
        setPupilX(20);
        done();
      }, 700);
    },
    (done) => {
      setEyeHeight(10);
      setPupilY(10);
      setTimeout(() => setEyeHeight(12), 80);
      setTimeout(() => {
        setPupilY(14);
        done();
      }, 600);
    },
    (done) => {
      setPupilY(17);
      setEyeHeight(10);
      setTimeout(() => setEyeHeight(12), 100);
      setTimeout(() => {
        setPupilY(14);
        done();
      }, 700);
    },
    (done) => {
      setEyeHeight(5);
      setTimeout(() => setEyeHeight(3), 300);
      setTimeout(() => setEyeHeight(14), 600);
      setTimeout(() => {
        setEyeHeight(12);
        done();
      }, 750);
    },
    (done) => {
      setPupilX(22);
      setPupilY(12);
      setTimeout(() => {
        setPupilX(18);
        setPupilY(15);
      }, 180);
      setTimeout(() => {
        setPupilX(20);
        setPupilY(14);
        done();
      }, 380);
    },
    (done) => {
      setPupilX(24);
      setTimeout(() => {
        setEyeHeight(1);
        setTimeout(() => setEyeHeight(12), 80);
        setTimeout(() => {
          setPupilX(20);
          done();
        }, 200);
      }, 1800);
    },
    (done) => {
      setEyeHeight(8);
      setTimeout(() => setEyeHeight(4), 200);
      setTimeout(() => setEyeHeight(8), 500);
      setTimeout(() => {
        setEyeHeight(12);
        done();
      }, 700);
    },
  ];

  // ── ANGRY BEHAVIORS ──
  const angryBehaviors = [
    (done) => {
      let c = 0;
      const b = () => {
        setEyeHeight(1);
        setTimeout(() => {
          setEyeHeight(12);
          c++;
          if (c < 4) setTimeout(b, 45);
          else done();
        }, 30);
      };
      b();
    },
    (done) => {
      setEyeHeight(6);
      setPupilX(8);
      setTimeout(() => setPupilX(32), 150);
      setTimeout(() => setPupilX(8), 300);
      setTimeout(() => {
        setPupilX(20);
        setEyeHeight(12);
        done();
      }, 450);
    },
    (done) => {
      setEyeHeight(3);
      setTimeout(() => {
        setEyeHeight(12);
        done();
      }, 1000);
    },
    (done) => {
      setPupilY(8);
      setTimeout(() => setPupilY(20), 120);
      setTimeout(() => setPupilY(8), 240);
      setTimeout(() => {
        setPupilY(14);
        done();
      }, 400);
    },
    (done) => {
      setEyeHeight(16);
      setTimeout(() => setEyeHeight(2), 150);
      setTimeout(() => setEyeHeight(16), 300);
      setTimeout(() => setEyeHeight(2), 450);
      setTimeout(() => {
        setEyeHeight(12);
        done();
      }, 650);
    },
    (done) => {
      setPupilX(28);
      setEyeHeight(7);
      setTimeout(() => {
        setEyeHeight(1);
        setTimeout(() => {
          setEyeHeight(12);
          setPupilX(20);
          done();
        }, 80);
      }, 900);
    },
  ];

  // ── FURIOUS BEHAVIORS ──
  const furiousBehaviors = [
    (done) => {
      let c = 0;
      const b = () => {
        setEyeHeight(1);
        setTimeout(() => {
          setEyeHeight(14);
          c++;
          if (c < 8) setTimeout(b, 40);
          else done();
        }, 25);
      };
      b();
    },
    (done) => {
      setEyeHeight(5);
      setPupilX(6);
      setTimeout(() => setPupilX(34), 80);
      setTimeout(() => setPupilX(6), 160);
      setTimeout(() => setPupilX(34), 240);
      setTimeout(() => setPupilX(6), 320);
      setTimeout(() => {
        setPupilX(20);
        setEyeHeight(12);
        done();
      }, 440);
    },
    (done) => {
      setEyeHeight(16);
      setTimeout(() => setEyeHeight(1), 60);
      setTimeout(() => setEyeHeight(16), 100);
      setTimeout(() => setEyeHeight(1), 160);
      setTimeout(() => setEyeHeight(16), 200);
      setTimeout(() => setEyeHeight(1), 260);
      setTimeout(() => setEyeHeight(16), 300);
      setTimeout(() => {
        setEyeHeight(12);
        done();
      }, 500);
    },
    (done) => {
      const twitch = (count) => {
        if (count <= 0) {
          done();
          return;
        }
        setPupilX(20 + (Math.random() > 0.5 ? 10 : -10));
        setPupilY(14 + (Math.random() > 0.5 ? 6 : -6));
        setTimeout(() => {
          setPupilX(20);
          setPupilY(14);
          setTimeout(() => twitch(count - 1), 30);
        }, 60);
      };
      twitch(8);
    },
    (done) => {
      setEyeHeight(7);
      setPupilX(11);
      setPupilY(9);
      setTimeout(() => {
        setPupilX(29);
        setPupilY(9);
      }, 100);
      setTimeout(() => {
        setPupilX(29);
        setPupilY(19);
      }, 200);
      setTimeout(() => {
        setPupilX(11);
        setPupilY(19);
      }, 300);
      setTimeout(() => {
        setPupilX(11);
        setPupilY(9);
      }, 400);
      setTimeout(() => {
        setPupilX(20);
        setPupilY(14);
        setEyeHeight(12);
        done();
      }, 550);
    },
    (done) => {
      setEyeHeight(8);
      setPupilX(10);
      setPupilY(9);
      setTimeout(() => {
        setPupilX(30);
        setPupilY(19);
      }, 80);
      setTimeout(() => {
        setPupilX(10);
        setPupilY(19);
      }, 160);
      setTimeout(() => {
        setPupilX(30);
        setPupilY(9);
      }, 240);
      setTimeout(() => {
        setPupilX(10);
        setPupilY(9);
      }, 320);
      setTimeout(() => {
        setPupilX(20);
        setPupilY(14);
        setEyeHeight(12);
        done();
      }, 440);
    },
    (done) => {
      setEyeHeight(2);
      setPupilX(20);
      setTimeout(() => {
        setEyeHeight(16);
        setTimeout(() => {
          setEyeHeight(12);
          done();
        }, 300);
      }, 800);
    },
  ];

  // ── RUN BEHAVIOR ──
  const runBehavior = useCallback(() => {
    if (isReactingRef.current) return;

    const currentMood = mood;
    let behaviors;

    if (currentMood === "furious") behaviors = furiousBehaviors;
    else if (currentMood === "angry") behaviors = angryBehaviors;
    else behaviors = calmBehaviors;

    const random = behaviors[Math.floor(Math.random() * behaviors.length)];

    const delay =
      currentMood === "furious"
        ? 100 + Math.random() * 250
        : currentMood === "angry"
          ? 300 + Math.random() * 600
          : 600 + Math.random() * 1900;

    random(() => {
      if (!isReactingRef.current) {
        timerRef.current = setTimeout(runBehavior, delay);
      }
    });
  }, [mood]);

  // ── START LOOP ──
  useEffect(() => {
    timerRef.current = setTimeout(runBehavior, 800);
    return () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [runBehavior]);

  // ── CART REACTION ──
  useEffect(() => {
    const prev = prevCount.current;

    if (totalItems > prev) {
      stopMovement();
      resetToCenter();

      setShake(true);
      setTimeout(() => setShake(false), 600);

      setBloodshot(true);
      setTimeout(() => setBloodshot(false), 3000);

      if (totalItems === 1) {
        setMood("angry");
        setEyeHeight(16);
        setTimeout(() => setEyeHeight(1), 100);
        setTimeout(() => setEyeHeight(16), 160);
        setTimeout(() => setEyeHeight(1), 220);
        setTimeout(() => setEyeHeight(16), 280);
        setTimeout(() => {
          setEyeHeight(7);
          setPupilX(8);
        }, 380);
        setTimeout(() => setPupilX(32), 520);
        setTimeout(() => setPupilX(8), 660);
        setTimeout(() => {
          setPupilX(20);
          setEyeHeight(12);
        }, 800);
        setTimeout(() => {
          isReactingRef.current = false;
          timerRef.current = setTimeout(runBehavior, 200);
        }, 1000);
      } else if (totalItems === 2) {
        setMood("furious");
        let c = 0;
        const rage = () => {
          setEyeHeight(1);
          setTimeout(() => {
            setEyeHeight(16);
            c++;
            if (c < 5) setTimeout(rage, 50);
            else {
              setTimeout(() => {
                setEyeHeight(7);
                setPupilX(8);
                setPupilY(9);
              }, 100);
              setTimeout(() => {
                setPupilX(32);
                setPupilY(9);
              }, 200);
              setTimeout(() => {
                setPupilX(32);
                setPupilY(19);
              }, 300);
              setTimeout(() => {
                setPupilX(8);
                setPupilY(19);
              }, 400);
              setTimeout(() => {
                setPupilX(20);
                setPupilY(14);
                setEyeHeight(12);
              }, 550);
              setTimeout(() => {
                isReactingRef.current = false;
                timerRef.current = setTimeout(runBehavior, 150);
              }, 700);
            }
          }, 35);
        };
        rage();
      } else {
        setMood("furious");
        let c = 0;
        const meltdown = () => {
          setEyeHeight(1);
          setPupilX(20 + (Math.random() > 0.5 ? 12 : -12));
          setPupilY(14 + (Math.random() > 0.5 ? 7 : -7));
          setTimeout(() => {
            setEyeHeight(16);
            c++;
            if (c < 8) setTimeout(meltdown, 40);
            else {
              setTimeout(() => {
                setEyeHeight(7);
                setPupilX(8);
                setPupilY(8);
              }, 80);
              setTimeout(() => {
                setPupilX(32);
                setPupilY(20);
              }, 160);
              setTimeout(() => {
                setPupilX(8);
                setPupilY(20);
              }, 240);
              setTimeout(() => {
                setPupilX(32);
                setPupilY(8);
              }, 320);
              setTimeout(() => {
                setPupilX(8);
                setPupilY(8);
              }, 400);
              setTimeout(() => {
                setPupilX(20);
                setPupilY(14);
                setEyeHeight(12);
              }, 520);
              setTimeout(() => {
                isReactingRef.current = false;
                timerRef.current = setTimeout(runBehavior, 100);
              }, 650);
            }
          }, 30);
        };
        meltdown();
      }
    } else if (totalItems < prev) {
      if (totalItems === 0) {
        stopMovement();
        setMood("calm");
        setBloodshot(false);
        setEyeHeight(1);
        setTimeout(() => setEyeHeight(14), 100);
        setTimeout(() => setEyeHeight(12), 400);
        setTimeout(() => {
          isReactingRef.current = false;
          timerRef.current = setTimeout(runBehavior, 800);
        }, 600);
      } else if (totalItems === 1) {
        setMood("angry");
      }
    }

    prevCount.current = totalItems;
  }, [totalItems, stopMovement, resetToCenter, runBehavior]);

  const topLidY = 14 - eyeHeight;
  const bottomLidY = 14 + eyeHeight;

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
        animation: shake ? "eyeShake 0.5s ease" : "none",
      }}
    >
      <svg
        width="40"
        height="28"
        viewBox="0 0 40 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: "filter 0.2s ease",
          filter: glow,
          overflow: "visible",
        }}
      >
        <defs>
          <clipPath id="eyeClip">
            <path
              d={`M2 14 C10 ${topLidY}, 30 ${topLidY}, 38 14 C30 ${bottomLidY}, 10 ${bottomLidY}, 2 14 Z`}
            />
          </clipPath>
        </defs>

        {/* Top lid */}
        <path
          d={`M2 14 C10 ${topLidY}, 30 ${topLidY}, 38 14`}
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          style={{ transition: "d 0.05s ease" }}
        />

        {/* Bottom lid */}
        <path
          d={`M2 14 C10 ${bottomLidY}, 30 ${bottomLidY}, 38 14`}
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          style={{ transition: "d 0.05s ease" }}
        />

        <g clipPath="url(#eyeClip)">
          {/* Bloodshot veins */}
          {bloodshot && (
            <>
              <line
                x1="14"
                y1="14"
                x2="10"
                y2="10"
                stroke="rgba(255,0,0,0.5)"
                strokeWidth="0.5"
              />
              <line
                x1="17"
                y1="14"
                x2="14"
                y2="8"
                stroke="rgba(255,0,0,0.4)"
                strokeWidth="0.4"
              />
              <line
                x1="23"
                y1="14"
                x2="26"
                y2="9"
                stroke="rgba(255,0,0,0.5)"
                strokeWidth="0.5"
              />
              <line
                x1="26"
                y1="14"
                x2="30"
                y2="11"
                stroke="rgba(255,0,0,0.4)"
                strokeWidth="0.4"
              />
              <line
                x1="14"
                y1="14"
                x2="11"
                y2="18"
                stroke="rgba(255,0,0,0.3)"
                strokeWidth="0.4"
              />
              <line
                x1="26"
                y1="14"
                x2="29"
                y2="17"
                stroke="rgba(255,0,0,0.3)"
                strokeWidth="0.4"
              />
            </>
          )}

          {/* Sclera — white of the eye */}
          <ellipse
            cx={pupilX}
            cy={pupilY}
            rx="9"
            ry={Math.min(9, eyeHeight * 0.88)}
            fill={
              bloodshot ? "rgba(255,220,220,0.92)" : "rgba(245,240,232,0.92)"
            }
            style={{
              transition: "cx 0.06s ease, cy 0.06s ease, ry 0.05s ease",
            }}
          />

          {/* Iris */}
          <ellipse
            cx={pupilX}
            cy={pupilY}
            rx="6"
            ry={Math.min(6, eyeHeight * 0.65)}
            fill={
              mood === "furious"
                ? "rgba(180,0,0,0.9)"
                : mood === "angry"
                  ? "rgba(140,0,0,0.85)"
                  : "rgba(180,80,0,0.85)"
            }
            stroke={color}
            strokeWidth="0.5"
            style={{
              transition: "cx 0.06s ease, cy 0.06s ease, ry 0.05s ease",
            }}
          />

          {/* Pupil */}
          <ellipse
            cx={pupilX}
            cy={pupilY}
            rx={mood === "furious" ? "3.5" : "2.8"}
            ry={Math.min(mood === "furious" ? 3.5 : 2.8, eyeHeight * 0.32)}
            fill="#000000"
            style={{
              transition: "cx 0.06s ease, cy 0.06s ease, ry 0.05s ease",
            }}
          />

          {/* Primary shine — big and bright */}
          {eyeHeight > 3 && (
            <ellipse
              cx={pupilX + 2.5}
              cy={pupilY - 3}
              rx="1.8"
              ry="1.2"
              fill="rgba(255,255,255,0.95)"
              style={{ transition: "cx 0.06s ease, cy 0.06s ease" }}
            />
          )}

          {/* Secondary shine — small dot */}
          {eyeHeight > 5 && (
            <circle
              cx={pupilX - 2}
              cy={pupilY + 2}
              r="0.8"
              fill="rgba(255,255,255,0.5)"
              style={{ transition: "cx 0.06s ease, cy 0.06s ease" }}
            />
          )}

          {/* Iris ring — depth */}
          {eyeHeight > 4 && (
            <ellipse
              cx={pupilX}
              cy={pupilY}
              rx="6"
              ry={Math.min(6, eyeHeight * 0.65)}
              fill="none"
              stroke={
                mood === "furious"
                  ? "rgba(255,80,80,0.4)"
                  : "rgba(200,110,15,0.3)"
              }
              strokeWidth="1"
              style={{
                transition: "cx 0.06s ease, cy 0.06s ease, ry 0.05s ease",
              }}
            />
          )}
        </g>

        {/* Eyelashes — calm only */}
        {eyeHeight > 6 && mood === "calm" && (
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

        {/* Anger veins — furious only */}
        {mood === "furious" && eyeHeight > 4 && (
          <>
            <path
              d={`M30 ${topLidY + 3} L33 ${topLidY - 1} L36 ${topLidY + 3} L38 ${topLidY}`}
              stroke="#FF0000"
              strokeWidth="0.9"
              fill="none"
              opacity="0.8"
            />
            <path
              d={`M10 ${topLidY + 3} L7 ${topLidY - 1} L4 ${topLidY + 3} L2 ${topLidY}`}
              stroke="#FF0000"
              strokeWidth="0.9"
              fill="none"
              opacity="0.8"
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
            animation:
              mood === "furious"
                ? "badgeRage 0.3s infinite"
                : "badgePulse 2s infinite",
          }}
        >
          {totalItems}
        </span>
      )}

      <style>{`
        @keyframes eyeShake {
          0%   { transform: translateX(0) }
          10%  { transform: translateX(-4px) rotate(-3deg) }
          20%  { transform: translateX(4px) rotate(3deg) }
          30%  { transform: translateX(-4px) rotate(-2deg) }
          40%  { transform: translateX(4px) rotate(2deg) }
          50%  { transform: translateX(-3px) rotate(-1deg) }
          60%  { transform: translateX(3px) rotate(1deg) }
          70%  { transform: translateX(-2px) }
          80%  { transform: translateX(2px) }
          90%  { transform: translateX(-1px) }
          100% { transform: translateX(0) }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 8px rgba(200,0,0,0.6); }
          50% { box-shadow: 0 0 16px rgba(200,0,0,1); transform: scale(1.1); }
        }
        @keyframes badgeRage {
          0%, 100% { box-shadow: 0 0 20px rgba(255,0,0,1); transform: scale(1.2); }
          50% { box-shadow: 0 0 8px rgba(255,0,0,0.6); transform: scale(0.9); }
        }
      `}</style>
    </Link>
  );
}

export default VillainEye;

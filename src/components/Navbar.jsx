import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import VillainEye from "./VillainEye";

// ── CONSTANTS ──
const NAV_LINKS = [
  {
    to: "/",
    label: "HOME",
    number: "01",
    stamp: "CLEARED",
    stampColor: "0,180,0",
  },
  {
    to: "/about",
    label: "ABOUT",
    number: "02",
    stamp: "CLASSIFIED",
    stampColor: "200,0,0",
  },
  {
    to: "/collections",
    label: "COLLECTIONS",
    number: "03",
    stamp: "ACTIVE",
    stampColor: "200,0,0",
  },
  {
    to: "/contact",
    label: "CONTACT",
    number: "04",
    stamp: "OPEN",
    stampColor: "200,110,15",
  },
];

// ── DESKTOP LINK ──
function DesktopLink({ to, label, isActive }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li style={{ listStyle: "none", position: "relative" }}>
      <Link
        to={to}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily: "Special Elite",
          fontSize: "11px",
          letterSpacing: "4px",
          textDecoration: "none",
          color: isActive
            ? "rgba(200,110,15,1)"
            : hovered
              ? "rgba(245,240,232,1)"
              : "rgba(245,240,232,0.7)",
          transition: "color 0.4s ease",
          display: "block",
          padding: "8px 0",
          position: "relative",
        }}
      >
        {label}
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            height: "1px",
            width: isActive || hovered ? "100%" : "0%",
            background: isActive
              ? "rgba(200,110,15,0.9)"
              : "rgba(245,240,232,0.4)",
            transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
            display: "block",
          }}
        />
      </Link>
    </li>
  );
}

// ── HAMBURGER ──
function Hamburger({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        padding: "8px",
        cursor: "pointer",
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
      aria-label="Toggle menu"
    >
      {[
        isOpen ? "rotate(45deg) translate(6px, 6px)" : "none",
        "none",
        isOpen ? "rotate(-45deg) translate(6px, -6px)" : "none",
      ].map((transform, i) => (
        <span
          key={i}
          style={{
            display: "block",
            width: "24px",
            height: "1px",
            background: isOpen
              ? "rgba(200,110,15,0.9)"
              : "rgba(245,240,232,0.8)",
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            transform,
            opacity: i === 1 && isOpen ? 0 : 1,
            transformOrigin: "center",
          }}
        />
      ))}
    </button>
  );
}

// ── MAIN NAVBAR ──
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setProgress] = useState(0);
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Smooth scroll progress 0 → 1
  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / 120, 1);
      setProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Interpolated values
  const bgOpacity = scrollProgress * 0.92;
  const blurAmount = scrollProgress * 20;
  const gradientOpacity = Math.max(0.75 - scrollProgress * 0.75, 0);

  return (
    <>
      {/* ── TOP BAR — sits below 32px announcement bar ── */}
      <nav
        style={{
          position: "fixed",
          top: "32px",
          left: 0,
          right: 0,
          zIndex: 200,
          height: "70px",
          display: "flex",
          alignItems: "center",
          background:
            scrollProgress > 0
              ? `rgba(10,10,10,${bgOpacity})`
              : `linear-gradient(to bottom, rgba(10,10,10,${gradientOpacity}), transparent)`,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          borderBottom: "none",
          boxShadow:
            scrollProgress > 0.5
              ? `0 1px 0 rgba(255,255,255,${scrollProgress * 0.03})`
              : "none",
          transition: "box-shadow 0.6s ease, background 0.6s ease",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* LEFT */}
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div className="md:hidden">
              <Hamburger isOpen={isOpen} onClick={() => setIsOpen((p) => !p)} />
            </div>
            <Link
              to="/"
              className="hidden md:block"
              style={{
                fontFamily: "Metal Mania",
                fontSize: "28px",
                letterSpacing: "12px",
                color: "#CC0000",
                textDecoration: "none",
                textShadow: "0 0 30px rgba(200,0,0,0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(200,110,15,1)";
                e.currentTarget.style.textShadow =
                  "0 0 30px rgba(200,110,15,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#CC0000";
                e.currentTarget.style.textShadow = "0 0 30px rgba(200,0,0,0.4)";
              }}
            >
              VILLAIN
            </Link>
          </div>

          {/* CENTER — mobile logo */}
          <Link
            to="/"
            className="md:hidden"
            style={{
              fontFamily: "Metal Mania",
              fontSize: "22px",
              letterSpacing: "8px",
              color: "#CC0000",
              textDecoration: "none",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textShadow: "0 0 20px rgba(200,0,0,0.4)",
            }}
          >
            VILLAIN
          </Link>

          {/* CENTER — desktop nav */}
          <ul
            className="hidden md:flex"
            style={{
              gap: "48px",
              margin: 0,
              padding: 0,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <DesktopLink
                key={link.to}
                to={link.to}
                label={link.label}
                isActive={location.pathname === link.to}
              />
            ))}
          </ul>

          {/* RIGHT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <div
              className="hidden md:flex"
              style={{
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "2px",
              }}
            >
              <span
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "7px",
                  letterSpacing: "4px",
                  color: "rgba(200,110,15,0.25)",
                }}
              >
                CLEARANCE: VILLAIN
              </span>
              <span
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "7px",
                  letterSpacing: "3px",
                  color: "rgba(245,240,232,0.08)",
                }}
              >
                EST. 2026
              </span>
            </div>
            <VillainEye />
          </div>
        </div>
      </nav>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 150,
          background: "rgba(3,2,1,0.99)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Tim Burton concentric circles */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            border: "1px solid rgba(200,110,15,0.03)",
            boxShadow: `
              0 0 0 60px rgba(200,110,15,0.02),
              0 0 0 120px rgba(200,110,15,0.015),
              0 0 0 180px rgba(200,110,15,0.01)
            `,
            pointerEvents: "none",
          }}
        />

        {/* Mascot watermark */}
        <img
          src="/mascot.png"
          alt=""
          style={{
            position: "absolute",
            bottom: "40px",
            right: "-60px",
            width: "320px",
            opacity: isOpen ? 0.04 : 0,
            filter: "sepia(1) contrast(1.2)",
            pointerEvents: "none",
            transition: "opacity 0.8s ease 0.3s",
            transform: "rotate(-8deg)",
          }}
        />

        {/* Vertical editorial text */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "-80px",
            transform: "rotate(-90deg)",
            fontFamily: "Special Elite",
            fontSize: "7px",
            letterSpacing: "8px",
            color: "rgba(200,110,15,0.05)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          VILLAIN CULTURE · EST 2026 · BUILT FOR THE ONES WHO NEVER FIT ·
        </div>

        {/* Menu content */}
        <div
          style={{
            padding: "120px 40px 40px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {/* Header */}
          <div
            style={{
              marginBottom: "48px",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-16px)",
              transition: "all 0.5s ease 0.1s",
            }}
          >
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "7px",
                letterSpacing: "8px",
                color: "rgba(200,110,15,0.4)",
                marginBottom: "8px",
              }}
            >
              VILLAIN CULTURE
            </p>
            <h2
              style={{
                fontFamily: "Metal Mania",
                fontSize: "40px",
                letterSpacing: "8px",
                color: "rgba(245,240,232,0.9)",
                margin: 0,
                textShadow: "0 0 40px rgba(200,110,15,0.1)",
              }}
            >
              CASE FILE
            </h2>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "rgba(200,110,15,0.3)",
                }}
              />
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "7px",
                  letterSpacing: "4px",
                  color: "rgba(245,240,232,0.12)",
                }}
              >
                CLEARANCE LEVEL: VILLAIN
              </p>
            </div>
          </div>

          {/* Nav links */}
          <ul style={{ padding: 0, margin: 0, flex: 1 }}>
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.to}
                style={{
                  listStyle: "none",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(-32px)",
                  transition: `all 0.5s cubic-bezier(0.4,0,0.2,1) ${0.15 + i * 0.08}s`,
                }}
              >
                <Link
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "20px 0",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(200,110,15,0.07)",
                    transition: "padding-left 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.paddingLeft = "10px")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.paddingLeft = "0")
                  }
                >
                  <span
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "10px",
                      letterSpacing: "2px",
                      color: "rgba(200,110,15,0.4)",
                      minWidth: "24px",
                    }}
                  >
                    {link.number}
                  </span>
                  <div
                    style={{
                      width: "1px",
                      height: "36px",
                      background:
                        "linear-gradient(to bottom, transparent, rgba(200,110,15,0.25), transparent)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Metal Mania",
                      fontSize: "30px",
                      letterSpacing: "6px",
                      color: "rgba(245,240,232,0.88)",
                      flex: 1,
                    }}
                  >
                    {link.label}
                  </span>
                  <div
                    style={{
                      border: `1px solid rgba(${link.stampColor},0.35)`,
                      padding: "3px 10px",
                      borderRadius: "3px",
                      transform: `rotate(${i % 2 === 0 ? "-5deg" : "4deg"})`,
                      background: `rgba(${link.stampColor},0.04)`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Special Elite",
                        fontSize: "7px",
                        letterSpacing: "3px",
                        color: `rgba(${link.stampColor},0.6)`,
                      }}
                    >
                      {link.stamp}
                    </span>
                  </div>
                  <span
                    style={{ color: "rgba(200,110,15,0.3)", fontSize: "14px" }}
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Cart */}
          <div
            style={{
              marginTop: "32px",
              padding: "16px 20px",
              border: "1px solid rgba(200,110,15,0.15)",
              borderRadius: "12px",
              background: "rgba(200,110,15,0.03)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.5s ease 0.45s",
            }}
          >
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "11px",
                letterSpacing: "5px",
                color: "rgba(200,110,15,0.65)",
              }}
            >
              VIEW CART
            </p>
            <VillainEye />
          </div>

          {/* Bottom */}
          <div
            style={{
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(200,110,15,0.06)",
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.5s ease 0.5s",
            }}
          >
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "7px",
                letterSpacing: "4px",
                color: "rgba(245,240,232,0.08)",
                lineHeight: 2,
              }}
            >
              VILLAIN CULTURE · EST 2026
              <br />
              BUILT FOR THE ONES WHO NEVER FIT
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

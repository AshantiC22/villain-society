import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/", label: "HOME", number: "01", stamp: "CLEARED" },
  { to: "/about", label: "ABOUT", number: "02", stamp: "CLASSIFIED" },
  { to: "/collections", label: "COLLECTIONS", number: "03", stamp: "ACTIVE" },
  { to: "/contact", label: "CONTACT", number: "04", stamp: "OPEN" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-[200] bg-black/80 backdrop-blur-2xl">
        {/* ── MAIN BAR ── */}
        <div className="flex justify-between items-center px-6 py-4">
          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col gap-[5px] cursor-pointer"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              zIndex: 300,
            }}
          >
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: isOpen ? "#CC0000" : "rgba(245,240,232,0.8)",
                transition: "all 0.3s ease",
                transform: isOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: isOpen ? "#CC0000" : "rgba(245,240,232,0.8)",
                transition: "all 0.3s ease",
                opacity: isOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: isOpen ? "#CC0000" : "rgba(245,240,232,0.8)",
                transition: "all 0.3s ease",
                transform: isOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
              }}
            />
          </button>

          {/* Logo */}
          <h1
            style={{ fontFamily: "Metal Mania" }}
            className="text-2xl text-red-600 tracking-widest absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            VILLAIN
          </h1>

          {/* Desktop nav links */}
          <ul className="hidden md:flex gap-8">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-white/90 hover:text-red-500 transition-all duration-300"
                  style={{ fontFamily: "Creepster", letterSpacing: "3px" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Cart icon — desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/cart"
              style={{
                fontFamily: "Special Elite",
                fontSize: "10px",
                letterSpacing: "3px",
                color: "rgba(245,240,232,0.6)",
                textDecoration: "none",
                border: "1px solid rgba(200,110,15,0.3)",
                padding: "6px 14px",
                borderRadius: "6px",
                position: "relative",
              }}
            >
              CART
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "#CC0000",
                    color: "white",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Special Elite",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile right side — cart icon */}
          <Link
            to="/cart"
            className="md:hidden"
            style={{
              fontFamily: "Special Elite",
              fontSize: "9px",
              letterSpacing: "2px",
              color: "rgba(245,240,232,0.6)",
              textDecoration: "none",
              position: "relative",
            }}
          >
            CART
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-8px",
                  background: "#CC0000",
                  color: "white",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  fontSize: "9px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* ── CASE FILE MOBILE MENU ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "320px",
          background: "rgba(8,5,2,0.98)",
          backdropFilter: "blur(20px)",
          zIndex: 150,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRight: "1px solid rgba(200,110,15,0.15)",
          display: "flex",
          flexDirection: "column",
          padding: "80px 0 40px",
          overflowY: "auto",
        }}
      >
        {/* Case file header */}
        <div
          style={{
            padding: "0 28px 24px",
            borderBottom: "1px solid rgba(200,110,15,0.1)",
            marginBottom: "8px",
          }}
        >
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "8px",
              letterSpacing: "6px",
              color: "rgba(200,110,15,0.5)",
              marginBottom: "4px",
            }}
          >
            VILLAIN CULTURE
          </p>
          <p
            style={{
              fontFamily: "Metal Mania",
              fontSize: "20px",
              letterSpacing: "4px",
              color: "rgba(245,240,232,0.9)",
            }}
          >
            CASE FILE
          </p>
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "8px",
              letterSpacing: "3px",
              color: "rgba(245,240,232,0.15)",
              marginTop: "4px",
            }}
          >
            CLEARANCE LEVEL: VILLAIN
          </p>
        </div>

        {/* Mascot watermark */}
        <img
          src="/mascot.png"
          alt=""
          style={{
            position: "absolute",
            bottom: "80px",
            right: "-20px",
            width: "180px",
            opacity: 0.04,
            filter: "sepia(1)",
            pointerEvents: "none",
          }}
        />

        {/* Nav links as case file entries */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {links.map((link, i) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={closeMenu}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 28px",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(200,110,15,0.08)",
                  position: "relative",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(200,110,15,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Number */}
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    color: "rgba(200,110,15,0.4)",
                    minWidth: "20px",
                  }}
                >
                  {link.number}
                </p>

                {/* Vertical line */}
                <div
                  style={{
                    width: "1px",
                    height: "32px",
                    background: "rgba(200,110,15,0.2)",
                  }}
                />

                {/* Link label */}
                <p
                  style={{
                    fontFamily: "Metal Mania",
                    fontSize: "18px",
                    letterSpacing: "4px",
                    color: "rgba(245,240,232,0.85)",
                    flex: 1,
                  }}
                >
                  {link.label}
                </p>

                {/* Stamp */}
                <div
                  style={{
                    border: `1px solid ${i === 0 ? "rgba(0,180,0,0.4)" : i === 3 ? "rgba(200,110,15,0.4)" : "rgba(200,0,0,0.4)"}`,
                    padding: "2px 8px",
                    borderRadius: "4px",
                    transform: `rotate(${i % 2 === 0 ? "-4deg" : "3deg"})`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "7px",
                      letterSpacing: "2px",
                      color:
                        i === 0
                          ? "rgba(0,180,0,0.6)"
                          : i === 3
                            ? "rgba(200,110,15,0.6)"
                            : "rgba(200,0,0,0.6)",
                    }}
                  >
                    {link.stamp}
                  </p>
                </div>

                {/* Arrow */}
                <p
                  style={{
                    color: "rgba(200,110,15,0.3)",
                    fontSize: "12px",
                  }}
                >
                  →
                </p>
              </Link>
            </li>
          ))}
        </ul>

        {/* Cart link in menu */}
        <div style={{ padding: "24px 28px", marginTop: "8px" }}>
          <Link
            to="/cart"
            onClick={closeMenu}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              border: "1px solid rgba(200,110,15,0.2)",
              borderRadius: "10px",
              textDecoration: "none",
              background: "rgba(200,110,15,0.05)",
            }}
          >
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "11px",
                letterSpacing: "4px",
                color: "rgba(200,110,15,0.7)",
              }}
            >
              VIEW CART
            </p>
            {totalItems > 0 && (
              <span
                style={{
                  background: "#CC0000",
                  color: "white",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  fontSize: "11px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Special Elite",
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Bottom info */}
        <div
          style={{
            marginTop: "auto",
            padding: "0 28px",
            borderTop: "1px solid rgba(200,110,15,0.08)",
            paddingTop: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "8px",
              letterSpacing: "3px",
              color: "rgba(245,240,232,0.1)",
              lineHeight: 1.8,
            }}
          >
            VILLAIN CULTURE · EST 2026
            <br />
            BUILT FOR THE ONES WHO NEVER FIT
          </p>
        </div>
      </div>

      {/* Dark overlay when menu open */}
      {isOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 140,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      <style>{`
        @media (min-width: 768px) {
          .case-file-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;

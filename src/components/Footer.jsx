import { Link } from "react-router-dom";

// ── CONSTANTS ──
const POLICY_LINKS = [
  { to: "/shipping-policy", label: "SHIPPING POLICY" },
  { to: "/returns-policy", label: "RETURNS POLICY" },
  { to: "/privacy-policy", label: "PRIVACY POLICY" },
  { to: "/size-guide", label: "SIZE GUIDE" },
  { to: "/contact", label: "CONTACT" },
];

const SOCIAL_LINKS = [
  { label: "INSTAGRAM", href: "https://instagram.com/vllnculture" },
  { label: "TIKTOK", href: "https://tiktok.com/@vllnculture" },
];

// ── STYLES ──
const linkStyle = {
  fontFamily: "Special Elite",
  fontSize: "9px",
  letterSpacing: "3px",
  color: "rgba(245,240,232,0.2)",
  textDecoration: "none",
  transition: "color 0.2s ease",
};

const hoverOn = (e) => (e.currentTarget.style.color = "rgba(200,110,15,0.6)");
const hoverOff = (e) => (e.currentTarget.style.color = "rgba(245,240,232,0.2)");

// ── COMPONENT ──
function Footer() {
  return (
    <footer
      style={{
        background: "rgba(5,3,1,0.98)",
        borderTop: "1px solid rgba(200,110,15,0.08)",
        padding: "40px 20px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Logo */}
        <p
          style={{
            fontFamily: "Metal Mania",
            fontSize: "20px",
            letterSpacing: "6px",
            color: "rgba(200,110,15,0.8)",
          }}
        >
          VILLAIN CULTURE
        </p>

        {/* Policy links */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {POLICY_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={linkStyle}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social links */}
        <div style={{ display: "flex", gap: "20px" }}>
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              style={linkStyle}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}
            >
              {social.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "Special Elite",
            fontSize: "8px",
            letterSpacing: "3px",
            color: "rgba(245,240,232,0.08)",
            textAlign: "center",
          }}
        >
          © 2026 VILLAIN CULTURE. ALL RIGHTS RESERVED.
          <br />
          BUILT FOR THE ONES WHO NEVER FIT.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

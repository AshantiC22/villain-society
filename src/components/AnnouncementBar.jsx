const messages = [
  "FREE SHIPPING ON ORDERS OVER $100",
  "VILLAIN CULTURE · EST 2026",
  "BUILT FOR THE ONES WHO NEVER FIT",
  "NEW DROP · SHOP THE COLLECTION",
];

function AnnouncementBar() {
  return (
    <div
      style={{
        background: "#CC0000",
        width: "100%",
        overflow: "hidden",
        height: "32px",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 300,
      }}
    >
      <div
        style={{
          display: "flex",
          animation: "marquee 25s linear infinite",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      >
        {[...messages, ...messages].map((msg, i) => (
          <span
            key={i}
            style={{
              fontFamily: "Special Elite",
              fontSize: "9px",
              letterSpacing: "4px",
              color: "#F5F0E8",
              padding: "0 48px",
            }}
          >
            {msg}
            <span style={{ margin: "0 24px", opacity: 0.4 }}>·</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default AnnouncementBar;

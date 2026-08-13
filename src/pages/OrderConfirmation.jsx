import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ── DESIGN TOKENS ──
const C = {
  bg: "#0A0A0A",
  surface: "#111111",
  border: "rgba(255,255,255,0.06)",
  text: "#F5F0E8",
  textMid: "rgba(245,240,232,0.5)",
  textLow: "rgba(245,240,232,0.2)",
  red: "#CC0000",
  redHover: "#aa0000",
  green: "rgba(0,200,100,0.9)",
};

const F = {
  display: "Metal Mania",
  body: "Special Elite",
};

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const [visible, setVisible] = useState(false);
  const order = location.state;

  const CONFIRMATION_TEXT = "ORDER CONFIRMED.";

  useEffect(() => {
    if (!order) return;
    setTimeout(() => setVisible(true), 100);
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(CONFIRMATION_TEXT.slice(0, i));
      i++;
      if (i > CONFIRMATION_TEXT.length) clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, []);

  if (!order) {
    return (
      <div
        style={{
          background: C.bg,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            fontFamily: F.body,
            fontSize: "10px",
            letterSpacing: "4px",
            color: C.textMid,
            background: "none",
            border: `1px solid ${C.border}`,
            padding: "14px 32px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          RETURN HOME
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", paddingTop: "102px" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "48px 24px 80px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.6s ease",
        }}
      >
        {/* Status indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: C.green,
              boxShadow: `0 0 12px ${C.green}`,
              animation: "pulse 2s infinite",
            }}
          />
          <p
            style={{
              fontFamily: F.body,
              fontSize: "9px",
              letterSpacing: "5px",
              color: C.green,
            }}
          >
            PAYMENT SUCCESSFUL
          </p>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: F.display,
            fontSize: "clamp(32px, 5vw, 60px)",
            letterSpacing: "4px",
            color: C.text,
            lineHeight: 1,
            marginBottom: "8px",
          }}
        >
          {displayText}
          <span
            style={{
              display: "inline-block",
              width: "3px",
              height: "0.8em",
              background: C.red,
              verticalAlign: "middle",
              marginLeft: "4px",
              animation: "blink 1s infinite",
            }}
          />
        </h1>

        <p
          style={{
            fontFamily: F.body,
            fontSize: "11px",
            letterSpacing: "3px",
            color: C.textLow,
            marginBottom: "48px",
          }}
        >
          VILLAIN WORLD WILL DELIVER.
        </p>

        {/* Divider */}
        <div
          style={{ height: "1px", background: C.border, marginBottom: "48px" }}
        />

        {/* Order ID */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: "4px",
            padding: "16px 20px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontFamily: F.body,
              fontSize: "8px",
              letterSpacing: "4px",
              color: C.textLow,
            }}
          >
            ORDER ID
          </p>
          <p
            style={{
              fontFamily: F.body,
              fontSize: "10px",
              letterSpacing: "1px",
              color: C.textMid,
              wordBreak: "break-all",
            }}
          >
            {order.orderId}
          </p>
        </div>

        {/* Info grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "24px",
          }}
          className="confirm-grid"
        >
          {/* Shipping */}
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "8px",
                  letterSpacing: "4px",
                  color: C.textLow,
                }}
              >
                SHIPPING TO
              </p>
            </div>
            <div style={{ padding: "16px 20px" }}>
              {[
                order.shipping.name,
                order.shipping.address,
                `${order.shipping.city}, ${order.shipping.state} ${order.shipping.zip}`,
                order.shipping.email,
              ].map((line, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: F.body,
                    fontSize: "12px",
                    letterSpacing: "0.5px",
                    color: C.textMid,
                    lineHeight: 1.8,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "8px",
                  letterSpacing: "4px",
                  color: C.textLow,
                }}
              >
                ORDER SUMMARY
              </p>
            </div>
            <div style={{ padding: "16px 20px" }}>
              {order.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ flex: 1, paddingRight: "12px" }}>
                    <p
                      style={{
                        fontFamily: F.body,
                        fontSize: "11px",
                        letterSpacing: "0.5px",
                        color: C.textMid,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontFamily: F.body,
                        fontSize: "9px",
                        letterSpacing: "2px",
                        color: C.textLow,
                      }}
                    >
                      {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: F.body,
                      fontSize: "11px",
                      color: C.textMid,
                      flexShrink: 0,
                    }}
                  >
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div
                style={{
                  height: "1px",
                  background: C.border,
                  margin: "12px 0",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  style={{
                    fontFamily: F.display,
                    fontSize: "16px",
                    color: C.text,
                  }}
                >
                  TOTAL
                </p>
                <p
                  style={{
                    fontFamily: F.display,
                    fontSize: "18px",
                    color: C.text,
                  }}
                >
                  ${order.total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <p
              style={{
                fontFamily: F.body,
                fontSize: "8px",
                letterSpacing: "4px",
                color: C.textLow,
              }}
            >
              WHAT HAPPENS NEXT
            </p>
          </div>
          <div style={{ padding: "20px" }}>
            {[
              {
                step: "01",
                text: `Confirmation email sent to ${order.shipping.email}`,
              },
              { step: "02", text: "Order processed within 1-2 business days" },
              {
                step: "03",
                text: "Shipped via UPS or FedEx in 3-5 business days",
              },
              { step: "04", text: "Tracking number sent to your email" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  padding: "12px 0",
                  borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                }}
              >
                <p
                  style={{
                    fontFamily: F.body,
                    fontSize: "8px",
                    letterSpacing: "2px",
                    color: C.red,
                    minWidth: "24px",
                  }}
                >
                  {item.step}
                </p>
                <p
                  style={{
                    fontFamily: F.body,
                    fontSize: "12px",
                    letterSpacing: "0.5px",
                    color: C.textMid,
                    lineHeight: 1.6,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/collections")}
            style={{
              fontFamily: F.body,
              fontSize: "10px",
              letterSpacing: "4px",
              padding: "14px 28px",
              background: C.red,
              border: "none",
              borderRadius: "4px",
              color: C.text,
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = C.redHover)
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = C.red)}
          >
            CONTINUE SHOPPING
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              fontFamily: F.body,
              fontSize: "10px",
              letterSpacing: "4px",
              padding: "14px 28px",
              background: "transparent",
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              color: C.textMid,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = C.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.color = C.textMid;
            }}
          >
            RETURN HOME
          </button>
        </div>

        <p
          style={{
            fontFamily: F.body,
            fontSize: "8px",
            letterSpacing: "3px",
            color: "rgba(245,240,232,0.06)",
            marginTop: "40px",
          }}
        >
          VILLAIN CULTURE · EST 2026 · BUILT FOR THE ONES WHO NEVER FIT
        </p>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @media (max-width: 768px) {
          .confirm-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default OrderConfirmation;

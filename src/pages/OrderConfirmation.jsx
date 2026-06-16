import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const order = location.state;

  const CONFIRMATION_TEXT = "ORDER CONFIRMED. VILLAIN WORLD WILL DELIVER.";

  // Typewriter effect
  useEffect(() => {
    if (!order) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(CONFIRMATION_TEXT.slice(0, i));
      i++;
      if (i > CONFIRMATION_TEXT.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // If no order data redirect to home
  if (!order) {
    return (
      <div
        style={{
          background: "#030201",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            fontFamily: "Special Elite",
            fontSize: "11px",
            letterSpacing: "4px",
            color: "rgba(200,110,15,0.8)",
            background: "none",
            border: "1px solid rgba(200,110,15,0.4)",
            padding: "14px 32px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          RETURN HOME
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#030201",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      {/* Grain */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "60px 20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Signal confirmed */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "rgba(0,180,0,0.9)",
              boxShadow: "0 0 12px rgba(0,180,0,0.6)",
              animation: "pulse 2s infinite",
            }}
          />
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "9px",
              letterSpacing: "5px",
              color: "rgba(0,180,0,0.7)",
            }}
          >
            TRANSMISSION CONFIRMED
          </p>
        </div>

        {/* Typewriter heading */}
        <h1
          style={{
            fontFamily: "Metal Mania",
            fontSize: "clamp(20px, 3vw, 32px)",
            letterSpacing: "0.1em",
            color: "rgba(245,240,232,0.9)",
            lineHeight: 1.4,
            marginBottom: "8px",
            minHeight: "80px",
          }}
        >
          {displayText}
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1em",
              background: "rgba(200,110,15,0.8)",
              verticalAlign: "middle",
              marginLeft: "4px",
              animation: "blink 1s infinite",
            }}
          />
        </h1>

        {/* Divider */}
        <div
          style={{
            width: "60px",
            height: "1px",
            background:
              "linear-gradient(to right, rgba(200,110,15,0.6), transparent)",
            margin: "24px 0",
          }}
        />

        {/* Order ID */}
        <div
          style={{
            padding: "16px 20px",
            border: "1px solid rgba(200,110,15,0.15)",
            borderRadius: "10px",
            background: "rgba(18,10,4,0.8)",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "8px",
              letterSpacing: "5px",
              color: "rgba(200,110,15,0.5)",
              marginBottom: "6px",
            }}
          >
            ORDER ID
          </p>
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "11px",
              letterSpacing: "2px",
              color: "rgba(245,240,232,0.4)",
              wordBreak: "break-all",
            }}
          >
            {order.orderId}
          </p>
        </div>

        {/* Two column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "32px",
          }}
          className="confirm-grid"
        >
          {/* Shipping info */}
          <div
            style={{
              padding: "20px",
              border: "1px solid rgba(200,110,15,0.12)",
              borderRadius: "12px",
              background: "rgba(18,10,4,0.8)",
            }}
          >
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "8px",
                letterSpacing: "5px",
                color: "rgba(200,110,15,0.5)",
                marginBottom: "12px",
              }}
            >
              SHIPPING TO
            </p>
            {[
              order.shipping.name,
              order.shipping.address,
              `${order.shipping.city}, ${order.shipping.state} ${order.shipping.zip}`,
              order.shipping.email,
            ].map((line, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "11px",
                  letterSpacing: "1px",
                  color: "rgba(245,240,232,0.5)",
                  lineHeight: 1.8,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Order summary */}
          <div
            style={{
              padding: "20px",
              border: "1px solid rgba(200,110,15,0.12)",
              borderRadius: "12px",
              background: "rgba(18,10,4,0.8)",
            }}
          >
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "8px",
                letterSpacing: "5px",
                color: "rgba(200,110,15,0.5)",
                marginBottom: "12px",
              }}
            >
              ORDER SUMMARY
            </p>
            {order.items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "10px",
                    letterSpacing: "1px",
                    color: "rgba(245,240,232,0.4)",
                    flex: 1,
                    paddingRight: "8px",
                    lineHeight: 1.4,
                  }}
                >
                  {item.name}
                  <br />
                  <span
                    style={{
                      fontSize: "8px",
                      color: "rgba(200,110,15,0.4)",
                    }}
                  >
                    {item.size} × {item.quantity}
                  </span>
                </p>
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "11px",
                    color: "rgba(245,240,232,0.5)",
                    flexShrink: 0,
                  }}
                >
                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: "rgba(200,110,15,0.1)",
                margin: "12px 0",
              }}
            />

            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p
                style={{
                  fontFamily: "Metal Mania",
                  fontSize: "14px",
                  letterSpacing: "2px",
                  color: "rgba(245,240,232,0.8)",
                }}
              >
                TOTAL
              </p>
              <p
                style={{
                  fontFamily: "Metal Mania",
                  fontSize: "16px",
                  color: "rgba(200,110,15,1)",
                }}
              >
                ${order.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div
          style={{
            padding: "20px",
            border: "1px solid rgba(200,110,15,0.1)",
            borderRadius: "12px",
            background: "rgba(18,10,4,0.6)",
            marginBottom: "40px",
          }}
        >
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "8px",
              letterSpacing: "5px",
              color: "rgba(200,110,15,0.5)",
              marginBottom: "12px",
            }}
          >
            WHAT HAPPENS NEXT
          </p>
          {[
            "A confirmation email will be sent to " + order.shipping.email,
            "Your order will be processed within 1-2 business days",
            "Shipping takes 3-5 business days",
            "You will receive a tracking number via email",
          ].map((text, i) => (
            <p
              key={i}
              style={{
                fontFamily: "Special Elite",
                fontSize: "10px",
                letterSpacing: "2px",
                color: "rgba(245,240,232,0.25)",
                lineHeight: 1.8,
                marginBottom: "4px",
              }}
            >
              · {text}
            </p>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/collections")}
            style={{
              fontFamily: "Special Elite",
              fontSize: "11px",
              letterSpacing: "4px",
              padding: "16px 32px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              background:
                "linear-gradient(135deg, rgba(210,105,8,0.95) 0%, rgba(180,80,5,0.95) 100%)",
              color: "rgba(5,3,1,0.95)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(200,110,15,0.4)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            CONTINUE SHOPPING
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              fontFamily: "Special Elite",
              fontSize: "11px",
              letterSpacing: "4px",
              padding: "16px 32px",
              borderRadius: "12px",
              border: "1px solid rgba(200,110,15,0.3)",
              cursor: "pointer",
              background: "transparent",
              color: "rgba(200,110,15,0.7)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(200,110,15,0.8)";
              e.currentTarget.style.color = "rgba(200,110,15,0.95)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(200,110,15,0.3)";
              e.currentTarget.style.color = "rgba(200,110,15,0.7)";
            }}
          >
            RETURN HOME
          </button>
        </div>

        {/* Bottom text */}
        <p
          style={{
            fontFamily: "Special Elite",
            fontSize: "9px",
            letterSpacing: "3px",
            color: "rgba(245,240,232,0.08)",
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
          50% { opacity: 1; transform: scale(1.2); }
        }
        @media (max-width: 768px) {
          .confirm-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default OrderConfirmation;

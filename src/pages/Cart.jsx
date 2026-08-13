import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// ── DESIGN TOKENS ──
const C = {
  bg: "#0A0A0A",
  surface: "#111111",
  surfaceHover: "#161616",
  border: "rgba(255,255,255,0.06)",
  borderHover: "rgba(255,255,255,0.12)",
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

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  const shippingCost = totalPrice >= 100 ? 0 : 8.99;
  const total = totalPrice + shippingCost;
  const freeShippingRemaining = 100 - totalPrice;

  // ── EMPTY CART ──
  if (cartItems.length === 0) {
    return (
      <div
        style={{
          background: C.bg,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "40px 20px",
        }}
      >
        <img
          src="/mascot.png"
          alt=""
          style={{
            width: "64px",
            opacity: 0.1,
            filter: "grayscale(1)",
          }}
        />

        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontFamily: F.display,
              fontSize: "clamp(28px, 5vw, 48px)",
              letterSpacing: "4px",
              color: C.text,
              marginBottom: "12px",
            }}
          >
            NOTHING HERE
          </h1>
          <p
            style={{
              fontFamily: F.body,
              fontSize: "10px",
              letterSpacing: "4px",
              color: C.textLow,
            }}
          >
            YOUR ARSENAL IS EMPTY
          </p>
        </div>

        <button
          onClick={() => navigate("/collections")}
          style={{
            fontFamily: F.body,
            fontSize: "10px",
            letterSpacing: "4px",
            padding: "14px 32px",
            background: C.red,
            border: "none",
            borderRadius: "4px",
            color: C.text,
            cursor: "pointer",
            marginTop: "8px",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = C.redHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = C.red)}
        >
          SHOP THE COLLECTION
        </button>
      </div>
    );
  }

  // ── CART WITH ITEMS ──
  return (
    <div style={{ background: C.bg, minHeight: "100vh", paddingTop: "102px" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        {/* ── HEADER ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            paddingBottom: "24px",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: F.body,
                fontSize: "8px",
                letterSpacing: "5px",
                color: C.textLow,
                marginBottom: "8px",
              }}
            >
              VILLAIN CULTURE
            </p>
            <h1
              style={{
                fontFamily: F.display,
                fontSize: "clamp(28px, 4vw, 44px)",
                letterSpacing: "4px",
                color: C.text,
                lineHeight: 1,
              }}
            >
              YOUR ARSENAL
            </h1>
          </div>
          <p
            style={{
              fontFamily: F.body,
              fontSize: "10px",
              letterSpacing: "3px",
              color: C.textLow,
            }}
          >
            {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"}
          </p>
        </div>

        {/* ── MAIN GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "48px",
            alignItems: "start",
          }}
          className="cart-grid"
        >
          {/* ── LEFT — ITEMS ── */}
          <div>
            {/* Free shipping progress */}
            {totalPrice < 100 && (
              <div
                style={{
                  padding: "16px 20px",
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: "4px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: F.body,
                      fontSize: "9px",
                      letterSpacing: "3px",
                      color: C.textLow,
                    }}
                  >
                    FREE SHIPPING PROGRESS
                  </p>
                  <p
                    style={{
                      fontFamily: F.body,
                      fontSize: "9px",
                      letterSpacing: "2px",
                      color: C.textMid,
                    }}
                  >
                    ${freeShippingRemaining.toFixed(2)} away
                  </p>
                </div>
                <div
                  style={{
                    height: "2px",
                    background: C.border,
                    borderRadius: "999px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min((totalPrice / 100) * 100, 100)}%`,
                      background: C.red,
                      borderRadius: "999px",
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Items list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1px",
                background: C.border,
                border: `1px solid ${C.border}`,
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "24px",
              }}
            >
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  style={{
                    display: "flex",
                    gap: "20px",
                    padding: "24px",
                    background: C.surface,
                    alignItems: "center",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = C.surfaceHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = C.surface)
                  }
                >
                  {/* Image */}
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "#0f0f0f",
                      border: `1px solid ${C.border}`,
                      borderRadius: "4px",
                      overflow: "hidden",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          padding: "8px",
                        }}
                      />
                    ) : (
                      <p
                        style={{
                          fontFamily: F.body,
                          fontSize: "7px",
                          letterSpacing: "2px",
                          color: C.textLow,
                        }}
                      >
                        SOON
                      </p>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: F.display,
                        fontSize: "15px",
                        letterSpacing: "1px",
                        color: C.text,
                        marginBottom: "4px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: F.body,
                          fontSize: "9px",
                          letterSpacing: "3px",
                          color: C.textLow,
                        }}
                      >
                        SIZE {item.size}
                      </p>
                      {item.color && (
                        <p
                          style={{
                            fontFamily: F.body,
                            fontSize: "9px",
                            letterSpacing: "3px",
                            color: C.textLow,
                          }}
                        >
                          · {item.color}
                        </p>
                      )}
                    </div>

                    {/* Quantity */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity - 1)
                        }
                        style={{
                          width: "32px",
                          height: "32px",
                          border: `1px solid ${C.border}`,
                          background: "transparent",
                          color: C.textMid,
                          cursor: "pointer",
                          fontSize: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "4px 0 0 4px",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = C.red;
                          e.currentTarget.style.color = C.text;
                          e.currentTarget.style.borderColor = C.red;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = C.textMid;
                          e.currentTarget.style.borderColor = C.border;
                        }}
                      >
                        −
                      </button>
                      <div
                        style={{
                          width: "40px",
                          height: "32px",
                          border: `1px solid ${C.border}`,
                          borderLeft: "none",
                          borderRight: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: C.surface,
                        }}
                      >
                        <p
                          style={{
                            fontFamily: F.display,
                            fontSize: "14px",
                            color: C.text,
                          }}
                        >
                          {item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        style={{
                          width: "32px",
                          height: "32px",
                          border: `1px solid ${C.border}`,
                          background: "transparent",
                          color: C.textMid,
                          cursor: "pointer",
                          fontSize: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "0 4px 4px 0",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = C.red;
                          e.currentTarget.style.color = C.text;
                          e.currentTarget.style.borderColor = C.red;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = C.textMid;
                          e.currentTarget.style.borderColor = C.border;
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price and remove */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "16px",
                      flexShrink: 0,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: F.display,
                        fontSize: "18px",
                        color: C.text,
                        letterSpacing: "1px",
                      }}
                    >
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      style={{
                        fontFamily: F.body,
                        fontSize: "8px",
                        letterSpacing: "3px",
                        color: C.textLow,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = C.red)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = C.textLow)
                      }
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue shopping */}
            <button
              onClick={() => navigate("/collections")}
              style={{
                fontFamily: F.body,
                fontSize: "9px",
                letterSpacing: "3px",
                color: C.textLow,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.textMid)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.textLow)}
            >
              ← CONTINUE SHOPPING
            </button>
          </div>

          {/* ── RIGHT — ORDER SUMMARY ── */}
          <div
            style={{
              position: "sticky",
              top: "120px",
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {/* Summary header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "8px",
                  letterSpacing: "5px",
                  color: C.textLow,
                }}
              >
                ORDER SUMMARY
              </p>
            </div>

            {/* Items */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}-summary`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ flex: 1, paddingRight: "16px" }}>
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
                      fontSize: "12px",
                      color: C.textMid,
                      flexShrink: 0,
                    }}
                  >
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <p
                  style={{
                    fontFamily: F.body,
                    fontSize: "10px",
                    letterSpacing: "2px",
                    color: C.textLow,
                  }}
                >
                  SUBTOTAL
                </p>
                <p
                  style={{
                    fontFamily: F.body,
                    fontSize: "12px",
                    color: C.textMid,
                  }}
                >
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  style={{
                    fontFamily: F.body,
                    fontSize: "10px",
                    letterSpacing: "2px",
                    color: C.textLow,
                  }}
                >
                  SHIPPING
                </p>
                <p
                  style={{
                    fontFamily: F.body,
                    fontSize: "12px",
                    color: totalPrice >= 100 ? C.green : C.textMid,
                  }}
                >
                  {totalPrice >= 100 ? "FREE" : "$8.99"}
                </p>
              </div>
            </div>

            {/* Total */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: F.display,
                    fontSize: "18px",
                    letterSpacing: "2px",
                    color: C.text,
                  }}
                >
                  TOTAL
                </p>
                <p
                  style={{
                    fontFamily: F.display,
                    fontSize: "24px",
                    letterSpacing: "2px",
                    color: C.text,
                  }}
                >
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Checkout button */}
            <div style={{ padding: "20px 24px" }}>
              <button
                onClick={() => navigate("/checkout")}
                style={{
                  fontFamily: F.body,
                  fontSize: "11px",
                  letterSpacing: "5px",
                  width: "100%",
                  padding: "16px",
                  background: C.red,
                  border: "none",
                  borderRadius: "4px",
                  color: C.text,
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                  marginBottom: "12px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = C.redHover)
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = C.red)}
              >
                PROCEED TO CHECKOUT
              </button>

              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "8px",
                  letterSpacing: "2px",
                  color: C.textLow,
                  textAlign: "center",
                }}
              >
                Secured by Stripe · 256-bit encryption
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default Cart;

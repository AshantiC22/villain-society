import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div
        style={{
          background: "#030201",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "40px 20px",
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
          }}
        />

        <img
          src="/mascot.png"
          alt="Villain"
          style={{
            width: "80px",
            opacity: 0.15,
            filter: "sepia(0.8)",
          }}
        />

        <p
          style={{
            fontFamily: "Metal Mania",
            fontSize: "clamp(24px, 4vw, 36px)",
            letterSpacing: "0.2em",
            color: "rgba(245,240,232,0.9)",
            textAlign: "center",
          }}
        >
          YOUR CART IS{" "}
          <span style={{ color: "rgba(200,110,15,1)" }}>EMPTY</span>
        </p>

        <p
          style={{
            fontFamily: "Special Elite",
            fontSize: "11px",
            letterSpacing: "4px",
            color: "rgba(245,240,232,0.2)",
            textAlign: "center",
          }}
        >
          EVEN VILLAINS NEED TO SHOP
        </p>

        <button
          onClick={() => navigate("/collections")}
          style={{
            fontFamily: "Special Elite",
            fontSize: "11px",
            letterSpacing: "5px",
            padding: "16px 40px",
            borderRadius: "12px",
            border: "1px solid rgba(200,110,15,0.4)",
            cursor: "pointer",
            background: "transparent",
            color: "rgba(200,110,15,0.8)",
            transition: "all 0.3s ease",
            marginTop: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(200,95,8,0.9)";
            e.currentTarget.style.color = "rgba(5,3,1,0.95)";
            e.currentTarget.style.borderColor = "rgba(200,95,8,0.9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "rgba(200,110,15,0.8)";
            e.currentTarget.style.borderColor = "rgba(200,110,15,0.4)";
          }}
        >
          VIEW THE COLLECTION
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
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "40px 20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "9px",
              letterSpacing: "6px",
              color: "rgba(200,110,15,0.6)",
              marginBottom: "8px",
            }}
          >
            VILLAIN CULTURE
          </p>
          <h1
            style={{
              fontFamily: "Metal Mania",
              fontSize: "clamp(28px, 4vw, 42px)",
              letterSpacing: "0.15em",
              color: "rgba(245,240,232,0.95)",
            }}
          >
            YOUR <span style={{ color: "rgba(200,110,15,1)" }}>ARSENAL</span>
          </h1>
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "10px",
              letterSpacing: "4px",
              color: "rgba(245,240,232,0.2)",
              marginTop: "8px",
            }}
          >
            {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"} SELECTED
          </p>
        </div>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "40px",
            alignItems: "start",
          }}
          className="cart-grid"
        >
          {/* LEFT — Cart items */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.size}`}
                style={{
                  display: "flex",
                  gap: "20px",
                  padding: "20px",
                  border: "1px solid rgba(200,110,15,0.12)",
                  borderRadius: "16px",
                  background: "rgba(18,10,4,0.8)",
                  alignItems: "center",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(200,110,15,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(200,110,15,0.12)")
                }
              >
                {/* Product image */}
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    background: "#1a1208",
                    borderRadius: "10px",
                    border: "1px solid rgba(200,110,15,0.15)",
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
                        fontFamily: "Special Elite",
                        fontSize: "8px",
                        color: "rgba(200,110,15,0.3)",
                        letterSpacing: "2px",
                        textAlign: "center",
                      }}
                    >
                      SOON
                    </p>
                  )}
                </div>

                {/* Product info */}
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "Metal Mania",
                      fontSize: "16px",
                      letterSpacing: "2px",
                      color: "rgba(245,240,232,0.9)",
                      marginBottom: "6px",
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "10px",
                      letterSpacing: "3px",
                      color: "rgba(200,110,15,0.6)",
                      marginBottom: "12px",
                    }}
                  >
                    SIZE: {item.size} · #{item.number}
                  </p>

                  {/* Quantity controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      style={{
                        width: "28px",
                        height: "28px",
                        border: "1px solid rgba(200,110,15,0.3)",
                        background: "transparent",
                        color: "rgba(200,110,15,0.8)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(200,110,15,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      −
                    </button>
                    <p
                      style={{
                        fontFamily: "Metal Mania",
                        fontSize: "16px",
                        color: "rgba(245,240,232,0.8)",
                        minWidth: "20px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </p>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      style={{
                        width: "28px",
                        height: "28px",
                        border: "1px solid rgba(200,110,15,0.3)",
                        background: "transparent",
                        color: "rgba(200,110,15,0.8)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(200,110,15,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
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
                    gap: "12px",
                    flexShrink: 0,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Metal Mania",
                      fontSize: "18px",
                      letterSpacing: "2px",
                      color: "rgba(200,110,15,0.9)",
                    }}
                  >
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "8px",
                      letterSpacing: "3px",
                      color: "rgba(200,0,0,0.4)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                      padding: 0,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "rgba(200,0,0,0.9)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(200,0,0,0.4)")
                    }
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}

            {/* Back to collections */}
            <button
              onClick={() => navigate("/collections")}
              style={{
                fontFamily: "Special Elite",
                fontSize: "10px",
                letterSpacing: "4px",
                color: "rgba(200,110,15,0.4)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "8px 0",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(200,110,15,0.8)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(200,110,15,0.4)")
              }
            >
              ← CONTINUE SHOPPING
            </button>
          </div>

          {/* RIGHT — Order summary */}
          <div
            style={{
              border: "1px solid rgba(200,110,15,0.15)",
              borderRadius: "16px",
              padding: "28px",
              background: "rgba(18,10,4,0.8)",
              position: "sticky",
              top: "100px",
            }}
          >
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "9px",
                letterSpacing: "5px",
                color: "rgba(200,110,15,0.6)",
                marginBottom: "20px",
              }}
            >
              ORDER SUMMARY
            </p>

            {/* Items breakdown */}
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}-summary`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "11px",
                    letterSpacing: "1px",
                    color: "rgba(245,240,232,0.4)",
                    flex: 1,
                    paddingRight: "12px",
                    lineHeight: 1.4,
                  }}
                >
                  {item.name}
                  <br />
                  <span
                    style={{ color: "rgba(200,110,15,0.4)", fontSize: "9px" }}
                  >
                    {item.size} × {item.quantity}
                  </span>
                </p>
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "12px",
                    letterSpacing: "1px",
                    color: "rgba(245,240,232,0.6)",
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
                margin: "20px 0",
              }}
            />

            {/* Subtotal */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "11px",
                  letterSpacing: "3px",
                  color: "rgba(245,240,232,0.3)",
                }}
              >
                SUBTOTAL
              </p>
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "12px",
                  color: "rgba(245,240,232,0.6)",
                }}
              >
                ${totalPrice.toFixed(2)}
              </p>
            </div>

            {/* Shipping */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "11px",
                  letterSpacing: "3px",
                  color: "rgba(245,240,232,0.3)",
                }}
              >
                SHIPPING
              </p>
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "12px",
                  color:
                    totalPrice >= 100
                      ? "rgba(0,180,0,0.7)"
                      : "rgba(245,240,232,0.6)",
                }}
              >
                {totalPrice >= 100 ? "FREE" : "$8.99"}
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: "rgba(200,110,15,0.1)",
                marginBottom: "20px",
              }}
            />

            {/* Total */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "28px",
              }}
            >
              <p
                style={{
                  fontFamily: "Metal Mania",
                  fontSize: "16px",
                  letterSpacing: "3px",
                  color: "rgba(245,240,232,0.9)",
                }}
              >
                TOTAL
              </p>
              <p
                style={{
                  fontFamily: "Metal Mania",
                  fontSize: "20px",
                  letterSpacing: "2px",
                  color: "rgba(200,110,15,1)",
                }}
              >
                $
                {(totalPrice >= 100 ? totalPrice : totalPrice + 8.99).toFixed(
                  2,
                )}
              </p>
            </div>

            {/* Free shipping notice */}
            {totalPrice < 100 && (
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "9px",
                  letterSpacing: "2px",
                  color: "rgba(200,110,15,0.4)",
                  textAlign: "center",
                  marginBottom: "20px",
                  lineHeight: 1.6,
                }}
              >
                ADD ${(100 - totalPrice).toFixed(2)} MORE FOR FREE SHIPPING
              </p>
            )}

            {/* Checkout button */}
            <button
              onClick={() => navigate("/checkout")}
              style={{
                fontFamily: "Special Elite",
                fontSize: "12px",
                letterSpacing: "5px",
                width: "100%",
                padding: "18px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                background:
                  "linear-gradient(135deg, rgba(210,105,8,0.95) 0%, rgba(180,80,5,0.95) 100%)",
                color: "rgba(5,3,1,0.95)",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(200,110,15,0.2)",
                marginBottom: "12px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(200,110,15,0.4)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(200,110,15,0.2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              PROCEED TO CHECKOUT
            </button>

            {/* Security note */}
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "8px",
                letterSpacing: "2px",
                color: "rgba(245,240,232,0.1)",
                textAlign: "center",
                lineHeight: 1.8,
              }}
            >
              SECURE CHECKOUT · VILLAIN CULTURE
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Cart;

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { stripePromise } from "../stripe";
import { useCart } from "../context/CartContext";

// ── CHECKOUT FORM ──
function CheckoutForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();

  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const shippingCost = totalPrice >= 100 ? 0 : 8.99;
  const total = totalPrice + shippingCost;

  const handleChange = (e) => {
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid =
    shipping.name &&
    shipping.email &&
    shipping.address &&
    shipping.city &&
    shipping.state &&
    shipping.zip;

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    if (!isFormValid) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    setStatus("processing");
    setErrorMessage("");

    try {
      // Create payment intent on Lambda
      const response = await fetch(
        "https://52m6m73pkj.execute-api.us-east-2.amazonaws.com/prod/payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            currency: "usd",
            items: cartItems.map((item) => ({
              name: item.name,
              size: item.size,
              quantity: item.quantity,
              price: item.price,
            })),
          }),
        },
      );

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: shipping.name,
            email: shipping.email,
            address: {
              line1: shipping.address,
              city: shipping.city,
              state: shipping.state,
              postal_code: shipping.zip,
            },
          },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
        setStatus("idle");
      } else {
        // Save items BEFORE clearing cart
        const orderItems = [...cartItems];
        const orderTotal = total;
        const orderId = result.paymentIntent.id;

        // Navigate first THEN clear cart
        navigate("/order-confirmation", {
          state: {
            shipping,
            items: orderItems,
            total: orderTotal,
            orderId,
          },
        });

        // Clear cart after navigation
        setTimeout(() => clearCart(), 500);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(200,110,15,0.2)",
    padding: "12px 0",
    color: "rgba(245,240,232,0.85)",
    fontFamily: "Special Elite",
    fontSize: "14px",
    letterSpacing: "2px",
    outline: "none",
    transition: "border-color 0.3s ease",
    marginBottom: "24px",
  };

  const labelStyle = {
    fontFamily: "Special Elite",
    fontSize: "8px",
    letterSpacing: "5px",
    color: "rgba(200,110,15,0.55)",
    display: "block",
    marginBottom: "6px",
  };

  return (
    <div
      style={{ background: "#030201", minHeight: "100vh", paddingTop: "80px" }}
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
            SECURE <span style={{ color: "rgba(200,110,15,1)" }}>CHECKOUT</span>
          </h1>
        </div>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "40px",
            alignItems: "start",
          }}
          className="checkout-grid"
        >
          {/* LEFT — Forms */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            {/* Shipping info */}
            <div
              style={{
                border: "1px solid rgba(200,110,15,0.15)",
                borderRadius: "16px",
                padding: "28px",
                background: "rgba(18,10,4,0.8)",
              }}
            >
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "9px",
                  letterSpacing: "5px",
                  color: "rgba(200,110,15,0.6)",
                  marginBottom: "24px",
                }}
              >
                SHIPPING INFORMATION
              </p>

              <label style={labelStyle}>FULL NAME</label>
              <input
                type="text"
                name="name"
                value={shipping.name}
                onChange={handleChange}
                placeholder="Your full name"
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor = "rgba(200,110,15,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.borderBottomColor = "rgba(200,110,15,0.2)")
                }
              />

              <label style={labelStyle}>EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                value={shipping.email}
                onChange={handleChange}
                placeholder="Your email"
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor = "rgba(200,110,15,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.borderBottomColor = "rgba(200,110,15,0.2)")
                }
              />

              <label style={labelStyle}>STREET ADDRESS</label>
              <input
                type="text"
                name="address"
                value={shipping.address}
                onChange={handleChange}
                placeholder="123 Villain Street"
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor = "rgba(200,110,15,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.borderBottomColor = "rgba(200,110,15,0.2)")
                }
              />

              {/* City State Zip */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px 100px",
                  gap: "16px",
                }}
              >
                <div>
                  <label style={labelStyle}>CITY</label>
                  <input
                    type="text"
                    name="city"
                    value={shipping.city}
                    onChange={handleChange}
                    placeholder="City"
                    style={{ ...inputStyle, marginBottom: 0 }}
                    onFocus={(e) =>
                      (e.target.style.borderBottomColor =
                        "rgba(200,110,15,0.6)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor =
                        "rgba(200,110,15,0.2)")
                    }
                  />
                </div>
                <div>
                  <label style={labelStyle}>STATE</label>
                  <input
                    type="text"
                    name="state"
                    value={shipping.state}
                    onChange={handleChange}
                    placeholder="MS"
                    style={{ ...inputStyle, marginBottom: 0 }}
                    onFocus={(e) =>
                      (e.target.style.borderBottomColor =
                        "rgba(200,110,15,0.6)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor =
                        "rgba(200,110,15,0.2)")
                    }
                  />
                </div>
                <div>
                  <label style={labelStyle}>ZIP CODE</label>
                  <input
                    type="text"
                    name="zip"
                    value={shipping.zip}
                    onChange={handleChange}
                    placeholder="39401"
                    style={{ ...inputStyle, marginBottom: 0 }}
                    onFocus={(e) =>
                      (e.target.style.borderBottomColor =
                        "rgba(200,110,15,0.6)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor =
                        "rgba(200,110,15,0.2)")
                    }
                  />
                </div>
              </div>
            </div>

            {/* Payment info */}
            <div
              style={{
                border: "1px solid rgba(200,110,15,0.15)",
                borderRadius: "16px",
                padding: "28px",
                background: "rgba(18,10,4,0.8)",
              }}
            >
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "9px",
                  letterSpacing: "5px",
                  color: "rgba(200,110,15,0.6)",
                  marginBottom: "24px",
                }}
              >
                PAYMENT INFORMATION
              </p>

              <div
                style={{
                  border: "none",
                  borderBottom: "1px solid rgba(200,110,15,0.2)",
                  padding: "12px 0",
                  marginBottom: "8px",
                }}
              >
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontFamily: "Special Elite, serif",
                        fontSize: "14px",
                        color: "rgba(245,240,232,0.85)",
                        letterSpacing: "2px",
                        "::placeholder": {
                          color: "rgba(245,240,232,0.2)",
                        },
                      },
                      invalid: {
                        color: "#CC0000",
                      },
                    },
                    hidePostalCode: true,
                  }}
                />
              </div>

              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "8px",
                  letterSpacing: "3px",
                  color: "rgba(245,240,232,0.15)",
                  marginTop: "12px",
                }}
              >
                SECURED BY STRIPE · 256-BIT ENCRYPTION
              </p>
            </div>

            {/* Error message */}
            {errorMessage && (
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  color: "rgba(200,0,0,0.8)",
                  padding: "12px 16px",
                  border: "1px solid rgba(200,0,0,0.3)",
                  borderRadius: "8px",
                }}
              >
                {errorMessage}
              </p>
            )}
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

            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "16px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#1a1208",
                    borderRadius: "8px",
                    border: "1px solid rgba(200,110,15,0.15)",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "4px",
                      }}
                    />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "11px",
                      letterSpacing: "1px",
                      color: "rgba(245,240,232,0.7)",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "9px",
                      letterSpacing: "2px",
                      color: "rgba(200,110,15,0.4)",
                    }}
                  >
                    {item.size} × {item.quantity}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "12px",
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
                ${total.toFixed(2)}
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

            {/* Place order button */}
            <button
              onClick={handleSubmit}
              disabled={status === "processing" || !stripe}
              style={{
                fontFamily: "Special Elite",
                fontSize: "12px",
                letterSpacing: "5px",
                width: "100%",
                padding: "18px",
                borderRadius: "12px",
                border: "none",
                cursor: status === "processing" ? "not-allowed" : "pointer",
                background:
                  status === "processing"
                    ? "rgba(200,95,8,0.4)"
                    : "linear-gradient(135deg, rgba(210,105,8,0.95) 0%, rgba(180,80,5,0.95) 100%)",
                color: "rgba(5,3,1,0.95)",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(200,110,15,0.2)",
                marginBottom: "12px",
              }}
              onMouseEnter={(e) => {
                if (status !== "processing") {
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(200,110,15,0.4)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(200,110,15,0.2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {status === "processing" ? "PROCESSING..." : "PLACE ORDER"}
            </button>

            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "8px",
                letterSpacing: "2px",
                color: "rgba(245,240,232,0.1)",
                textAlign: "center",
              }}
            >
              SECURED BY STRIPE · VILLAIN CULTURE
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// ── WRAP WITH STRIPE ELEMENTS ──
function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const paymentSuccessful = useRef(false);

  useEffect(() => {
    if (cartItems.length === 0 && !paymentSuccessful.current) {
      navigate("/cart");
    }
  }, [cartItems]);

  if (cartItems.length === 0 && !paymentSuccessful.current) return null;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        onSuccess={() => {
          paymentSuccessful.current = true;
        }}
      />
    </Elements>
  );
}

export default Checkout;

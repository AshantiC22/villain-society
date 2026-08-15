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

// ── STEP INDICATOR ──
function StepIndicator({ currentStep }) {
  const steps = ["SHIPPING", "PAYMENT", "CONFIRM"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0",
        marginBottom: "48px",
      }}
    >
      {steps.map((step, i) => (
        <div
          key={step}
          style={{
            display: "flex",
            alignItems: "center",
            flex: i < steps.length - 1 ? 1 : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: i <= currentStep ? C.red : "transparent",
                border: `1px solid ${i <= currentStep ? C.red : C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {i < currentStep ? (
                <span style={{ color: C.text, fontSize: "10px" }}>✓</span>
              ) : (
                <span
                  style={{
                    fontFamily: F.body,
                    fontSize: "8px",
                    color: i === currentStep ? C.text : C.textLow,
                  }}
                >
                  {i + 1}
                </span>
              )}
            </div>
            <p
              style={{
                fontFamily: F.body,
                fontSize: "8px",
                letterSpacing: "3px",
                color: i <= currentStep ? C.text : C.textLow,
                whiteSpace: "nowrap",
              }}
            >
              {step}
            </p>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: "1px",
                background: i < currentStep ? C.red : C.border,
                margin: "0 16px",
                transition: "background 0.3s ease",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── FORM INPUT ──
function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  optional = false,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <label
          style={{
            fontFamily: F.body,
            fontSize: "8px",
            letterSpacing: "4px",
            color: C.textLow,
            display: "block",
          }}
        >
          {label}
        </label>
        {optional && (
          <span
            style={{
              fontFamily: F.body,
              fontSize: "7px",
              letterSpacing: "2px",
              color: "rgba(245,240,232,0.1)",
            }}
          >
            OPTIONAL
          </span>
        )}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "#0f0f0f",
          border: `1px solid ${C.border}`,
          borderRadius: "4px",
          padding: "12px 16px",
          color: C.text,
          fontFamily: F.body,
          fontSize: "13px",
          letterSpacing: "1px",
          outline: "none",
          transition: "border-color 0.2s ease",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.2)")}
        onBlur={(e) => (e.target.style.borderColor = C.border)}
      />
    </div>
  );
}

// ── FORM SELECT ──
function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  optional = false,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <label
          style={{
            fontFamily: F.body,
            fontSize: "8px",
            letterSpacing: "4px",
            color: C.textLow,
            display: "block",
          }}
        >
          {label}
        </label>
        {optional && (
          <span
            style={{
              fontFamily: F.body,
              fontSize: "7px",
              letterSpacing: "2px",
              color: "rgba(245,240,232,0.1)",
            }}
          >
            OPTIONAL
          </span>
        )}
      </div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          background: "#0f0f0f",
          border: `1px solid ${C.border}`,
          borderRadius: "4px",
          padding: "12px 16px",
          color: value ? C.text : C.textLow,
          fontFamily: F.body,
          fontSize: "13px",
          letterSpacing: "1px",
          outline: "none",
          transition: "border-color 0.2s ease",
          boxSizing: "border-box",
          cursor: "pointer",
          appearance: "none",
          WebkitAppearance: "none",
        }}
        onFocus={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.2)")}
        onBlur={(e) => (e.target.style.borderColor = C.border)}
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            style={{ background: "#111111", color: C.text }}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ── US STATES ──
const US_STATES = [
  { value: "", label: "Select state..." },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "Washington DC" },
  { value: "PR", label: "Puerto Rico" },
];

// ── CHECKOUT FORM ──
function CheckoutForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const shippingCost = totalPrice >= 100 ? 0 : 8.99;
  const total = totalPrice + shippingCost;

  const handleChange = (e) =>
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const isShippingValid =
    shipping.name &&
    shipping.email &&
    shipping.address &&
    shipping.city &&
    shipping.state &&
    shipping.zip;

  // ── BUILD FULL ADDRESS FOR DISPLAY ──
  const fullAddress = [
    shipping.address,
    shipping.address2,
    `${shipping.city}, ${shipping.state} ${shipping.zip}`,
  ]
    .filter(Boolean)
    .join(", ");

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    if (!isShippingValid) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    setStatus("processing");
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://52m6m73pkj.execute-api.us-east-2.amazonaws.com/prod/payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            currency: "usd",
            shipping,
            items: cartItems.map((item) => ({
              name: item.name,
              size: item.size,
              quantity: item.quantity,
              price: item.price,
            })),
          }),
        },
      );

      const data = await response.json();

      if (!data.clientSecret) {
        setErrorMessage("Payment setup failed. Please try again.");
        setStatus("idle");
        return;
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: shipping.name,
            email: shipping.email,
            phone: shipping.phone,
            address: {
              line1: shipping.address,
              line2: shipping.address2,
              city: shipping.city,
              state: shipping.state,
              postal_code: shipping.zip,
              country: shipping.country,
            },
          },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
        setStatus("idle");
      } else {
        const orderItems = [...cartItems];
        onSuccess();
        navigate("/order-confirmation", {
          state: {
            shipping,
            items: orderItems,
            total,
            orderId: result.paymentIntent.id,
          },
        });
        setTimeout(() => clearCart(), 500);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", paddingTop: "102px" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
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
            CHECKOUT
          </h1>
        </div>

        {/* Step indicator */}
        <StepIndicator currentStep={step} />

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "48px",
            alignItems: "start",
          }}
          className="checkout-grid"
        >
          {/* LEFT — Forms */}
          <div>
            {/* ── STEP 0 — SHIPPING ── */}
            {step === 0 && (
              <div>
                <div
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: "4px",
                    overflow: "hidden",
                    marginBottom: "24px",
                  }}
                >
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
                      SHIPPING INFORMATION
                    </p>
                  </div>

                  <div style={{ padding: "24px" }}>
                    {/* Contact */}
                    <p
                      style={{
                        fontFamily: F.body,
                        fontSize: "7px",
                        letterSpacing: "4px",
                        color: "rgba(245,240,232,0.1)",
                        marginBottom: "16px",
                      }}
                    >
                      CONTACT
                    </p>

                    <FormInput
                      label="FULL NAME"
                      name="name"
                      value={shipping.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                      }}
                    >
                      <FormInput
                        label="EMAIL ADDRESS"
                        name="email"
                        type="email"
                        value={shipping.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                      />
                      <FormInput
                        label="PHONE NUMBER"
                        name="phone"
                        type="tel"
                        value={shipping.phone}
                        onChange={handleChange}
                        placeholder="(601) 555-0100"
                        optional
                      />
                    </div>

                    {/* Divider */}
                    <div
                      style={{
                        height: "1px",
                        background: C.border,
                        margin: "8px 0 24px",
                      }}
                    />

                    {/* Address */}
                    <p
                      style={{
                        fontFamily: F.body,
                        fontSize: "7px",
                        letterSpacing: "4px",
                        color: "rgba(245,240,232,0.1)",
                        marginBottom: "16px",
                      }}
                    >
                      ADDRESS
                    </p>

                    <FormInput
                      label="STREET ADDRESS"
                      name="address"
                      value={shipping.address}
                      onChange={handleChange}
                      placeholder="123 Villain Street"
                    />

                    <FormInput
                      label="APARTMENT, SUITE, UNIT, PO BOX"
                      name="address2"
                      value={shipping.address2}
                      onChange={handleChange}
                      placeholder="Apt 4B, Suite 100, PO Box 1234, Unit 2..."
                      optional
                    />

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                      }}
                    >
                      <FormInput
                        label="CITY"
                        name="city"
                        value={shipping.city}
                        onChange={handleChange}
                        placeholder="City"
                      />
                      <FormInput
                        label="ZIP CODE"
                        name="zip"
                        value={shipping.zip}
                        onChange={handleChange}
                        placeholder="39401"
                      />
                    </div>

                    <FormSelect
                      label="STATE"
                      name="state"
                      value={shipping.state}
                      onChange={handleChange}
                      options={US_STATES}
                    />

                    {/* Delivery note */}
                    <div
                      style={{
                        background: "rgba(245,240,232,0.02)",
                        border: `1px solid ${C.border}`,
                        borderRadius: "4px",
                        padding: "14px 16px",
                        marginTop: "4px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: F.body,
                          fontSize: "8px",
                          letterSpacing: "2px",
                          color: C.textLow,
                          lineHeight: 1.8,
                        }}
                      >
                        · PO Boxes accepted — standard delivery only
                        <br />
                        · Apartment number required for accurate delivery
                        <br />
                        · Ships to all 50 states + DC + Puerto Rico
                        <br />· Tracking number sent via email after shipment
                      </p>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {errorMessage && (
                  <div
                    style={{
                      background: "rgba(204,0,0,0.06)",
                      border: `1px solid rgba(204,0,0,0.3)`,
                      borderRadius: "4px",
                      padding: "12px 16px",
                      marginBottom: "16px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: F.body,
                        fontSize: "11px",
                        letterSpacing: "1px",
                        color: C.red,
                      }}
                    >
                      {errorMessage}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (isShippingValid) {
                      setStep(1);
                      setErrorMessage("");
                    } else
                      setErrorMessage("Please fill in all required fields");
                  }}
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
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = C.redHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = C.red)
                  }
                >
                  CONTINUE TO PAYMENT →
                </button>
              </div>
            )}

            {/* ── STEP 1 — PAYMENT ── */}
            {step === 1 && (
              <div>
                {/* Shipping summary */}
                <div
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: "4px",
                    padding: "16px 20px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: F.body,
                          fontSize: "8px",
                          letterSpacing: "4px",
                          color: C.textLow,
                          marginBottom: "6px",
                        }}
                      >
                        SHIPPING TO
                      </p>
                      <p
                        style={{
                          fontFamily: F.body,
                          fontSize: "12px",
                          letterSpacing: "1px",
                          color: C.textMid,
                          marginBottom: "2px",
                        }}
                      >
                        {shipping.name}
                      </p>
                      <p
                        style={{
                          fontFamily: F.body,
                          fontSize: "11px",
                          letterSpacing: "0.5px",
                          color: C.textLow,
                          lineHeight: 1.6,
                        }}
                      >
                        {shipping.address}
                        {shipping.address2 ? `, ${shipping.address2}` : ""}
                        <br />
                        {shipping.city}, {shipping.state} {shipping.zip}
                      </p>
                      {shipping.phone && (
                        <p
                          style={{
                            fontFamily: F.body,
                            fontSize: "10px",
                            letterSpacing: "1px",
                            color: C.textLow,
                            marginTop: "2px",
                          }}
                        >
                          {shipping.phone}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setStep(0)}
                      style={{
                        fontFamily: F.body,
                        fontSize: "8px",
                        letterSpacing: "3px",
                        color: C.textLow,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "underline",
                        flexShrink: 0,
                        paddingLeft: "16px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = C.text)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = C.textLow)
                      }
                    >
                      EDIT
                    </button>
                  </div>
                </div>

                {/* Card input */}
                <div
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: "4px",
                    overflow: "hidden",
                    marginBottom: "24px",
                  }}
                >
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
                      PAYMENT INFORMATION
                    </p>
                  </div>
                  <div style={{ padding: "24px" }}>
                    <div
                      style={{
                        background: "#0f0f0f",
                        border: `1px solid ${C.border}`,
                        borderRadius: "4px",
                        padding: "14px 16px",
                        marginBottom: "16px",
                      }}
                    >
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontFamily: "Special Elite, serif",
                              fontSize: "14px",
                              color: C.text,
                              letterSpacing: "1px",
                              "::placeholder": { color: C.textLow },
                            },
                            invalid: { color: C.red },
                          },
                          hidePostalCode: true,
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontFamily: F.body,
                        fontSize: "8px",
                        letterSpacing: "2px",
                        color: C.textLow,
                      }}
                    >
                      🔒 Secured by Stripe · 256-bit SSL encryption
                    </p>
                  </div>
                </div>

                {/* Error */}
                {errorMessage && (
                  <div
                    style={{
                      background: "rgba(204,0,0,0.06)",
                      border: `1px solid rgba(204,0,0,0.3)`,
                      borderRadius: "4px",
                      padding: "12px 16px",
                      marginBottom: "16px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: F.body,
                        fontSize: "11px",
                        letterSpacing: "1px",
                        color: C.red,
                      }}
                    >
                      {errorMessage}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === "processing" || !stripe}
                  style={{
                    fontFamily: F.body,
                    fontSize: "11px",
                    letterSpacing: "5px",
                    width: "100%",
                    padding: "16px",
                    background:
                      status === "processing" ? "rgba(204,0,0,0.4)" : C.red,
                    border: "none",
                    borderRadius: "4px",
                    color: C.text,
                    cursor: status === "processing" ? "not-allowed" : "pointer",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "processing")
                      e.currentTarget.style.background = C.redHover;
                  }}
                  onMouseLeave={(e) => {
                    if (status !== "processing")
                      e.currentTarget.style.background = C.red;
                  }}
                >
                  {status === "processing" ? "PROCESSING..." : "PLACE ORDER"}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT — Order summary */}
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

            <div
              style={{
                padding: "20px 24px",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
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
                      width: "48px",
                      height: "48px",
                      background: "#0f0f0f",
                      border: `1px solid ${C.border}`,
                      borderRadius: "4px",
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
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: F.body,
                        fontSize: "11px",
                        letterSpacing: "0.5px",
                        color: C.textMid,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
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

            <div
              style={{
                padding: "16px 24px",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
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

            <div style={{ padding: "16px 24px" }}>
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
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ── WRAP WITH STRIPE ──
function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const paymentSuccessful = useRef(false);

  useEffect(() => {
    if (cartItems.length === 0 && !paymentSuccessful.current) navigate("/cart");
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

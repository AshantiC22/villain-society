import { useNavigate } from "react-router-dom";

function ShippingPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "PROCESSING TIME",
      content: [
        "All Villain Culture orders are processed within 2-3 business days after payment confirmation.",
        "Orders are not processed or shipped on weekends or holidays.",
        "You will receive an email confirmation once your order has been shipped.",
      ],
    },
    {
      title: "SHIPPING CARRIERS",
      content: [
        "We ship all domestic orders via UPS or FedEx depending on your location.",
        "Carrier selection is made at our discretion to ensure the fastest and most reliable delivery.",
        "A tracking number will be provided via email once your order ships.",
      ],
    },
    {
      title: "DOMESTIC SHIPPING",
      content: [
        "Standard shipping within the United States takes 5-7 business days after processing.",
        "Free shipping is available on all orders over $100.",
        "Orders under $100 are subject to a flat shipping fee of $8.99.",
      ],
    },
    {
      title: "INTERNATIONAL SHIPPING",
      content: [
        "Villain Culture ships internationally to select countries.",
        "International orders may take 10-21 business days depending on destination and customs processing.",
        "International customers are responsible for all customs duties taxes and import fees.",
        "Villain Culture is not responsible for delays caused by customs processing.",
      ],
    },
    {
      title: "ORDER TRACKING",
      content: [
        "Once your order ships you will receive a tracking number via email.",
        "You can use this number to track your order directly on the UPS or FedEx website.",
        "Please allow 24 hours for tracking information to update after receiving your confirmation email.",
      ],
    },
    {
      title: "LOST OR DAMAGED PACKAGES",
      content: [
        "If your package is lost or arrives damaged please contact us at villain@vllnculture.com within 7 days of the expected delivery date.",
        "We will work with the carrier to resolve the issue as quickly as possible.",
        "Villain Culture is not responsible for packages marked as delivered by the carrier.",
      ],
    },
  ];

  return (
    <div
      style={{ background: "#030201", minHeight: "100vh", paddingTop: "80px" }}
    >
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
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px 20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            fontFamily: "Special Elite",
            fontSize: "10px",
            letterSpacing: "4px",
            color: "rgba(200,110,15,0.5)",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginBottom: "40px",
            padding: 0,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(200,110,15,0.9)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(200,110,15,0.5)")
          }
        >
          ← BACK
        </button>

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
            marginBottom: "8px",
          }}
        >
          SHIPPING <span style={{ color: "rgba(200,110,15,1)" }}>POLICY</span>
        </h1>
        <p
          style={{
            fontFamily: "Special Elite",
            fontSize: "11px",
            letterSpacing: "3px",
            color: "rgba(245,240,232,0.2)",
            marginBottom: "40px",
          }}
        >
          LAST UPDATED: AUGUST 2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {sections.map((section) => (
            <div
              key={section.title}
              style={{
                border: "1px solid rgba(200,110,15,0.12)",
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
                  marginBottom: "16px",
                }}
              >
                {section.title}
              </p>
              {section.content.map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "12px",
                    letterSpacing: "1px",
                    color: "rgba(245,240,232,0.35)",
                    lineHeight: 1.9,
                    marginBottom: "8px",
                  }}
                >
                  · {text}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            border: "1px solid rgba(200,110,15,0.1)",
            borderRadius: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "10px",
              letterSpacing: "3px",
              color: "rgba(245,240,232,0.2)",
              lineHeight: 1.8,
            }}
          >
            Questions about your order? Contact us at villain@vllnculture.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShippingPolicy;

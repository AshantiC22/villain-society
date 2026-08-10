import { useNavigate } from "react-router-dom";

function ReturnsPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "RETURN ELIGIBILITY",
      content: [
        "We accept returns within 30 days of the delivery date.",
        "Items must be unworn unwashed and in original condition with all tags still attached.",
        "Items that show signs of wear damage or alteration will not be accepted.",
        "Sale items and limited edition pieces are final sale and cannot be returned.",
      ],
    },
    {
      title: "HOW TO INITIATE A RETURN",
      content: [
        "Email us at villain@vllnculture.com with your order number and reason for return.",
        "Our team will respond within 2 business days with return instructions.",
        "Do not ship items back without first receiving approval from our team.",
        "Unauthorized returns will not be accepted or refunded.",
      ],
    },
    {
      title: "RETURN SHIPPING",
      content: [
        "Villain Culture covers the cost of return shipping on all eligible returns.",
        "We will provide a prepaid return shipping label via email once your return is approved.",
        "Please use the provided label to ensure your return is tracked and processed.",
      ],
    },
    {
      title: "REFUNDS",
      content: [
        "Once your return is received and inspected we will notify you of the approval or rejection.",
        "Approved refunds will be processed to your original payment method within 5-10 business days.",
        "Please allow additional time for your bank or card issuer to process the refund.",
        "Original shipping fees are non-refundable.",
      ],
    },
    {
      title: "EXCHANGES",
      content: [
        "We are happy to exchange items for a different size or color.",
        "To request an exchange email us at villain@vllnculture.com with your order number.",
        "Exchanges are subject to product availability.",
        "If the requested exchange item is unavailable we will issue a full refund instead.",
      ],
    },
    {
      title: "DAMAGED OR INCORRECT ITEMS",
      content: [
        "If you receive a damaged or incorrect item please contact us within 7 days of delivery.",
        "Email villain@vllnculture.com with your order number and photos of the issue.",
        "We will send a replacement or issue a full refund at no additional cost to you.",
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
          RETURNS <span style={{ color: "rgba(200,110,15,1)" }}>POLICY</span>
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
            Questions about your return? Contact us at villain@vllnculture.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReturnsPolicy;

import { useNavigate } from "react-router-dom";

function PrivacyPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "INFORMATION WE COLLECT",
      content: [
        "When you place an order we collect your name email address shipping address and payment information.",
        "Payment information is processed securely by Stripe and is never stored on our servers.",
        "When you join our waitlist we collect your email address and product preferences.",
        "When you submit a contact form we collect your name email address and message.",
        "We may collect browsing data such as pages visited and time spent on our site.",
      ],
    },
    {
      title: "HOW WE USE YOUR INFORMATION",
      content: [
        "To process and fulfill your orders.",
        "To send order confirmation and shipping notifications.",
        "To respond to your inquiries and customer service requests.",
        "To send marketing emails if you have opted in to receive them.",
        "To improve our website and customer experience.",
        "To comply with legal obligations.",
      ],
    },
    {
      title: "HOW WE PROTECT YOUR INFORMATION",
      content: [
        "All data is transmitted using SSL encryption.",
        "Payment processing is handled by Stripe which is PCI DSS compliant.",
        "We store customer data securely using Amazon Web Services.",
        "We do not sell rent or share your personal information with third parties for marketing purposes.",
      ],
    },
    {
      title: "COOKIES",
      content: [
        "Our website uses cookies to improve your browsing experience.",
        "Cookies help us remember your preferences and shopping cart contents.",
        "You can disable cookies in your browser settings however some features may not work correctly.",
      ],
    },
    {
      title: "THIRD PARTY SERVICES",
      content: [
        "We use Stripe for payment processing. View their privacy policy at stripe.com/privacy",
        "We use Amazon Web Services for data storage and email services.",
        "We use GitHub for code hosting and deployment.",
        "These services have their own privacy policies and we encourage you to review them.",
      ],
    },
    {
      title: "YOUR RIGHTS",
      content: [
        "You have the right to access the personal information we hold about you.",
        "You have the right to request correction or deletion of your personal information.",
        "You can unsubscribe from marketing emails at any time using the unsubscribe link.",
        "To exercise any of these rights contact us at villain@vllnculture.com",
      ],
    },
    {
      title: "CONTACT US",
      content: [
        "If you have any questions about this privacy policy please contact us at villain@vllnculture.com",
        "Villain Culture reserves the right to update this privacy policy at any time.",
        "Changes will be posted on this page with an updated date.",
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
          PRIVACY <span style={{ color: "rgba(200,110,15,1)" }}>POLICY</span>
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
      </div>
    </div>
  );
}

export default PrivacyPolicy;

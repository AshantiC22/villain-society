import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { submitWaitlist } from "../api";

// ── STATIC PRODUCT DATA ──
const STATIC_PRODUCTS = [
  {
    id: 1,
    number: "001",
    roman: "I",
    subtitle: "THE FOUNDATION",
    images: ["/products/villain-front.png", "/products/villain-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "SIGNATURE DROP",
  },
  {
    id: 2,
    number: "002",
    roman: "II",
    subtitle: "THE MARK",
    images: ["/products/product-2-front.png", "/products/product-2-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "CORE PIECE",
  },
  {
    id: 3,
    number: "003",
    roman: "III",
    subtitle: "THE MOVEMENT",
    images: ["/products/product-3-front.png", "/products/product-3-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "CORE PIECE",
  },
  {
    id: 4,
    number: "004",
    roman: "IV",
    subtitle: "THE SHIELD",
    images: ["/products/product-4-front.png", "/products/product-4-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "LIMITED",
  },
  {
    id: 5,
    number: "005",
    roman: "V",
    subtitle: "THE SPEED",
    images: ["/products/product-5-front.png", "/products/product-5-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "CORE PIECE",
  },
  {
    id: 6,
    number: "006",
    roman: "VI",
    subtitle: "THE UTILITY",
    images: ["/products/product-6-front.png", "/products/product-6-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "LIMITED",
  },
  {
    id: 7,
    number: "007",
    roman: "VII",
    subtitle: "THE SHADOW",
    images: ["/products/product-7-front.png", "/products/product-7-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "CORE PIECE",
  },
  {
    id: 8,
    number: "008",
    roman: "VIII",
    subtitle: "THE REBEL",
    images: ["/products/product-8-front.png", "/products/product-8-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "SIGNATURE DROP",
  },
  {
    id: 9,
    number: "009",
    roman: "IX",
    subtitle: "THE CROWN",
    images: ["/products/product-9-front.png"],
    sizes: ["ONE SIZE"],
    tag: "ACCESSORY",
  },
];

// ── CONSTANTS ──
const FILTERS = ["ALL", "SIGNATURE DROP", "LIMITED", "CORE PIECE", "ACCESSORY"];

const TAG_STYLES = {
  "SIGNATURE DROP": {
    border: "rgba(200,110,15,0.7)",
    color: "rgba(200,110,15,1)",
    bg: "rgba(200,110,15,0.12)",
  },
  LIMITED: {
    border: "rgba(200,0,0,0.7)",
    color: "rgba(255,60,60,0.9)",
    bg: "rgba(200,0,0,0.12)",
  },
  "CORE PIECE": {
    border: "rgba(180,180,180,0.4)",
    color: "rgba(220,215,205,0.7)",
    bg: "rgba(180,180,180,0.06)",
  },
  ACCESSORY: {
    border: "rgba(200,110,15,0.5)",
    color: "rgba(200,110,15,0.8)",
    bg: "rgba(200,110,15,0.08)",
  },
};

// ── FLOATING PARTICLES ──
function Particles() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 2 + 1 + "px",
            height: Math.random() * 2 + 1 + "px",
            borderRadius: "50%",
            background:
              i % 3 === 0
                ? "rgba(200,110,15,0.6)"
                : i % 3 === 1
                  ? "rgba(200,0,0,0.4)"
                  : "rgba(245,240,232,0.2)",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animation: `float${i % 4} ${6 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: Math.random() * 4 + "s",
          }}
        />
      ))}
      <style>{`
        @keyframes float0 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-30px) translateX(10px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-20px) translateX(-15px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-40px) translateX(5px)} }
        @keyframes float3 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-25px) translateX(-8px)} }
      `}</style>
    </div>
  );
}

// ── PRODUCT CARD ──
function ProductCard({ product, index, onClick }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const tagStyle = TAG_STYLES[product.tag] || TAG_STYLES["CORE PIECE"];
  const tilt = (index % 2 === 0 ? 1 : -1) * (0.3 + (index % 3) * 0.2);

  return (
    <div
      style={{
        perspective: "1200px",
        cursor: "pointer",
        aspectRatio: "2/3",
        transform: hovered
          ? "rotate(0deg) scale(1.03)"
          : `rotate(${tilt}deg) scale(1)`,
        transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
        zIndex: hovered ? 10 : 1,
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (!flipped) setFlipped(true);
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: "16px",
            overflow: "hidden",
            background:
              "linear-gradient(145deg, rgba(18,10,4,0.95), rgba(8,4,2,0.98))",
            border: `1px solid ${hovered ? tagStyle.border : "rgba(200,110,15,0.15)"}`,
            boxShadow: hovered
              ? `0 30px 80px rgba(0,0,0,0.8), 0 0 40px ${tagStyle.bg}`
              : "0 10px 40px rgba(0,0,0,0.6)",
            transition: "all 0.4s ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: `linear-gradient(to right, transparent, ${tagStyle.color}, transparent)`,
              opacity: hovered ? 0.8 : 0.3,
              zIndex: 3,
              transition: "opacity 0.4s ease",
            }}
          />

          <div
            style={{
              width: "100%",
              height: "75%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(8,4,2,0.95) 100%)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(8,4,2,0.3), transparent 30%, transparent 70%, rgba(8,4,2,0.3))",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />

            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: "16px",
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.6s ease",
                  filter: hovered ? "brightness(1.1)" : "brightness(0.95)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "Metal Mania",
                    fontSize: "11px",
                    letterSpacing: "4px",
                    color: "rgba(200,110,15,0.3)",
                  }}
                >
                  COMING SOON
                </p>
              </div>
            )}

            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "12px",
                zIndex: 4,
              }}
            >
              <p
                style={{
                  fontFamily: "Metal Mania",
                  fontSize: "24px",
                  color: "rgba(200,110,15,0.12)",
                  lineHeight: 1,
                }}
              >
                {product.roman}
              </p>
            </div>

            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                zIndex: 4,
                border: `1px solid ${tagStyle.border}`,
                background: tagStyle.bg,
                padding: "3px 10px",
                borderRadius: "4px",
                transform: "rotate(2deg)",
              }}
            >
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "7px",
                  letterSpacing: "2px",
                  color: tagStyle.color,
                }}
              >
                {product.tag}
              </p>
            </div>
          </div>

          <div
            style={{
              padding: "12px 16px 16px",
              height: "25%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                height: "1px",
                background: `linear-gradient(to right, transparent, ${tagStyle.border}, transparent)`,
                opacity: 0.3,
                marginBottom: "10px",
              }}
            />
            <p
              style={{
                fontFamily: "Metal Mania",
                fontSize: "clamp(11px, 1.1vw, 14px)",
                letterSpacing: "1px",
                color: "rgba(245,240,232,0.92)",
                lineHeight: 1.2,
                marginBottom: "8px",
              }}
            >
              {product.name}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "Metal Mania",
                  fontSize: "16px",
                  color: "rgba(200,110,15,1)",
                  letterSpacing: "1px",
                }}
              >
                ${product.price}
              </p>
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "7px",
                  letterSpacing: "2px",
                  color: "rgba(245,240,232,0.2)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              >
                TAP →
              </p>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "16px",
            background:
              "linear-gradient(145deg, rgba(20,10,3,0.99), rgba(10,5,1,0.99))",
            border: `1px solid ${tagStyle.border}`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 60px ${tagStyle.bg}`,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setFlipped(false);
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: `linear-gradient(to right, transparent, ${tagStyle.color}, transparent)`,
              opacity: 0.9,
            }}
          />
          <p
            style={{
              position: "absolute",
              bottom: "-20px",
              right: "-10px",
              fontFamily: "Metal Mania",
              fontSize: "120px",
              color: "rgba(200,110,15,0.03)",
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {product.roman}
          </p>

          <div>
            <h3
              style={{
                fontFamily: "Metal Mania",
                fontSize: "clamp(14px, 1.4vw, 18px)",
                letterSpacing: "2px",
                color: "rgba(245,240,232,0.97)",
                marginBottom: "12px",
                lineHeight: 1.2,
              }}
            >
              {product.name}
            </h3>
            <div
              style={{
                height: "1px",
                background: `linear-gradient(to right, ${tagStyle.color}, transparent)`,
                marginBottom: "14px",
                opacity: 0.5,
              }}
            />

            {product.description && (
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "13px",
                  letterSpacing: "1px",
                  color: "rgba(245,240,232,0.55)",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                  marginBottom: "16px",
                }}
              >
                "{product.description}"
              </p>
            )}

            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "7px",
                letterSpacing: "4px",
                color: "rgba(200,110,15,0.45)",
                marginBottom: "8px",
              }}
            >
              AVAILABLE SIZES
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                marginBottom: "16px",
              }}
            >
              {product.sizes.map((size) => (
                <span
                  key={size}
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "8px",
                    letterSpacing: "1px",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    border: "1px solid rgba(200,110,15,0.2)",
                    color: "rgba(245,240,232,0.4)",
                    background: "rgba(200,110,15,0.04)",
                  }}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: "Metal Mania",
                fontSize: "24px",
                letterSpacing: "2px",
                color: tagStyle.color,
                marginBottom: "12px",
              }}
            >
              ${product.price}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick(product);
              }}
              style={{
                fontFamily: "Special Elite",
                fontSize: "10px",
                letterSpacing: "4px",
                width: "100%",
                padding: "13px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                background:
                  "linear-gradient(135deg, rgba(210,105,8,0.95), rgba(180,80,5,0.95))",
                color: "rgba(5,3,1,0.95)",
                marginBottom: "8px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(200,110,15,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(200,110,15,0.5)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(200,110,15,0.2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              VIEW PRODUCT
            </button>
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "7px",
                letterSpacing: "3px",
                color: "rgba(245,240,232,0.12)",
                textAlign: "center",
                marginTop: "4px",
              }}
            >
              TAP CARD TO CLOSE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COLLECTIONS ──
function Collections() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [modalProduct, setModalProduct] = useState(null);
  const [modalEmail, setModalEmail] = useState("");
  const [modalSize, setModalSize] = useState("");
  const [modalStatus, setModalStatus] = useState("idle");
  const videoRef = useRef(null);

  // ── FETCH PRODUCTS FROM DYNAMODB ──
  useEffect(() => {
    fetch(
      "https://52m6m73pkj.execute-api.us-east-2.amazonaws.com/prod/inventory",
    )
      .then((res) => res.json())
      .then((dynamoData) => {
        const merged = STATIC_PRODUCTS.map((staticProduct) => {
          const dynamic = Array.isArray(dynamoData)
            ? dynamoData.find((d) => d.productId === staticProduct.number)
            : null;
          return {
            ...staticProduct,
            name: dynamic?.name || "",
            price: dynamic?.price || "0",
            description: dynamic?.description || "",
            stock: dynamic?.sizes || {},
          };
        });
        setProducts(merged);
        setLoading(false);
      })
      .catch(() => {
        setProducts(
          STATIC_PRODUCTS.map((p) => ({
            ...p,
            name: "",
            price: "0",
            description: "",
            stock: {},
          })),
        );
        setLoading(false);
      });
  }, []);

  // ── FETCH WAITLIST COUNT ──
  useEffect(() => {
    fetch(
      "https://52m6m73pkj.execute-api.us-east-2.amazonaws.com/prod/waitlist",
    )
      .then((res) => res.json())
      .then((data) => setWaitlistCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setWaitlistCount(0));
  }, []);

  const filtered =
    activeFilter === "ALL"
      ? products
      : products.filter((p) => p.tag === activeFilter);

  const handleProductClick = (product) => navigate(`/products/${product.id}`);

  const handleWaitlistSubmit = async () => {
    if (!modalEmail || !modalSize) return;
    setModalStatus("loading");
    try {
      await submitWaitlist({
        email: modalEmail,
        product: modalProduct.name,
        size: modalSize,
      });
      setModalStatus("success");
    } catch {
      setModalStatus("error");
    }
  };

  const closeModal = () => {
    setModalProduct(null);
    setModalStatus("idle");
    setModalEmail("");
    setModalSize("");
  };

  return (
    <div
      style={{
        background: "#030201",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* ── VIDEO BACKGROUND ── */}
      <div
        style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.35,
            filter: "saturate(0.6) brightness(0.7)",
          }}
        >
          <source src="/collections-bg.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 0%, rgba(200,110,15,0.08) 0%, transparent 60%), radial-gradient(ellipse at 0% 50%, rgba(200,0,0,0.06) 0%, transparent 50%), radial-gradient(ellipse at 100% 50%, rgba(200,0,0,0.06) 0%, transparent 50%), linear-gradient(to bottom, rgba(3,2,1,0.5) 0%, rgba(3,2,1,0.3) 40%, rgba(3,2,1,0.7) 80%, rgba(3,2,1,0.97) 100%)`,
          }}
        />
      </div>

      {/* ── GRAIN ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── PARTICLES ── */}
      <Particles />

      {/* ── MAIN CONTENT ── */}
      <div style={{ position: "relative", zIndex: 2, paddingTop: "80px" }}>
        {/* ── HEADER ── */}
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px 60px",
            position: "relative",
          }}
        >
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "Metal Mania",
              fontSize: "clamp(80px, 15vw, 200px)",
              color: "rgba(200,110,15,0.03)",
              letterSpacing: "0.2em",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              userSelect: "none",
              lineHeight: 1,
            }}
          >
            VILLAIN
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "rgba(200,110,15,0.4)",
              }}
            />
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "8px",
                letterSpacing: "8px",
                color: "rgba(200,110,15,0.6)",
              }}
            >
              VILLAIN CULTURE · CHAPTER ONE
            </p>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "rgba(200,110,15,0.4)",
              }}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <h1
              style={{
                fontFamily: "Metal Mania",
                fontSize: "clamp(48px, 9vw, 110px)",
                letterSpacing: "0.25em",
                color: "rgba(245,240,232,0.06)",
                lineHeight: 0.9,
                WebkitTextStroke: "1px rgba(245,240,232,0.15)",
                display: "block",
              }}
            >
              THE
            </h1>
            <h1
              style={{
                fontFamily: "Metal Mania",
                fontSize: "clamp(48px, 9vw, 110px)",
                letterSpacing: "0.25em",
                color: "rgba(200,110,15,1)",
                lineHeight: 0.9,
                textShadow:
                  "0 0 80px rgba(200,110,15,0.4), 0 0 160px rgba(200,110,15,0.2), 0 4px 20px rgba(0,0,0,0.8)",
                display: "block",
              }}
            >
              COLLECTION
            </h1>
          </div>

          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "11px",
              letterSpacing: "6px",
              color: "rgba(245,240,232,0.18)",
              marginBottom: "32px",
              marginTop: "16px",
            }}
          >
            BUILT FOR THE ONES WHO NEVER FIT
          </p>

          {/* Waitlist counter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                flex: 1,
                maxWidth: "100px",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(200,110,15,0.5))",
              }}
            />
            {waitlistCount > 0 ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "rgba(200,110,15,0.9)",
                    boxShadow: "0 0 8px rgba(200,110,15,0.8)",
                    animation: "dot-pulse 2s infinite",
                  }}
                />
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "9px",
                    letterSpacing: "4px",
                    color: "rgba(200,110,15,0.8)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {waitlistCount} VILLAINS WAITING
                </p>
              </div>
            ) : (
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "rgba(200,110,15,0.4)",
                }}
              />
            )}
            <div
              style={{
                flex: 1,
                maxWidth: "100px",
                height: "1px",
                background:
                  "linear-gradient(to left, transparent, rgba(200,110,15,0.5))",
              }}
            />
          </div>

          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "9px",
              letterSpacing: "4px",
              color: "rgba(245,240,232,0.15)",
              marginBottom: "40px",
            }}
          >
            9 ARTIFACTS · TAP A CARD TO REVEAL
          </p>

          {/* Filter tabs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "8px",
                    letterSpacing: "3px",
                    padding: "8px 18px",
                    borderRadius: "6px",
                    border: `1px solid ${isActive ? "rgba(200,110,15,0.7)" : "rgba(245,240,232,0.08)"}`,
                    background: isActive
                      ? "rgba(200,110,15,0.12)"
                      : "rgba(5,3,1,0.6)",
                    color: isActive
                      ? "rgba(200,110,15,1)"
                      : "rgba(245,240,232,0.3)",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor =
                        "rgba(200,110,15,0.3)";
                      e.currentTarget.style.color = "rgba(245,240,232,0.6)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor =
                        "rgba(245,240,232,0.08)";
                      e.currentTarget.style.color = "rgba(245,240,232,0.3)";
                    }
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── PRODUCT GRID ── */}
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px 20px",
            }}
          >
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "9px",
                letterSpacing: "6px",
                color: "rgba(245,240,232,0.15)",
              }}
            >
              LOADING...
            </p>
          </div>
        ) : (
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 24px 100px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
            className="collections-grid"
          >
            {filtered.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL ── */}
      {modalProduct && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(16px)",
            zIndex: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background:
                "linear-gradient(145deg, rgba(14,8,3,0.99), rgba(8,4,1,0.99))",
              border: "1px solid rgba(200,110,15,0.3)",
              borderRadius: "20px",
              padding: "40px",
              width: "100%",
              maxWidth: "500px",
              position: "relative",
              boxShadow:
                "0 40px 100px rgba(0,0,0,0.9), 0 0 60px rgba(200,110,15,0.06)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background:
                  "linear-gradient(to right, transparent, rgba(200,110,15,0.8), transparent)",
                borderRadius: "20px 20px 0 0",
              }}
            />

            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "16px",
                right: "20px",
                background: "none",
                border: "none",
                color: "rgba(245,240,232,0.25)",
                cursor: "pointer",
                fontSize: "20px",
                transition: "color 0.2s",
                fontFamily: "Special Elite",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(200,110,15,0.8)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,240,232,0.25)")
              }
            >
              ✕
            </button>

            {modalStatus === "success" ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1px solid rgba(200,110,15,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: "20px",
                    color: "rgba(200,110,15,0.8)",
                  }}
                >
                  ✓
                </div>
                <p
                  style={{
                    fontFamily: "Metal Mania",
                    fontSize: "26px",
                    letterSpacing: "4px",
                    color: "rgba(200,110,15,1)",
                    marginBottom: "12px",
                    textShadow: "0 0 30px rgba(200,110,15,0.4)",
                  }}
                >
                  VILLAIN CONFIRMED
                </p>
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "10px",
                    letterSpacing: "3px",
                    color: "rgba(245,240,232,0.3)",
                  }}
                >
                  You will be notified on drop day.
                </p>
              </div>
            ) : (
              <>
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "8px",
                    letterSpacing: "6px",
                    color: "rgba(200,110,15,0.5)",
                    marginBottom: "8px",
                  }}
                >
                  JOIN THE WAITLIST
                </p>
                <h3
                  style={{
                    fontFamily: "Metal Mania",
                    fontSize: "22px",
                    letterSpacing: "3px",
                    color: "rgba(245,240,232,0.95)",
                    marginBottom: "28px",
                    lineHeight: 1.3,
                  }}
                >
                  {modalProduct.name}
                </h3>
                <div
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(to right, rgba(200,110,15,0.4), transparent)",
                    marginBottom: "24px",
                  }}
                />

                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "8px",
                    letterSpacing: "5px",
                    color: "rgba(200,110,15,0.5)",
                    marginBottom: "12px",
                  }}
                >
                  SELECT SIZE
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "24px",
                  }}
                >
                  {modalProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setModalSize(size)}
                      style={{
                        fontFamily: "Special Elite",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: `1px solid ${modalSize === size ? "rgba(200,110,15,0.8)" : "rgba(245,240,232,0.1)"}`,
                        background:
                          modalSize === size
                            ? "rgba(200,110,15,0.15)"
                            : "rgba(5,3,1,0.6)",
                        color:
                          modalSize === size
                            ? "rgba(200,110,15,1)"
                            : "rgba(245,240,232,0.35)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "8px",
                    letterSpacing: "5px",
                    color: "rgba(200,110,15,0.5)",
                    marginBottom: "8px",
                  }}
                >
                  EMAIL ADDRESS
                </p>
                <input
                  type="email"
                  value={modalEmail}
                  onChange={(e) => setModalEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    width: "100%",
                    background: "rgba(5,3,1,0.6)",
                    border: "1px solid rgba(200,110,15,0.15)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    color: "rgba(245,240,232,0.85)",
                    fontFamily: "Special Elite",
                    fontSize: "13px",
                    letterSpacing: "2px",
                    outline: "none",
                    marginBottom: "24px",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(200,110,15,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(200,110,15,0.15)")
                  }
                />

                <button
                  onClick={handleWaitlistSubmit}
                  disabled={modalStatus === "loading"}
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "11px",
                    letterSpacing: "5px",
                    width: "100%",
                    padding: "16px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    background:
                      "linear-gradient(135deg, rgba(210,105,8,0.95), rgba(180,80,5,0.95))",
                    color: "rgba(5,3,1,0.95)",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 24px rgba(200,110,15,0.25)",
                    opacity: modalStatus === "loading" ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 40px rgba(200,110,15,0.5)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 24px rgba(200,110,15,0.25)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {modalStatus === "loading" ? "JOINING..." : "JOIN WAITLIST"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes dot-pulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); box-shadow: 0 0 12px rgba(200,110,15,1); } }
        @keyframes pulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.5; } }
        @media (max-width: 900px) { .collections-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; } }
        @media (max-width: 480px) { .collections-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; } }
      `}</style>
    </div>
  );
}

export default Collections;

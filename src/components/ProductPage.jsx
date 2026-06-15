import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Villain Oversized Tee",
    roman: "I",
    subtitle: "THE FOUNDATION",
    images: ["/products/villain-front.png", "/products/villain-back.png"],
    description: "Built in silence. Worn with authority.",
    details:
      "Heavy 400gsm fleece. Oversized cut. Villain Society embroidered chest logo. Drop shoulder. Ribbed cuffs and hem.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "65.00",
    tag: "SIGNATURE DROP",
    number: "001",
  },
  {
    id: 2,
    name: "VILLAIN ARCHIVE TEE",
    roman: "II",
    subtitle: "THE MARK",
    images: ["/products/product-2-front.png"],
    description: "Minimal design. Maximum intent.",
    details:
      "Premium 280gsm cotton. Oversized fit. Screen printed graphics. Pre-shrunk. Dropped shoulders.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "55.00",
    tag: "CORE PIECE",
    number: "002",
  },
  {
    id: 3,
    name: "CONTROL UNIT JOGGERS",
    roman: "III",
    subtitle: "THE MOVEMENT",
    images: ["/products/product-3-front.png"],
    description: "Engineered for movement. Designed for dominance.",
    details:
      "French terry fabric. Tapered fit. Villain Society side tape. Deep side pockets.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "75.00",
    tag: "CORE PIECE",
    number: "003",
  },
  {
    id: 4,
    name: "SHADOW OPS JACKET",
    roman: "IV",
    subtitle: "THE SHIELD",
    images: ["/products/product-4-front.png"],
    description: "For those who move unseen.",
    details:
      "Nylon shell. Villain Society back print. Zip pockets. Adjustable hood. Lightweight.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "120.00",
    tag: "LIMITED",
    number: "004",
  },
  {
    id: 5,
    name: "VOID RUNNER SHORTS",
    roman: "V",
    subtitle: "THE SPEED",
    images: ["/products/product-5-front.png"],
    description: "Cut for speed. Built for the streets.",
    details:
      "Moisture wicking fabric. 7 inch inseam. Villain Society embroidered logo. Lined interior.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "55.00",
    tag: "CORE PIECE",
    number: "005",
  },
  {
    id: 6,
    name: "CORRUPTED CARGOS",
    roman: "VI",
    subtitle: "THE UTILITY",
    images: ["/products/product-6-front.png"],
    description: "Utility meets darkness.",
    details:
      "Heavy duty cotton twill. Relaxed fit. 8 pockets. Villain Society patch. Adjustable hem.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "85.00",
    tag: "LIMITED",
    number: "006",
  },
  {
    id: 7,
    name: "BLACKOUT LONG SLEEVE",
    roman: "VII",
    subtitle: "THE SHADOW",
    images: ["/products/product-7-front.png"],
    description: "Stay covered. Stay dangerous.",
    details:
      "Heavyweight cotton. Dropped shoulders. Villain Society sleeve print. Ribbed cuffs.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "60.00",
    tag: "CORE PIECE",
    number: "007",
  },
  {
    id: 8,
    name: "ROGUE VARSITY JACKET",
    roman: "VIII",
    subtitle: "THE REBEL",
    images: ["/products/product-8-front.png"],
    description: "For the ones who never followed the rules.",
    details:
      "Wool blend body. Leather sleeves. Embroidered villain patches. Quilted lining.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "180.00",
    tag: "SIGNATURE DROP",
    number: "008",
  },
  {
    id: 9,
    name: "SILENT TYPE CAP",
    roman: "IX",
    subtitle: "THE CROWN",
    images: [],
    description: "Let the silence speak.",
    details:
      "6 panel structured cap. Villain Society embroidered logo. Adjustable strap. One size.",
    sizes: ["ONE SIZE"],
    price: "40.00",
    tag: "ACCESSORY",
    number: "009",
  },
];

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  // Find product by id
  const product = products.find((p) => p.id === parseInt(id));

  // If product not found
  if (!product) {
    return (
      <div
        style={{
          background: "#030201",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <p
          style={{
            fontFamily: "Metal Mania",
            fontSize: "32px",
            color: "rgba(200,110,15,0.8)",
            letterSpacing: "4px",
          }}
        >
          PRODUCT NOT FOUND
        </p>
        <button
          onClick={() => navigate("/collections")}
          style={{
            fontFamily: "Special Elite",
            fontSize: "11px",
            letterSpacing: "4px",
            padding: "14px 32px",
            border: "1px solid rgba(200,110,15,0.4)",
            background: "transparent",
            color: "rgba(200,110,15,0.8)",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          BACK TO COLLECTIONS
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
        {/* Back button */}
        <button
          onClick={() => navigate("/collections")}
          style={{
            fontFamily: "Special Elite",
            fontSize: "10px",
            letterSpacing: "4px",
            color: "rgba(200,110,15,0.5)",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginBottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: 0,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(200,110,15,0.9)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(200,110,15,0.5)")
          }
        >
          ← BACK TO COLLECTIONS
        </button>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "start",
          }}
          className="product-grid"
        >
          {/* LEFT — Image gallery */}
          <div>
            {/* Main image */}
            <div
              style={{
                background: "#1a1208",
                borderRadius: "16px",
                border: "1px solid rgba(200,110,15,0.15)",
                overflow: "hidden",
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                position: "relative",
              }}
            >
              {product.images && product.images[activeImage] ? (
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: "24px",
                  }}
                />
              ) : (
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "11px",
                    letterSpacing: "3px",
                    color: "rgba(200,110,15,0.3)",
                  }}
                >
                  COMING SOON
                </p>
              )}

              {/* Tag badge */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  background: "rgba(200,110,15,0.9)",
                  borderRadius: "6px",
                  padding: "4px 12px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "9px",
                    letterSpacing: "3px",
                    color: "rgba(5,3,1,0.95)",
                  }}
                >
                  {product.tag}
                </p>
              </div>
            </div>

            {/* Thumbnail images */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: "flex", gap: "8px" }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "8px",
                      border: `1px solid ${activeImage === i ? "rgba(200,110,15,0.8)" : "rgba(200,110,15,0.15)"}`,
                      background: "#1a1208",
                      cursor: "pointer",
                      overflow: "hidden",
                      padding: "4px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Product info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* Number and tag */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <p
                style={{
                  fontFamily: "Metal Mania",
                  fontSize: "13px",
                  letterSpacing: "3px",
                  color: "rgba(200,110,15,0.6)",
                }}
              >
                {product.roman}
              </p>
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "10px",
                  letterSpacing: "4px",
                  color: "rgba(200,110,15,0.4)",
                }}
              >
                {product.subtitle}
              </p>
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "9px",
                  letterSpacing: "2px",
                  color: "rgba(245,240,232,0.2)",
                }}
              >
                #{product.number}
              </p>
            </div>

            {/* Product name */}
            <h1
              style={{
                fontFamily: "Metal Mania",
                fontSize: "clamp(24px, 3vw, 36px)",
                letterSpacing: "0.1em",
                color: "rgba(245,240,232,0.95)",
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <p
              style={{
                fontFamily: "Metal Mania",
                fontSize: "28px",
                letterSpacing: "2px",
                color: "rgba(200,110,15,0.9)",
              }}
            >
              ${product.price}
            </p>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: "rgba(200,110,15,0.1)",
              }}
            />

            {/* Description */}
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "14px",
                lineHeight: 1.8,
                color: "rgba(245,240,232,0.45)",
              }}
            >
              {product.description}
            </p>

            {/* Construction */}
            <div>
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "9px",
                  letterSpacing: "5px",
                  color: "rgba(200,110,15,0.55)",
                  marginBottom: "8px",
                }}
              >
                CONSTRUCTION
              </p>
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "13px",
                  lineHeight: 1.8,
                  color: "rgba(245,240,232,0.3)",
                }}
              >
                {product.details}
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: "rgba(200,110,15,0.1)",
              }}
            />

            {/* Size selector */}
            <div>
              <div
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
                    fontSize: "9px",
                    letterSpacing: "5px",
                    color: sizeError
                      ? "rgba(200,0,0,0.8)"
                      : "rgba(200,110,15,0.55)",
                    transition: "color 0.3s ease",
                  }}
                >
                  {sizeError ? "PLEASE SELECT A SIZE" : "SELECT SIZE"}
                </p>
                <button
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "9px",
                    letterSpacing: "3px",
                    color: "rgba(245,240,232,0.25)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  SIZE GUIDE
                </button>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "13px",
                      letterSpacing: "0.1em",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      minHeight: "44px",
                      border: `1px solid ${selectedSize === size ? "rgba(200,110,15,0.8)" : "rgba(245,240,232,0.1)"}`,
                      color:
                        selectedSize === size
                          ? "rgba(210,120,20,0.95)"
                          : "rgba(245,240,232,0.35)",
                      background:
                        selectedSize === size
                          ? "rgba(180,80,5,0.15)"
                          : "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity selector */}
            <div>
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "9px",
                  letterSpacing: "5px",
                  color: "rgba(200,110,15,0.55)",
                  marginBottom: "12px",
                }}
              >
                QUANTITY
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "1px solid rgba(200,110,15,0.3)",
                    background: "transparent",
                    color: "rgba(200,110,15,0.8)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  −
                </button>
                <p
                  style={{
                    fontFamily: "Metal Mania",
                    fontSize: "18px",
                    color: "rgba(245,240,232,0.8)",
                    minWidth: "24px",
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </p>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "1px solid rgba(200,110,15,0.3)",
                    background: "transparent",
                    color: "rgba(200,110,15,0.8)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{ height: "1px", background: "rgba(200,110,15,0.1)" }}
            />

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              style={{
                fontFamily: "Special Elite",
                fontSize: "13px",
                letterSpacing: "5px",
                width: "100%",
                padding: "18px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                background: added
                  ? "rgba(0,130,0,0.6)"
                  : "linear-gradient(135deg, rgba(210,105,8,0.95) 0%, rgba(180,80,5,0.95) 100%)",
                color: "rgba(5,3,1,0.95)",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(200,110,15,0.2)",
              }}
              onMouseEnter={(e) => {
                if (!added) {
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
              {added ? "✓ ADDED TO CART" : "ADD TO CART"}
            </button>

            {/* View cart button */}
            {totalItems > 0 && (
              <button
                onClick={() => navigate("/cart")}
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "11px",
                  letterSpacing: "4px",
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(200,110,15,0.3)",
                  cursor: "pointer",
                  background: "transparent",
                  color: "rgba(200,110,15,0.7)",
                  transition: "all 0.2s ease",
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
                VIEW CART ({totalItems})
              </button>
            )}

            {/* Shipping info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "16px",
                border: "1px solid rgba(200,110,15,0.1)",
                borderRadius: "12px",
              }}
            >
              {[
                "FREE SHIPPING ON ORDERS OVER $100",
                "SHIPS IN 3-5 BUSINESS DAYS",
                "FREE RETURNS WITHIN 30 DAYS",
              ].map((text) => (
                <p
                  key={text}
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "9px",
                    letterSpacing: "3px",
                    color: "rgba(245,240,232,0.2)",
                  }}
                >
                  · {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ProductPage;

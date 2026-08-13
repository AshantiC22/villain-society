import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// ── STATIC PRODUCT DATA (images, tags, colors — never changes) ──
const STATIC_PRODUCTS = [
  {
    id: 1,
    number: "001",
    roman: "I",
    subtitle: "THE FOUNDATION",
    images: ["/products/villain-front.png", "/products/villain-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "SIGNATURE DROP",
    details:
      "Heavy 400gsm fleece. Oversized cut. Villain Society embroidered chest logo. Drop shoulder. Ribbed cuffs and hem.",
  },
  {
    id: 2,
    number: "002",
    roman: "II",
    subtitle: "THE MARK",
    images: ["/products/product-2-front.png", "/products/product-2-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "CORE PIECE",
    details:
      "Premium 280gsm cotton. Oversized fit. Screen printed graphics. Pre-shrunk. Dropped shoulders.",
  },
  {
    id: 3,
    number: "003",
    roman: "III",
    subtitle: "THE MOVEMENT",
    images: ["/products/product-3-front.png", "/products/product-3-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "CORE PIECE",
    details:
      "French terry fabric. Tapered fit. Villain Society side tape. Deep side pockets.",
  },
  {
    id: 4,
    number: "004",
    roman: "IV",
    subtitle: "THE SHIELD",
    images: ["/products/product-4-front.png", "/products/product-4-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "LIMITED",
    details:
      "Nylon shell. Villain Society back print. Zip pockets. Adjustable hood. Lightweight.",
  },
  {
    id: 5,
    number: "005",
    roman: "V",
    subtitle: "THE SPEED",
    images: ["/products/product-5-front.png", "/products/product-5-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "CORE PIECE",
    details:
      "Moisture wicking fabric. 7 inch inseam. Villain Society embroidered logo. Lined interior.",
  },
  {
    id: 6,
    number: "006",
    roman: "VI",
    subtitle: "THE UTILITY",
    images: ["/products/product-6-front.png", "/products/product-6-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "LIMITED",
    details:
      "Heavy duty cotton twill. Relaxed fit. 8 pockets. Villain Society patch. Adjustable hem.",
  },
  {
    id: 7,
    number: "007",
    roman: "VII",
    subtitle: "THE SHADOW",
    images: ["/products/product-7-front.png", "/products/product-7-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "CORE PIECE",
    details:
      "Heavyweight cotton. Dropped shoulders. Villain Society sleeve print. Ribbed cuffs.",
  },
  {
    id: 8,
    number: "008",
    roman: "VIII",
    subtitle: "THE REBEL",
    images: ["/products/product-8-front.png", "/products/product-8-back.png"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tag: "SIGNATURE DROP",
    details:
      "Wool blend body. Leather sleeves. Embroidered villain patches. Quilted lining.",
    colors: [
      { name: "WHITE", hex: "#F5F0E8", filter: "none" },
      { name: "BLACK", hex: "#1a1a1a", filter: "brightness(0.1)" },
      { name: "GREY", hex: "#808080", filter: "grayscale(1) brightness(0.6)" },
      {
        name: "NAVY",
        hex: "#1B2A4A",
        filter: "sepia(1) saturate(3) hue-rotate(190deg) brightness(0.4)",
      },
      {
        name: "RED",
        hex: "#CC0000",
        filter: "sepia(1) saturate(5) hue-rotate(320deg) brightness(0.7)",
      },
      {
        name: "BLUE",
        hex: "#1E40AF",
        filter: "sepia(1) saturate(4) hue-rotate(200deg) brightness(0.6)",
      },
      { name: "CREAM", hex: "#F5E6C8", filter: "sepia(0.3) brightness(1.05)" },
      {
        name: "BROWN",
        hex: "#6B3A2A",
        filter: "sepia(1) saturate(2) hue-rotate(340deg) brightness(0.5)",
      },
      {
        name: "PURPLE",
        hex: "#5B2D8E",
        filter: "sepia(1) saturate(4) hue-rotate(250deg) brightness(0.5)",
      },
    ],
  },
  {
    id: 9,
    number: "009",
    roman: "IX",
    subtitle: "THE CROWN",
    images: [],
    sizes: ["ONE SIZE"],
    tag: "ACCESSORY",
    details:
      "6 panel structured cap. Villain Society embroidered logo. Adjustable strap. One size.",
  },
];

// ── BRANDED PLACEHOLDER ──
function ImagePlaceholder({ product }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(145deg, #111111, #0a0a0a)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          position: "absolute",
          fontFamily: "Metal Mania",
          fontSize: "180px",
          color: "rgba(255,255,255,0.02)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {product.roman}
      </p>
      <img
        src="/mascot.png"
        alt=""
        style={{
          width: "80px",
          opacity: 0.12,
          filter: "grayscale(1)",
          marginBottom: "20px",
          animation: "float 4s ease-in-out infinite",
        }}
      />
      <p
        style={{
          fontFamily: "Special Elite",
          fontSize: "9px",
          letterSpacing: "6px",
          color: "rgba(245,240,232,0.2)",
          marginBottom: "8px",
        }}
      >
        #{product.number}
      </p>
      <p
        style={{
          fontFamily: "Metal Mania",
          fontSize: "14px",
          letterSpacing: "4px",
          color: "rgba(204,0,0,0.6)",
          marginBottom: "4px",
        }}
      >
        ARRIVING SOON
      </p>
      <p
        style={{
          fontFamily: "Special Elite",
          fontSize: "8px",
          letterSpacing: "4px",
          color: "rgba(245,240,232,0.12)",
        }}
      >
        AUG 1 · 2026
      </p>
      {[
        {
          top: "16px",
          left: "16px",
          borderTop: "1px solid rgba(204,0,0,0.2)",
          borderLeft: "1px solid rgba(204,0,0,0.2)",
        },
        {
          top: "16px",
          right: "16px",
          borderTop: "1px solid rgba(204,0,0,0.2)",
          borderRight: "1px solid rgba(204,0,0,0.2)",
        },
        {
          bottom: "16px",
          left: "16px",
          borderBottom: "1px solid rgba(204,0,0,0.2)",
          borderLeft: "1px solid rgba(204,0,0,0.2)",
        },
        {
          bottom: "16px",
          right: "16px",
          borderBottom: "1px solid rgba(204,0,0,0.2)",
          borderRight: "1px solid rgba(204,0,0,0.2)",
        },
      ].map((style, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "20px",
            height: "20px",
            ...style,
          }}
        />
      ))}
      <style>{`@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }`}</style>
    </div>
  );
}

// ── LIGHTBOX ──
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.95)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        cursor: "zoom-out",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "none",
          border: "1px solid rgba(245,240,232,0.15)",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          color: "rgba(245,240,232,0.5)",
          cursor: "pointer",
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#CC0000";
          e.currentTarget.style.color = "#CC0000";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)";
          e.currentTarget.style.color = "rgba(245,240,232,0.5)";
        }}
      >
        ✕
      </button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90%",
          maxHeight: "90vh",
          objectFit: "contain",
          animation: "scaleIn 0.2s ease",
        }}
      />
      <p
        style={{
          position: "absolute",
          bottom: "20px",
          fontFamily: "Special Elite",
          fontSize: "9px",
          letterSpacing: "4px",
          color: "rgba(245,240,232,0.2)",
        }}
      >
        ESC OR CLICK TO CLOSE
      </p>
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0 } to { transform: scale(1); opacity: 1 } }
      `}</style>
    </div>
  );
}

// ── MAIN PRODUCT PAGE ──
function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedStatus, setAddedStatus] = useState("idle");
  const [sizeError, setSizeError] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  // ── FETCH FROM DYNAMODB ──
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

  const product = products.find((p) => p.id === parseInt(id));

  // Reset color when product changes
  useEffect(() => {
    setSelectedColor(product?.colors?.[0] || null);
  }, [id, product]);

  const handleImgError = (index) =>
    setImgErrors((prev) => ({ ...prev, [index]: true }));

  const validImages = product?.images?.filter((_, i) => !imgErrors[i]) || [];
  const hasImages = validImages.length > 0;
  const currentImg =
    validImages[Math.min(activeImage, validImages.length - 1)] || null;

  // ── LOADING ──
  if (loading) {
    return (
      <div
        style={{
          background: "#0A0A0A",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
    );
  }

  // ── NOT FOUND ──
  if (!product) {
    return (
      <div
        style={{
          background: "#0A0A0A",
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
            color: "#CC0000",
            letterSpacing: "4px",
          }}
        >
          PRODUCT NOT FOUND
        </p>
        <button
          onClick={() => navigate("/collections")}
          style={{
            fontFamily: "Special Elite",
            fontSize: "10px",
            letterSpacing: "4px",
            padding: "14px 32px",
            border: "1px solid rgba(245,240,232,0.15)",
            background: "transparent",
            color: "rgba(245,240,232,0.5)",
            cursor: "pointer",
            borderRadius: "4px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#CC0000";
            e.currentTarget.style.color = "#CC0000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)";
            e.currentTarget.style.color = "rgba(245,240,232,0.5)";
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
    addToCart(product, selectedSize, quantity, selectedColor?.name || null);
    setAddedStatus("added");
    setTimeout(() => setAddedStatus("idle"), 2000);
  };

  return (
    <div
      style={{ background: "#0A0A0A", minHeight: "100vh", paddingTop: "102px" }}
    >
      {lightbox && currentImg && (
        <Lightbox
          src={currentImg}
          alt={product.name}
          onClose={() => setLightbox(false)}
        />
      )}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/collections")}
          style={{
            fontFamily: "Special Elite",
            fontSize: "9px",
            letterSpacing: "4px",
            color: "rgba(245,240,232,0.3)",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginBottom: "48px",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(245,240,232,0.7)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(245,240,232,0.3)")
          }
        >
          ← COLLECTIONS
        </button>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
          className="product-grid"
        >
          {/* ── LEFT — IMAGE GALLERY ── */}
          <div>
            {/* Main image */}
            <div
              style={{
                aspectRatio: "1",
                background: "#111111",
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
                marginBottom: "12px",
                cursor: hasImages ? "zoom-in" : "default",
              }}
              onClick={() => hasImages && setLightbox(true)}
            >
              {product.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  style={{ display: "none" }}
                  onError={() => handleImgError(i)}
                />
              ))}

              {hasImages && currentImg ? (
                <>
                  <img
                    src={currentImg}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      padding: "32px",
                      transition: "transform 0.4s ease, filter 0.4s ease",
                      filter: selectedColor?.filter || "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.03)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      background: "rgba(0,0,0,0.6)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "4px",
                      padding: "4px 10px",
                      pointerEvents: "none",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Special Elite",
                        fontSize: "7px",
                        letterSpacing: "2px",
                        color: "rgba(245,240,232,0.3)",
                      }}
                    >
                      CLICK TO ZOOM
                    </p>
                  </div>
                </>
              ) : (
                <ImagePlaceholder product={product} />
              )}

              {/* Tag */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  background:
                    product.tag === "LIMITED"
                      ? "#CC0000"
                      : "rgba(245,240,232,0.08)",
                  border:
                    product.tag === "LIMITED"
                      ? "none"
                      : "1px solid rgba(245,240,232,0.12)",
                  borderRadius: "2px",
                  padding: "4px 10px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "7px",
                    letterSpacing: "3px",
                    color:
                      product.tag === "LIMITED"
                        ? "#F5F0E8"
                        : "rgba(245,240,232,0.5)",
                  }}
                >
                  {product.tag}
                </p>
              </div>
            </div>

            {/* Thumbnails */}
            {validImages.length > 1 && (
              <div style={{ display: "flex", gap: "8px" }}>
                {validImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "4px",
                      border: `1px solid ${activeImage === i ? "rgba(245,240,232,0.4)" : "rgba(255,255,255,0.06)"}`,
                      background: "#111111",
                      cursor: "pointer",
                      overflow: "hidden",
                      padding: "6px",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (activeImage !== i)
                        e.currentTarget.style.borderColor =
                          "rgba(245,240,232,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      if (activeImage !== i)
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.06)";
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        filter: selectedColor?.filter || "none",
                        transition: "filter 0.4s ease",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT — PRODUCT INFO ── */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            {/* Header */}
            <div>
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "8px",
                  letterSpacing: "5px",
                  color: "rgba(245,240,232,0.2)",
                  marginBottom: "8px",
                }}
              >
                {product.roman} · {product.subtitle} · #{product.number}
              </p>
              <h1
                style={{
                  fontFamily: "Metal Mania",
                  fontSize: "clamp(24px, 3vw, 36px)",
                  letterSpacing: "2px",
                  color: "#F5F0E8",
                  lineHeight: 1.2,
                  marginBottom: "16px",
                }}
              >
                {product.name}
              </h1>
              <p
                style={{
                  fontFamily: "Metal Mania",
                  fontSize: "28px",
                  letterSpacing: "2px",
                  color: "#F5F0E8",
                }}
              >
                ${product.price}
              </p>
            </div>

            <div
              style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
            />

            {/* Description */}
            <div>
              {product.description && (
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                    color: "rgba(245,240,232,0.45)",
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
                  fontSize: "12px",
                  letterSpacing: "0.5px",
                  color: "rgba(245,240,232,0.25)",
                  lineHeight: 1.8,
                }}
              >
                {product.details}
              </p>
            </div>

            <div
              style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
            />

            {/* Color selector */}
            {product.colors && (
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
                      fontSize: "8px",
                      letterSpacing: "4px",
                      color: "rgba(245,240,232,0.3)",
                    }}
                  >
                    COLOR
                  </p>
                  {selectedColor && (
                    <p
                      style={{
                        fontFamily: "Special Elite",
                        fontSize: "9px",
                        letterSpacing: "3px",
                        color: "rgba(245,240,232,0.5)",
                      }}
                    >
                      {selectedColor.name}
                    </p>
                  )}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {product.colors.map((color) => {
                    const isSelected = selectedColor?.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        title={color.name}
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: color.hex,
                          border: isSelected
                            ? "2px solid #F5F0E8"
                            : "2px solid transparent",
                          cursor: "pointer",
                          outline: isSelected
                            ? "1px solid rgba(245,240,232,0.5)"
                            : "1px solid rgba(255,255,255,0.1)",
                          outlineOffset: "2px",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected)
                            e.currentTarget.style.outline =
                              "1px solid rgba(245,240,232,0.4)";
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected)
                            e.currentTarget.style.outline =
                              "1px solid rgba(255,255,255,0.1)";
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

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
                    fontSize: "8px",
                    letterSpacing: "4px",
                    color: sizeError ? "#CC0000" : "rgba(245,240,232,0.3)",
                    transition: "color 0.3s ease",
                  }}
                >
                  {sizeError ? "SELECT A SIZE" : "SIZE"}
                </p>
                <button
                  onClick={() => navigate("/size-guide")}
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "8px",
                    letterSpacing: "3px",
                    color: "rgba(245,240,232,0.2)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(245,240,232,0.6)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(245,240,232,0.2)")
                  }
                >
                  SIZE GUIDE
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      style={{
                        fontFamily: "Special Elite",
                        fontSize: "12px",
                        letterSpacing: "1px",
                        padding: "10px 18px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        minHeight: "44px",
                        border: `1px solid ${isSelected ? "#F5F0E8" : "rgba(255,255,255,0.08)"}`,
                        color: isSelected
                          ? "#0A0A0A"
                          : "rgba(245,240,232,0.45)",
                        background: isSelected ? "#F5F0E8" : "transparent",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor =
                            "rgba(245,240,232,0.25)";
                          e.currentTarget.style.color = "rgba(245,240,232,0.7)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.08)";
                          e.currentTarget.style.color =
                            "rgba(245,240,232,0.45)";
                        }
                      }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "8px",
                  letterSpacing: "4px",
                  color: "rgba(245,240,232,0.3)",
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
                    width: "40px",
                    height: "40px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "transparent",
                    color: "rgba(245,240,232,0.5)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(245,240,232,0.25)";
                    e.currentTarget.style.color = "#F5F0E8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(245,240,232,0.5)";
                  }}
                >
                  −
                </button>
                <p
                  style={{
                    fontFamily: "Metal Mania",
                    fontSize: "20px",
                    color: "#F5F0E8",
                    minWidth: "32px",
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </p>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "transparent",
                    color: "rgba(245,240,232,0.5)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(245,240,232,0.25)";
                    e.currentTarget.style.color = "#F5F0E8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(245,240,232,0.5)";
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div
              style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
            />

            {/* Add to cart */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <button
                onClick={handleAddToCart}
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "11px",
                  letterSpacing: "5px",
                  width: "100%",
                  padding: "18px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  background:
                    addedStatus === "added" ? "rgba(0,180,80,0.9)" : "#CC0000",
                  color: "#F5F0E8",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (addedStatus === "idle")
                    e.currentTarget.style.background = "#aa0000";
                }}
                onMouseLeave={(e) => {
                  if (addedStatus === "idle")
                    e.currentTarget.style.background = "#CC0000";
                }}
              >
                {addedStatus === "added" ? "✓ ADDED TO CART" : "ADD TO CART"}
              </button>

              {totalItems > 0 && (
                <button
                  onClick={() => navigate("/cart")}
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "10px",
                    letterSpacing: "4px",
                    width: "100%",
                    padding: "14px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                    background: "transparent",
                    color: "rgba(245,240,232,0.4)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245,240,232,0.2)";
                    e.currentTarget.style.color = "rgba(245,240,232,0.7)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(245,240,232,0.4)";
                  }}
                >
                  VIEW CART ({totalItems})
                </button>
              )}
            </div>

            {/* Shipping info */}
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "4px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {[
                "Free shipping on orders over $100",
                "Ships within 2-3 business days",
                "Free returns within 30 days",
              ].map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "10px",
                    letterSpacing: "1px",
                    color: "rgba(245,240,232,0.2)",
                    lineHeight: 1.6,
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
          .product-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}

export default ProductPage;

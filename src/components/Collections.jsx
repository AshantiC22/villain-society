import { useState, useEffect, useRef } from "react";
import { submitWaitlist } from "../api";

const products = [
  {
    id: 1,
    name: "Villain Oversized Tee",
    roman: "I",
    subtitle: "THE FOUNDATION",
    images: ["/products/villain-front.png", "/products/villain-back.png"],
    modelImage: "/models/villain-tee-model.png",
    description: "Built in silence. Worn with authority.",
    details:
      "Heavy 400gsm fleece. Oversized cut. Villain Society embroidered chest logo. Drop shoulder. Ribbed cuffs and hem.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "Coming Soon",
    tag: "SIGNATURE DROP",
    number: "001",
  },
  {
    id: 2,
    name: "VILLAIN ARCHIVE TEE",
    roman: "II",
    subtitle: "THE MARK",
    images: ["/products/product-2-front.png"],
    modelImage: "/models/archive-tee-model.png",
    description: "Minimal design. Maximum intent.",
    details:
      "Premium 280gsm cotton. Oversized fit. Screen printed graphics. Pre-shrunk. Dropped shoulders.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "Coming Soon",
    tag: "CORE PIECE",
    number: "002",
  },
  {
    id: 3,
    name: "CONTROL UNIT JOGGERS",
    roman: "III",
    subtitle: "THE MOVEMENT",
    images: ["/products/product-3-front.png"],
    modelImage: "/models/joggers-model.png",
    description: "Engineered for movement. Designed for dominance.",
    details:
      "French terry fabric. Tapered fit. Villain Society side tape. Deep side pockets.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "Coming Soon",
    tag: "CORE PIECE",
    number: "003",
  },
  {
    id: 4,
    name: "SHADOW OPS JACKET",
    roman: "IV",
    subtitle: "THE SHIELD",
    images: ["/products/product-4-front.png"],
    modelImage: "/models/jacket-model.png",
    description: "For those who move unseen.",
    details:
      "Nylon shell. Villain Society back print. Zip pockets. Adjustable hood. Lightweight.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "Coming Soon",
    tag: "LIMITED",
    number: "004",
  },
  {
    id: 5,
    name: "VOID RUNNER SHORTS",
    roman: "V",
    subtitle: "THE SPEED",
    images: ["/products/product-5-front.png"],
    modelImage: "/models/shorts-model.png",
    description: "Cut for speed. Built for the streets.",
    details:
      "Moisture wicking fabric. 7 inch inseam. Villain Society embroidered logo. Lined interior.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "Coming Soon",
    tag: "CORE PIECE",
    number: "005",
  },
  {
    id: 6,
    name: "CORRUPTED CARGOS",
    roman: "VI",
    subtitle: "THE UTILITY",
    images: ["/products/product-6-front.png"],
    modelImage: "/models/cargos-model.png",
    description: "Utility meets darkness.",
    details:
      "Heavy duty cotton twill. Relaxed fit. 8 pockets. Villain Society patch. Adjustable hem.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "Coming Soon",
    tag: "LIMITED",
    number: "006",
  },
  {
    id: 7,
    name: "BLACKOUT LONG SLEEVE",
    roman: "VII",
    subtitle: "THE SHADOW",
    images: ["/products/product-7-front.png"],
    modelImage: "/models/longsleeve-model.png",
    description: "Stay covered. Stay dangerous.",
    details:
      "Heavyweight cotton. Dropped shoulders. Villain Society sleeve print. Ribbed cuffs.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "Coming Soon",
    tag: "CORE PIECE",
    number: "007",
  },
  {
    id: 8,
    name: "ROGUE VARSITY JACKET",
    roman: "VIII",
    subtitle: "THE REBEL",
    images: ["/products/product-8-front.png"],
    modelImage: "/models/varsity-model.png",
    description: "For the ones who never followed the rules.",
    details:
      "Wool blend body. Leather sleeves. Embroidered villain patches. Quilted lining.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "Coming Soon",
    tag: "SIGNATURE DROP",
    number: "008",
  },
  {
    id: 9,
    name: "SILENT TYPE CAP",
    roman: "IX",
    subtitle: "THE CROWN",
    images: [],
    modelImage: "/models/cap-model.png",
    description: "Let the silence speak.",
    details:
      "6 panel structured cap. Villain Society embroidered logo. Adjustable strap. One size.",
    sizes: ["ONE SIZE"],
    price: "Coming Soon",
    tag: "ACCESSORY",
    number: "009",
  },
];

const VIEW_LABELS = ["FRONT", "BACK", "DETAIL", "LIFESTYLE"];
const ARC_ANGLES = [-32, -24, -16, -8, 0, 8, 16, 24, 32];
const ARC_Y_OFFSET = [28, 16, 8, 3, 0, 3, 8, 16, 28];

// ── CARD BACK FACE (shared design) ──
function CardBack({ size = "tarot" }) {
  const isTarot = size === "tarot";
  const inset1 = isTarot ? "6px" : "8px";
  const inset2 = isTarot ? "10px" : "13px";
  const cornerSize = isTarot ? "12px" : "14px";
  const cornerPos = isTarot ? "top-2 left-2" : "top-3 left-3";
  const corners = isTarot
    ? ["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"]
    : ["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"];
  const mascotSize = isTarot ? "60%" : "80px";
  const fontSize = isTarot ? "clamp(6px, 0.8vw, 8px)" : "10px";
  const borderRadius = isTarot ? "8px" : "12px";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        borderRadius,
        background:
          "linear-gradient(145deg, #2a1a0f 0%, #1a0f08 50%, #2a1a0f 100%)",
        border: "1px solid rgba(200,110,15,0.4)",
        overflow: "hidden",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(200,110,15,0.15)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: inset1,
          border: "1px solid rgba(200,110,15,0.25)",
          borderRadius: "4px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: inset2,
          border: "1px solid rgba(200,110,15,0.12)",
          borderRadius: "2px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(45deg, rgba(200,110,15,0.05) 0px, rgba(200,110,15,0.05) 1px, transparent 1px, transparent 12px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <img
          src="/mascot.png"
          alt="Villain Society"
          style={{
            width: mascotSize,
            height: mascotSize,
            objectFit: "contain",
            opacity: 0.55,
            filter: "sepia(0.8) saturate(0.6) brightness(1.1)",
          }}
        />
        <p
          style={{
            fontFamily: "Metal Mania",
            fontSize,
            letterSpacing: "2px",
            color: "rgba(200,110,15,0.65)",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          VILLAIN
          <br />
          SOCIETY
        </p>
      </div>
      {corners.map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos}`}
          style={{
            width: cornerSize,
            height: cornerSize,
            border: "1px solid rgba(200,110,15,0.4)",
            borderRadius: "2px",
          }}
        />
      ))}
    </div>
  );
}

// ── CARD FRONT FACE (shared design) ──
function CardFront({ product, size = "tarot", showClickHint = false }) {
  const isTarot = size === "tarot";
  const borderRadius = isTarot ? "8px" : "12px";
  const romanSize = isTarot ? "clamp(8px, 1vw, 11px)" : "14px";
  const nameSize = isTarot ? "clamp(5px, 0.7vw, 7px)" : "10px";
  const cornerSize = isTarot ? "10px" : "14px";
  const cornerOffset = isTarot ? "4px" : "6px";
  const padding = isTarot ? "6px" : "8px";
  const bottomPad = isTarot ? "20px 8px 8px" : "28px 12px 10px";
  const corners = [
    {
      top: cornerOffset,
      left: cornerOffset,
      borderTop: `1px solid rgba(200,110,15,0.6)`,
      borderLeft: `1px solid rgba(200,110,15,0.6)`,
    },
    {
      top: cornerOffset,
      right: cornerOffset,
      borderTop: `1px solid rgba(200,110,15,0.6)`,
      borderRight: `1px solid rgba(200,110,15,0.6)`,
    },
    {
      bottom: cornerOffset,
      left: cornerOffset,
      borderBottom: `1px solid rgba(200,110,15,0.6)`,
      borderLeft: `1px solid rgba(200,110,15,0.6)`,
    },
    {
      bottom: cornerOffset,
      right: cornerOffset,
      borderBottom: `1px solid rgba(200,110,15,0.6)`,
      borderRight: `1px solid rgba(200,110,15,0.6)`,
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        borderRadius,
        background: "#0a0604",
        border: "1px solid rgba(200,110,15,0.55)",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.8), 0 0 24px rgba(200,110,15,0.2)",
      }}
    >
      {product.images && product.images[0] ? (
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            padding,
            filter: "brightness(1.05)",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "7px",
              letterSpacing: "1px",
              color: "rgba(200,110,15,0.5)",
              textAlign: "center",
            }}
          >
            COMING
            <br />
            SOON
          </p>
        </div>
      )}
      <p
        style={{
          position: "absolute",
          top: "6px",
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "Metal Mania",
          fontSize: romanSize,
          letterSpacing: "3px",
          color: "rgba(200,110,15,0.95)",
          zIndex: 4,
          textShadow: "0 1px 6px rgba(0,0,0,0.9)",
        }}
      >
        {product.roman}
      </p>
      {corners.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: cornerSize,
            height: cornerSize,
            zIndex: 4,
            ...s,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: bottomPad,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)",
          zIndex: 4,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Metal Mania",
            fontSize: nameSize,
            letterSpacing: "1px",
            color: "rgba(245,240,232,0.95)",
            lineHeight: 1.2,
            marginBottom: "2px",
          }}
        >
          {product.name}
        </p>
        <p
          style={{
            fontFamily: "Special Elite",
            fontSize: isTarot ? "clamp(4px, 0.55vw, 6px)" : "7px",
            letterSpacing: "2px",
            color: "rgba(200,110,15,0.75)",
          }}
        >
          {showClickHint ? "TAP TO VIEW" : product.subtitle}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(to right, transparent, rgba(200,110,15,0.7), transparent)",
          zIndex: 5,
        }}
      />
    </div>
  );
}

// ── DESKTOP TAROT CARD ──
function TarotCard({ product, index, isFlipped, onFirstClick, onSecondClick }) {
  const angle = ARC_ANGLES[index] ?? 0;
  const yOffset = ARC_Y_OFFSET[index] ?? 0;

  const handleClick = () => {
    if (isFlipped) onSecondClick(product);
    else onFirstClick(product.id);
  };

  return (
    <div
      className="relative cursor-pointer"
      style={{
        width: "clamp(70px, 9vw, 120px)",
        height: "clamp(116px, 15vw, 200px)",
        transform: `rotate(${angle}deg) translateY(${yOffset}px)`,
        transformOrigin: "bottom center",
        transition: "transform 0.3s ease, filter 0.3s ease",
        perspective: "1000px",
        flexShrink: 0,
        zIndex: isFlipped ? 20 : 5,
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${angle}deg) translateY(${yOffset - 10}px)`;
        e.currentTarget.style.filter = "brightness(1.2)";
        e.currentTarget.style.zIndex = "20";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${angle}deg) translateY(${yOffset}px)`;
        e.currentTarget.style.filter = "brightness(1)";
        e.currentTarget.style.zIndex = isFlipped ? "20" : "5";
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <CardBack size="tarot" />
        <CardFront product={product} size="tarot" showClickHint={isFlipped} />
      </div>
    </div>
  );
}

// ── MOBILE STACK CARD ──
function StackCard({ product, isFlipped }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        transformStyle: "preserve-3d",
        transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        borderRadius: "12px",
      }}
    >
      <CardBack size="stack" />
      <CardFront product={product} size="stack" showClickHint={false} />
    </div>
  );
}

// ── MOBILE STACKED DECK ──
function MobileStack({ products, onOpenModal }) {
  const [stack, setStack] = useState([...products].reverse());
  const [isFlipped, setIsFlipped] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDir, setSwipeDir] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const startXRef = useRef(0);

  const topCard = stack[stack.length - 1];
  const secondCard = stack[stack.length - 2];
  const thirdCard = stack[stack.length - 3];

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setDragX(e.touches[0].clientX - startXRef.current);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragX) > 80) {
      const dir = dragX > 0 ? "right" : "left";
      setSwipeDir(dir);
      setIsSwiping(true);
      setIsFlipped(false);
      setTimeout(() => {
        setStack((prev) => {
          const next = [...prev];
          next.pop();
          if (next.length === 0) setIsEmpty(true);
          return next;
        });
        setDragX(0);
        setIsSwiping(false);
        setSwipeDir(null);
      }, 350);
    } else {
      setDragX(0);
    }
  };

  // First tap flips, second tap opens modal
  const handleTap = () => {
    if (Math.abs(dragX) > 5) return;
    if (!isFlipped) {
      setIsFlipped(true);
    } else {
      onOpenModal(topCard);
    }
  };

  const handleReset = () => {
    setStack([...products].reverse());
    setIsFlipped(false);
    setIsEmpty(false);
    setDragX(0);
  };

  if (isEmpty) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "40px 20px",
          minHeight: "360px",
        }}
      >
        <p
          style={{
            fontFamily: "Metal Mania",
            fontSize: "20px",
            letterSpacing: "0.2em",
            color: "rgba(200,110,15,0.8)",
            textAlign: "center",
          }}
        >
          THAT'S THE DROP
        </p>
        <p
          style={{
            fontFamily: "Special Elite",
            fontSize: "12px",
            letterSpacing: "4px",
            color: "rgba(245,240,232,0.25)",
            textAlign: "center",
          }}
        >
          AUG 1 2026 · VILLAIN WORLD
        </p>
        <button
          onClick={handleReset}
          style={{
            fontFamily: "Special Elite",
            fontSize: "14px",
            letterSpacing: "4px",
            color: "rgba(200,110,15,0.6)",
            background: "none",
            border: "1px solid rgba(200,110,15,0.3)",
            padding: "12px 24px",
            cursor: "pointer",
            borderRadius: "8px",
            minHeight: "44px",
          }}
        >
          RESET DECK
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0 40px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "200px",
          height: "300px",
          marginBottom: "20px",
        }}
      >
        {thirdCard && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "translateY(8px) translateX(6px) rotate(3deg)",
              zIndex: 1,
            }}
          >
            <StackCard product={thirdCard} isFlipped={false} />
          </div>
        )}
        {secondCard && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "translateY(4px) translateX(3px) rotate(1.5deg)",
              zIndex: 2,
              transition: "transform 0.3s ease",
            }}
          >
            <StackCard product={secondCard} isFlipped={false} />
          </div>
        )}
        {topCard && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              transform: isSwiping
                ? `translateX(${swipeDir === "right" ? "120%" : "-120%"}) rotate(${swipeDir === "right" ? "20deg" : "-20deg"})`
                : `translateX(${dragX}px) rotate(${dragX * 0.08}deg)`,
              transition: isSwiping
                ? "transform 0.35s ease"
                : isDragging
                  ? "none"
                  : "transform 0.3s ease",
              cursor: "grab",
              touchAction: "none",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleTap}
          >
            <StackCard product={topCard} isFlipped={isFlipped} />
            {dragX > 40 && (
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  background: "rgba(200,110,15,0.9)",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  zIndex: 20,
                }}
              >
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "11px",
                    letterSpacing: "3px",
                    color: "rgba(5,3,1,0.9)",
                  }}
                >
                  NEXT
                </p>
              </div>
            )}
            {dragX < -40 && (
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(200,110,15,0.9)",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  zIndex: 20,
                }}
              >
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "11px",
                    letterSpacing: "3px",
                    color: "rgba(5,3,1,0.9)",
                  }}
                >
                  NEXT
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <p
        style={{
          fontFamily: "Special Elite",
          fontSize: "11px",
          letterSpacing: "4px",
          color: "rgba(245,240,232,0.2)",
          marginBottom: "8px",
        }}
      >
        {stack.length} / {products.length} REMAINING
      </p>
      <p
        style={{
          fontFamily: "Special Elite",
          fontSize: "11px",
          letterSpacing: "3px",
          color: "rgba(200,110,15,0.4)",
        }}
      >
        {isFlipped ? "TAP AGAIN TO VIEW" : "SWIPE · TAP TO FLIP"}
      </p>
      <div style={{ display: "flex", gap: "5px", marginTop: "12px" }}>
        {products.map((_, i) => {
          const fromTop = products.length - stack.length;
          return (
            <div
              key={i}
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "999px",
                background:
                  i < fromTop
                    ? "rgba(200,110,15,0.8)"
                    : "rgba(245,240,232,0.15)",
                transition: "all 0.3s ease",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── MAIN COLLECTIONS PAGE ──
function Collections() {
  const [flippedId, setFlippedId] = useState(null);
  const [zoomedProduct, setZoomedProduct] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [waitlistStatus, setWaitlistStatus] = useState("idle");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setZoomedProduct(null);
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openModal = (product) => {
    setSelected(product);
    setSelectedSize(null);
    setActiveImage(0);
    setShowModel(false);
    setWaitlistStatus("idle");
    setWaitlistEmail("");
  };

  const closeModal = () => {
    setSelected(null);
    setSelectedSize(null);
    setActiveImage(0);
    setShowModel(false);
    setWaitlistStatus("idle");
    setWaitlistEmail("");
    setFlippedId(null);
  };

  const prevImage = () => {
    if (!selected) return;
    setActiveImage(
      (activeImage - 1 + selected.images.length) % selected.images.length,
    );
  };

  const nextImage = () => {
    if (!selected) return;
    setActiveImage((activeImage + 1) % selected.images.length);
  };

  const handleWaitlist = async () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    if (!waitlistEmail || !waitlistEmail.includes("@")) {
      alert("Please enter a valid email!");
      return;
    }
    if (waitlistStatus === "sending") return;
    setWaitlistStatus("sending");
    try {
      await submitWaitlist({
        email: waitlistEmail,
        name: "Waitlist",
        size: selectedSize,
        product: selected.name,
      });
      setWaitlistStatus("sent");
    } catch (error) {
      console.error("Error:", error);
      setWaitlistStatus("idle");
    }
  };

  const currentImageSrc = showModel
    ? selected?.modelImage
    : selected?.images?.[activeImage];
  const hasProductImages = selected?.images && selected.images.length > 0;
  const hasModelImage = !!selected?.modelImage;

  // Gold separator
  const Sep = () => (
    <div
      style={{
        width: "100%",
        height: "1px",
        background: "rgba(200,110,15,0.12)",
      }}
    />
  );

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{ background: "#0a0604" }}
    >
      {/* Video bg */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover"
        style={{ opacity: 0.45 }}
      >
        <source src="/collections-bg.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-black/50 pointer-events-none" />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col min-h-screen pt-24"
        style={{ zIndex: 10 }}
      >
        {/* Header */}
        <div className="text-center mb-8 px-6">
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "11px",
              letterSpacing: "8px",
              color: "rgba(200,110,15,0.7)",
              marginBottom: "8px",
            }}
          >
            VILLAIN SOCIETY
          </p>
          <h1
            style={{
              fontFamily: "Metal Mania",
              fontSize: "clamp(24px, 4vw, 48px)",
              letterSpacing: "0.2em",
              color: "rgba(245,240,232,0.95)",
              lineHeight: 1.1,
            }}
          >
            THE <span style={{ color: "rgba(200,110,15,1)" }}>COLLECTION</span>
          </h1>
          <div
            style={{
              width: "40px",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(200,110,15,0.7), transparent)",
              margin: "10px auto",
            }}
          />
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "11px",
              letterSpacing: "4px",
              color: "rgba(245,240,232,0.3)",
            }}
          >
            {isMobile
              ? "SWIPE · TAP TO FLIP · TAP AGAIN TO VIEW"
              : "CLICK TO FLIP · CLICK AGAIN TO VIEW · AUG 2026"}
          </p>
        </div>

        {/* Cards */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {!isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: "clamp(2px, 0.5vw, 6px)",
                padding: "40px 20px 60px",
                width: "100%",
                overflowX: "hidden",
              }}
            >
              {products.map((product, index) => (
                <TarotCard
                  key={product.id}
                  product={product}
                  index={index}
                  isFlipped={flippedId === product.id}
                  onFirstClick={(id) =>
                    setFlippedId((prev) => (prev === id ? null : id))
                  }
                  onSecondClick={(p) => openModal(p)}
                />
              ))}
            </div>
          )}
          {isMobile && (
            <MobileStack products={products} onOpenModal={openModal} />
          )}
        </div>
      </div>

      {/* ── MODAL ── */}
      {selected && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          style={{ zIndex: 50 }}
          onClick={closeModal}
        >
          <div
            className="w-full max-w-3xl rounded-2xl overflow-hidden"
            style={{
              background: "rgba(18,10,4,0.98)",
              border: "1px solid rgba(200,110,15,0.3)",
              backdropFilter: "blur(20px)",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 0 60px rgba(200,110,15,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              className="flex justify-between items-center px-6 py-4"
              style={{ borderBottom: "1px solid rgba(200,110,15,0.12)" }}
            >
              <div className="flex items-center gap-3">
                <p
                  style={{
                    fontFamily: "Metal Mania",
                    fontSize: "13px",
                    letterSpacing: "3px",
                    color: "rgba(200,110,15,0.8)",
                  }}
                >
                  {selected.roman}
                </p>
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "11px",
                    letterSpacing: "4px",
                    color: "rgba(200,110,15,0.55)",
                  }}
                >
                  {selected.subtitle}
                </p>
                <div
                  style={{
                    border: "1px solid rgba(200,110,15,0.3)",
                    borderRadius: "999px",
                    padding: "3px 12px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "10px",
                      letterSpacing: "2px",
                      color: "rgba(200,110,15,0.65)",
                    }}
                  >
                    {selected.tag}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: "none",
                  border: "1px solid rgba(245,240,232,0.12)",
                  color: "rgba(245,240,232,0.4)",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  minWidth: "36px",
                  cursor: "pointer",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  WebkitTapHighlightColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,110,15,0.5)";
                  e.currentTarget.style.color = "rgba(200,110,15,0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(245,240,232,0.12)";
                  e.currentTarget.style.color = "rgba(245,240,232,0.4)";
                }}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image panel */}
              <div
                style={{
                  height: isMobile ? "300px" : "460px",
                  background: "#1a1208",
                  borderRight: isMobile
                    ? "none"
                    : "1px solid rgba(200,110,15,0.1)",
                  borderBottom: isMobile
                    ? "1px solid rgba(200,110,15,0.1)"
                    : "none",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {currentImageSrc ? (
                  <>
                    <img
                      src={currentImageSrc}
                      alt={selected.name}
                      onClick={() => !showModel && setZoomedProduct(selected)}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: showModel ? "cover" : "contain",
                        padding: showModel ? "0" : "16px",
                        zIndex: 2,
                        filter: "brightness(1.05)",
                        transition: "opacity 0.3s ease",
                        cursor: showModel ? "default" : "zoom-in",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    />
                    {showModel && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.25)",
                          zIndex: 3,
                        }}
                      />
                    )}
                    {/* Tap to zoom hint — mobile only */}
                    {isMobile && !showModel && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          zIndex: 6,
                          background: "rgba(0,0,0,0.6)",
                          border: "1px solid rgba(200,110,15,0.25)",
                          borderRadius: "999px",
                          padding: "5px 14px",
                          pointerEvents: "none",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "Special Elite",
                            fontSize: "10px",
                            letterSpacing: "3px",
                            color: "rgba(200,110,15,0.7)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          TAP IMAGE TO ZOOM
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ zIndex: 2, textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "Metal Mania",
                        fontSize: "32px",
                        color: "rgba(200,110,15,0.2)",
                        letterSpacing: "4px",
                      }}
                    >
                      {selected.roman}
                    </p>
                    <p
                      style={{
                        fontFamily: "Special Elite",
                        fontSize: "11px",
                        letterSpacing: "3px",
                        color: "rgba(200,110,15,0.3)",
                        marginTop: "8px",
                      }}
                    >
                      COMING SOON
                    </p>
                  </div>
                )}

                {/* Corner brackets */}
                {[
                  "top-4 left-4",
                  "top-4 right-4",
                  "bottom-4 left-4",
                  "bottom-4 right-4",
                ].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos}`}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderTop:
                        i < 2 ? "1px solid rgba(200,110,15,0.3)" : "none",
                      borderBottom:
                        i >= 2 ? "1px solid rgba(200,110,15,0.3)" : "none",
                      borderLeft:
                        i % 2 === 0 ? "1px solid rgba(200,110,15,0.3)" : "none",
                      borderRight:
                        i % 2 === 1 ? "1px solid rgba(200,110,15,0.3)" : "none",
                      zIndex: 5,
                    }}
                  />
                ))}

                {/* Product / Model toggle */}
                {(hasProductImages || hasModelImage) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "4px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 10,
                      display: "flex",
                      background: "rgba(0,0,0,0.65)",
                      border: "1px solid rgba(200,110,15,0.25)",
                      borderRadius: "999px",
                      overflow: "hidden",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {hasProductImages && (
                      <button
                        onClick={() => {
                          setShowModel(false);
                          setActiveImage(0);
                        }}
                        style={{
                          fontFamily: "Special Elite",
                          fontSize: "11px",
                          letterSpacing: "2px",
                          padding: "7px 14px",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          background: !showModel
                            ? "rgba(200,110,15,0.85)"
                            : "transparent",
                          color: !showModel
                            ? "rgba(5,3,1,0.95)"
                            : "rgba(200,110,15,0.55)",
                          minHeight: "36px",
                          WebkitTapHighlightColor: "transparent",
                        }}
                      >
                        PRODUCT
                      </button>
                    )}
                    {hasModelImage && (
                      <button
                        onClick={() => setShowModel(true)}
                        style={{
                          fontFamily: "Special Elite",
                          fontSize: "11px",
                          letterSpacing: "2px",
                          padding: "7px 14px",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          background: showModel
                            ? "rgba(200,110,15,0.85)"
                            : "transparent",
                          color: showModel
                            ? "rgba(5,3,1,0.95)"
                            : "rgba(200,110,15,0.55)",
                          minHeight: "36px",
                          WebkitTapHighlightColor: "transparent",
                        }}
                      >
                        MODEL
                      </button>
                    )}
                  </div>
                )}

                {/* Prev/Next arrows */}
                {!showModel &&
                  selected.images &&
                  selected.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 10,
                          background: "rgba(0,0,0,0.55)",
                          border: "1px solid rgba(200,110,15,0.3)",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          cursor: "pointer",
                          color: "rgba(200,110,15,0.8)",
                          fontSize: "18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(8px)",
                          WebkitTapHighlightColor: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(200,110,15,0.8)";
                          e.currentTarget.style.background =
                            "rgba(200,110,15,0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(200,110,15,0.3)";
                          e.currentTarget.style.background = "rgba(0,0,0,0.55)";
                        }}
                      >
                        ←
                      </button>
                      <button
                        onClick={nextImage}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 10,
                          background: "rgba(0,0,0,0.55)",
                          border: "1px solid rgba(200,110,15,0.3)",
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          cursor: "pointer",
                          color: "rgba(200,110,15,0.8)",
                          fontSize: "18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(8px)",
                          WebkitTapHighlightColor: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(200,110,15,0.8)";
                          e.currentTarget.style.background =
                            "rgba(200,110,15,0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(200,110,15,0.3)";
                          e.currentTarget.style.background = "rgba(0,0,0,0.55)";
                        }}
                      >
                        →
                      </button>
                    </>
                  )}

                {/* Dot indicators */}
                {!showModel &&
                  selected.images &&
                  selected.images.length > 1 && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "16px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "6px" }}>
                        {selected.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveImage(i)}
                            style={{
                              width: i === activeImage ? "16px" : "5px",
                              height: "5px",
                              borderRadius: "999px",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                              background:
                                i === activeImage
                                  ? "rgba(200,110,15,0.9)"
                                  : "rgba(245,240,232,0.25)",
                              transition: "all 0.3s ease",
                              minHeight: "unset",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              {/* Details panel */}
              <div className="flex flex-col gap-5 p-6 md:p-8">
                <div>
                  <h2
                    style={{
                      fontFamily: "Metal Mania",
                      fontSize: "clamp(18px, 2.5vw, 24px)",
                      letterSpacing: "0.12em",
                      color: "rgba(245,240,232,0.95)",
                      marginBottom: "8px",
                      lineHeight: 1.2,
                    }}
                  >
                    {selected.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "rgba(245,240,232,0.45)",
                    }}
                  >
                    {selected.description}
                  </p>
                </div>
                <Sep />
                <div>
                  <p
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "11px",
                      letterSpacing: "4px",
                      marginBottom: "8px",
                      color: "rgba(200,110,15,0.65)",
                    }}
                  >
                    CONSTRUCTION
                  </p>
                  <p
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "13px",
                      lineHeight: 1.8,
                      color: "rgba(245,240,232,0.35)",
                    }}
                  >
                    {selected.details}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "11px",
                      letterSpacing: "4px",
                      marginBottom: "12px",
                      color: "rgba(200,110,15,0.65)",
                    }}
                  >
                    SELECT SIZE
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          fontFamily: "Special Elite",
                          fontSize: "13px",
                          letterSpacing: "0.1em",
                          padding: "10px 14px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          minHeight: "44px",
                          border: `1px solid ${selectedSize === size ? "rgba(200,110,15,0.7)" : "rgba(245,240,232,0.1)"}`,
                          color:
                            selectedSize === size
                              ? "rgba(210,120,20,0.95)"
                              : "rgba(245,240,232,0.35)",
                          background:
                            selectedSize === size
                              ? "rgba(180,80,5,0.15)"
                              : "transparent",
                          transition: "all 0.2s ease",
                          WebkitTapHighlightColor: "transparent",
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <Sep />
                <div className="flex items-center justify-between">
                  <p
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "13px",
                      letterSpacing: "4px",
                      color: "rgba(200,110,15,0.65)",
                    }}
                  >
                    {selected.price}
                  </p>
                  <p
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "11px",
                      letterSpacing: "2px",
                      color: "rgba(245,240,232,0.2)",
                    }}
                  >
                    AUG 2026
                  </p>
                </div>

                {waitlistStatus !== "sent" && (
                  <div>
                    <p
                      style={{
                        fontFamily: "Special Elite",
                        fontSize: "11px",
                        letterSpacing: "4px",
                        marginBottom: "8px",
                        color: "rgba(200,110,15,0.65)",
                      }}
                    >
                      YOUR EMAIL
                    </p>
                    <input
                      type="email"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="Enter your email"
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid rgba(200,110,15,0.2)",
                        padding: "10px 0",
                        color: "rgba(245,240,232,0.85)",
                        fontFamily: "Special Elite",
                        // 16px prevents iOS auto-zoom
                        fontSize: "16px",
                        letterSpacing: "2px",
                        outline: "none",
                        transition: "border-color 0.3s ease",
                      }}
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
                )}

                <button
                  onClick={handleWaitlist}
                  disabled={
                    waitlistStatus === "sending" || waitlistStatus === "sent"
                  }
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "14px",
                    letterSpacing: "4px",
                    width: "100%",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "none",
                    minHeight: "52px",
                    cursor: waitlistStatus === "sent" ? "default" : "pointer",
                    background:
                      waitlistStatus === "sent"
                        ? "rgba(0,130,0,0.5)"
                        : waitlistStatus === "sending"
                          ? "rgba(200,95,8,0.4)"
                          : "rgba(200,95,8,0.9)",
                    color: "rgba(5,3,1,0.95)",
                    transition: "all 0.2s ease",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (waitlistStatus === "idle") {
                      e.currentTarget.style.background =
                        "rgba(220,130,20,0.95)";
                      e.currentTarget.style.boxShadow =
                        "0 0 30px rgba(200,110,15,0.35)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (waitlistStatus === "idle") {
                      e.currentTarget.style.background = "rgba(200,95,8,0.9)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  {waitlistStatus === "sending"
                    ? "JOINING..."
                    : waitlistStatus === "sent"
                      ? "✓ YOU'RE IN VILLAIN WORLD"
                      : "JOIN THE WAITLIST"}
                </button>

                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textAlign: "center",
                    color: "rgba(245,240,232,0.12)",
                  }}
                >
                  NO SPAM. VILLAIN WORLD ONLY.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── LIGHTBOX ZOOM ── */}
      {zoomedProduct && (
        <div
          onClick={() => setZoomedProduct(null)}
          onTouchEnd={() => setZoomedProduct(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            padding: "60px 16px 40px",
            touchAction: "none",
          }}
        >
          <button
            onClick={() => setZoomedProduct(null)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "none",
              border: "1px solid rgba(200,110,15,0.4)",
              color: "rgba(200,110,15,0.8)",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            ✕
          </button>

          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              right: "60px",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <p
              style={{
                fontFamily: "Metal Mania",
                fontSize: "clamp(13px, 2vw, 20px)",
                letterSpacing: "0.15em",
                color: "rgba(245,240,232,0.9)",
                textShadow: "0 2px 12px rgba(0,0,0,0.8)",
              }}
            >
              {zoomedProduct.name}
            </p>
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "11px",
                letterSpacing: "4px",
                color: "rgba(200,110,15,0.7)",
                marginTop: "3px",
              }}
            >
              {zoomedProduct.subtitle}
            </p>
          </div>

          <img
            src={zoomedProduct.images[activeImage] || zoomedProduct.images[0]}
            alt={zoomedProduct.name}
            onClick={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              filter: "brightness(1.05)",
              borderRadius: "4px",
              animation: "zoomIn 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              display: "block",
            }}
          />

          <p
            style={{
              position: "absolute",
              bottom: "12px",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "Special Elite",
              fontSize: "10px",
              letterSpacing: "3px",
              color: "rgba(245,240,232,0.2)",
              whiteSpace: "nowrap",
            }}
          >
            {isMobile
              ? "TAP OUTSIDE TO CLOSE"
              : "CLICK ANYWHERE TO CLOSE · ESC"}
          </p>

          <style>{`@keyframes zoomIn { from { transform: scale(0.75); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
        </div>
      )}
    </div>
  );
}

export default Collections;

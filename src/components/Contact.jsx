import { useState, useEffect, useRef } from "react";
import { submitContact } from "../api";

const SOCIALS = [
  {
    label: "INSTAGRAM",
    handle: "@villainsociety",
    href: "https://instagram.com/villainsociety",
  },
  {
    label: "TIKTOK",
    handle: "@villainsociety",
    href: "https://tiktok.com/@villainsociety",
  },
  {
    label: "TWITTER / X",
    handle: "@villainsociety",
    href: "https://x.com/villainsociety",
  },
];

const CONFIRMATION_TEXT = "TRANSMISSION RECEIVED. VILLAIN WORLD WILL RESPOND.";
const INITIAL_FORM = { name: "", email: "", message: "" };
const STATUS = { IDLE: "idle", SENDING: "sending", SENT: "sent" };

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
};

const labelStyle = {
  fontFamily: "Special Elite",
  fontSize: "8px",
  letterSpacing: "5px",
  color: "rgba(200,110,15,0.55)",
  marginBottom: "8px",
  display: "block",
};

const dividerStyle = {
  height: "1px",
  background: "linear-gradient(to right, rgba(200,110,15,0.12), transparent)",
};

function FormField({ label, children }) {
  return (
    <div>
      <span style={labelStyle}>{label}</span>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={dividerStyle} />;
}

function Rain() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const dropsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const initDrops = (w, h) => {
      const count = Math.floor((w * h) / 8000);
      dropsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 4 + 2,
        opacity: Math.random() * 0.15 + 0.03,
        width: Math.random() * 0.5 + 0.2,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDrops(canvas.width, canvas.height);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dropsRef.current.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.length * 0.15, drop.y + drop.length);
        ctx.strokeStyle = `rgba(180,140,80,${drop.opacity})`;
        ctx.lineWidth = drop.width;
        ctx.stroke();
        drop.y += drop.speed;
        drop.x -= drop.speed * 0.15;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });
      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 3 }}
    />
  );
}

function TransmissionForm({
  formData,
  glitch,
  isFormValid,
  isSending,
  onChange,
  onFocus,
  onBlur,
  onSubmit,
}) {
  return (
    <div
      className="flex flex-col gap-6"
      style={{
        filter: glitch ? "hue-rotate(90deg) saturate(3)" : "none",
        transition: "filter 0.1s ease",
      }}
    >
      <FormField label="IDENTITY">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Your name"
          disabled={isSending}
          style={inputStyle}
        />
      </FormField>

      <FormField label="FREQUENCY">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Your email"
          disabled={isSending}
          style={inputStyle}
        />
      </FormField>

      <FormField label="TRANSMISSION">
        <textarea
          name="message"
          value={formData.message}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Your message..."
          rows={5}
          disabled={isSending}
          style={{ ...inputStyle, resize: "none" }}
        />
      </FormField>

      <button
        onClick={onSubmit}
        disabled={isSending || !isFormValid}
        style={{
          fontFamily: "Special Elite",
          fontSize: "11px",
          letterSpacing: "5px",
          padding: "16px 32px",
          borderRadius: "12px",
          border: "none",
          cursor: isSending ? "not-allowed" : "pointer",
          background: isSending
            ? "rgba(200,110,15,0.3)"
            : "linear-gradient(135deg, rgba(210,105,8,0.95) 0%, rgba(180,80,5,0.95) 100%)",
          color: "rgba(5,3,1,0.95)",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 20px rgba(200,110,15,0.2)",
          alignSelf: "flex-start",
          opacity: !isFormValid && !isSending ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isSending && isFormValid) {
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(200,110,15,0.4)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,110,15,0.2)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {isSending ? "TRANSMITTING..." : "TRANSMIT"}
      </button>
    </div>
  );
}

function ConfirmationView({ displayText, onReset }) {
  return (
    <div
      style={{
        minHeight: "420px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        <div
          className="animate-pulse"
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "rgba(200,110,15,0.9)",
            boxShadow: "0 0 12px rgba(200,110,15,0.6)",
          }}
        />
        <p
          style={{
            fontFamily: "Special Elite",
            fontSize: "9px",
            letterSpacing: "5px",
            color: "rgba(200,110,15,0.7)",
          }}
        >
          SIGNAL CONFIRMED
        </p>
      </div>

      <p
        style={{
          fontFamily: "Metal Mania",
          fontSize: "clamp(18px, 3vw, 28px)",
          letterSpacing: "0.1em",
          color: "rgba(245,240,232,0.9)",
          lineHeight: 1.4,
        }}
      >
        {displayText}
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1.1em",
            background: "rgba(200,110,15,0.8)",
            verticalAlign: "middle",
            marginLeft: "4px",
            animation: "blink 1s infinite",
          }}
        />
      </p>

      <p
        style={{
          fontFamily: "Special Elite",
          fontSize: "11px",
          letterSpacing: "2px",
          color: "rgba(245,240,232,0.25)",
          marginTop: "8px",
          lineHeight: 1.8,
        }}
      >
        Your message has been received.
        <br />
        Stay in the dark. We will find you.
      </p>

      <button
        onClick={onReset}
        style={{
          fontFamily: "Special Elite",
          fontSize: "9px",
          letterSpacing: "4px",
          color: "rgba(200,110,15,0.5)",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginTop: "16px",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "rgba(200,110,15,0.9)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(200,110,15,0.5)";
        }}
      >
        SEND ANOTHER
      </button>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="flex flex-col gap-10 lg:pt-8">
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <div
            className="animate-pulse"
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "rgba(200,110,15,0.8)",
              boxShadow: "0 0 8px rgba(200,110,15,0.5)",
            }}
          />
          <p
            style={{
              fontFamily: "Special Elite",
              fontSize: "8px",
              letterSpacing: "5px",
              color: "rgba(200,110,15,0.6)",
            }}
          >
            CHANNEL OPEN
          </p>
        </div>
        <p
          style={{
            fontFamily: "Special Elite",
            fontSize: "11px",
            letterSpacing: "2px",
            color: "rgba(245,240,232,0.25)",
            lineHeight: 1.9,
          }}
        >
          We receive transmissions from press, collaborators, wholesale
          inquiries, and Villain World members. All signals are monitored.
        </p>
      </div>

      <Divider />

      <div>
        <span style={labelStyle}>DIRECT FREQUENCY</span>
        <a
          href="mailto:villain@villainsociety.com"
          style={{
            fontFamily: "Metal Mania",
            fontSize: "clamp(14px, 2vw, 18px)",
            letterSpacing: "0.1em",
            color: "rgba(245,240,232,0.7)",
            textDecoration: "none",
            transition: "color 0.3s ease",
            display: "block",
            marginTop: "4px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(200,110,15,0.9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(245,240,232,0.7)";
          }}
        >
          villain@villainsociety.com
        </a>
      </div>

      <Divider />

      <div>
        <span style={labelStyle}>SIGNAL TOWERS</span>
        <div className="flex flex-col gap-4" style={{ marginTop: "14px" }}>
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                transition: "opacity 0.3s ease",
                opacity: 0.6,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.6";
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "rgba(200,110,15,0.6)",
                  flexShrink: 0,
                }}
              />
              <div>
                <p
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "8px",
                    letterSpacing: "4px",
                    color: "rgba(200,110,15,0.5)",
                    marginBottom: "2px",
                  }}
                >
                  {social.label}
                </p>
                <p
                  style={{
                    fontFamily: "Metal Mania",
                    fontSize: "13px",
                    letterSpacing: "0.1em",
                    color: "rgba(245,240,232,0.8)",
                  }}
                >
                  {social.handle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <Divider />

      <div>
        <span style={labelStyle}>SIGNAL DELAY</span>
        <p
          style={{
            fontFamily: "Special Elite",
            fontSize: "11px",
            letterSpacing: "2px",
            color: "rgba(245,240,232,0.2)",
            lineHeight: 1.8,
            marginTop: "8px",
          }}
        >
          We respond within 48 hours.
          <br />
          Real ones know patience.
        </p>
      </div>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [glitch, setGlitch] = useState(false);
  const [staticLevel, setStaticLevel] = useState(0);
  const [displayText, setDisplayText] = useState("");

  const typewriterRef = useRef(null);
  const staticRef = useRef(null);

  const isFormValid = formData.name && formData.email && formData.message;
  const isSending = status === STATUS.SENDING;
  const isSent = status === STATUS.SENT;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e) => {
    e.target.style.borderBottomColor = "rgba(200,110,15,0.6)";
  };

  const handleBlur = (e) => {
    e.target.style.borderBottomColor = "rgba(200,110,15,0.2)";
  };

  const startTypewriter = () => {
    let i = 0;
    typewriterRef.current = setInterval(() => {
      setDisplayText(CONFIRMATION_TEXT.slice(0, i));
      i++;
      if (i > CONFIRMATION_TEXT.length) {
        clearInterval(typewriterRef.current);
      }
    }, 40);
  };

  const handleSubmit = async () => {
    if (!isFormValid || isSending) return;
    setStatus(STATUS.SENDING);

    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      let level = 0;
      staticRef.current = setInterval(() => {
        level = parseFloat((level + 0.1).toFixed(1));
        setStaticLevel(level);
        if (level >= 1) {
          clearInterval(staticRef.current);
          setGlitch(true);
          setTimeout(() => {
            setGlitch(false);
            setStaticLevel(0);
            setStatus(STATUS.SENT);
            startTypewriter();
          }, 600);
        }
      }, 50);
    } catch (error) {
      console.error("Error:", error);
      setStatus(STATUS.IDLE);
    }
  };

  const handleReset = () => {
    setStatus(STATUS.IDLE);
    setFormData(INITIAL_FORM);
    setDisplayText("");
  };

  useEffect(() => {
    return () => {
      clearInterval(typewriterRef.current);
      clearInterval(staticRef.current);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: "#030201" }}
    >
      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover"
        style={{ opacity: 0.4 }}
      >
        <source src="/contact-bg.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/60 pointer-events-none" />

      {/* GRAIN */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0.055,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* RAIN */}
      <Rain />

      {/* STATIC */}
      {staticLevel > 0 && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 40,
            opacity: staticLevel * 0.6,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
            mixBlendMode: "overlay",
          }}
        />
      )}

      {/* CONTENT */}
      <div
        className="relative flex flex-col min-h-screen pt-28 pb-16 px-4 md:px-8"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-5xl mx-auto w-full">
          <header className="mb-14">
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "9px",
                letterSpacing: "8px",
                color: "rgba(200,110,15,0.6)",
                marginBottom: "10px",
              }}
            >
              VILLAIN SOCIETY · OPEN CHANNEL
            </p>
            <h1
              style={{
                fontFamily: "Metal Mania",
                fontSize: "clamp(32px, 6vw, 72px)",
                letterSpacing: "0.15em",
                color: "rgba(245,240,232,0.95)",
                lineHeight: 1,
                marginBottom: "12px",
              }}
            >
              SEND A<br />
              <span style={{ color: "rgba(200,110,15,1)" }}>TRANSMISSION</span>
            </h1>
            <div
              style={{
                width: "60px",
                height: "1px",
                background:
                  "linear-gradient(to right, rgba(200,110,15,0.6), transparent)",
                marginBottom: "14px",
              }}
            />
            <p
              style={{
                fontFamily: "Special Elite",
                fontSize: "12px",
                letterSpacing: "2px",
                color: "rgba(245,240,232,0.3)",
                maxWidth: "480px",
                lineHeight: 1.8,
              }}
            >
              The underground is listening. Send your transmission and Villain
              World will respond.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              {isSent ? (
                <ConfirmationView
                  displayText={displayText}
                  onReset={handleReset}
                />
              ) : (
                <TransmissionForm
                  formData={formData}
                  glitch={glitch}
                  isFormValid={isFormValid}
                  isSending={isSending}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
            <ContactInfo />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        input::placeholder,
        textarea::placeholder {
          color: rgba(245,240,232,0.15);
          font-family: Special Elite;
          letter-spacing: 2px;
        }
        input, textarea {
          caret-color: rgba(200,110,15,0.8);
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}

export default Contact;

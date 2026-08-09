import { useNavigate } from "react-router-dom";

const sizeData = [
  { size: "S", length: "26.8", bust: "41.8", shoulder: "19.7", sleeve: "7.9" },
  { size: "M", length: "28.0", bust: "44.1", shoulder: "20.9", sleeve: "8.5" },
  { size: "L", length: "29.2", bust: "46.5", shoulder: "22.1", sleeve: "9.1" },
  { size: "XL", length: "30.3", bust: "48.9", shoulder: "23.2", sleeve: "9.7" },
  {
    size: "2XL",
    length: "31.5",
    bust: "51.2",
    shoulder: "24.4",
    sleeve: "10.2",
  },
  {
    size: "3XL",
    length: "32.7",
    bust: "53.6",
    shoulder: "25.6",
    sleeve: "10.8",
  },
];

const columns = ["SIZE", "LENGTH", "BUST", "SHOULDER", "SLEEVE"];

function SizeGuide() {
  const navigate = useNavigate();

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
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px 20px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Back button */}
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

        {/* Header */}
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
          SIZE <span style={{ color: "rgba(200,110,15,1)" }}>GUIDE</span>
        </h1>
        <p
          style={{
            fontFamily: "Special Elite",
            fontSize: "11px",
            letterSpacing: "3px",
            color: "rgba(245,240,232,0.25)",
            marginBottom: "40px",
          }}
        >
          ALL MEASUREMENTS IN INCHES
        </p>

        {/* Size table */}
        <div
          style={{
            border: "1px solid rgba(200,110,15,0.15)",
            borderRadius: "16px",
            overflow: "hidden",
            background: "rgba(18,10,4,0.8)",
            marginBottom: "32px",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid rgba(200,110,15,0.15)",
                  background: "rgba(200,110,15,0.05)",
                }}
              >
                {columns.map((col) => (
                  <th
                    key={col}
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "9px",
                      letterSpacing: "4px",
                      color: "rgba(200,110,15,0.6)",
                      padding: "16px 20px",
                      textAlign: "left",
                      fontWeight: "normal",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeData.map((row, i) => (
                <tr
                  key={row.size}
                  style={{
                    borderBottom:
                      i < sizeData.length - 1
                        ? "1px solid rgba(200,110,15,0.06)"
                        : "none",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(200,110,15,0.04)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td
                    style={{
                      fontFamily: "Metal Mania",
                      fontSize: "16px",
                      letterSpacing: "2px",
                      color: "rgba(200,110,15,0.9)",
                      padding: "16px 20px",
                    }}
                  >
                    {row.size}
                  </td>
                  {[row.length, row.bust, row.shoulder, row.sleeve].map(
                    (val, j) => (
                      <td
                        key={j}
                        style={{
                          fontFamily: "Special Elite",
                          fontSize: "13px",
                          letterSpacing: "1px",
                          color: "rgba(245,240,232,0.5)",
                          padding: "16px 20px",
                        }}
                      >
                        {val}"
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to measure */}
        <div
          style={{
            border: "1px solid rgba(200,110,15,0.12)",
            borderRadius: "16px",
            padding: "28px",
            background: "rgba(18,10,4,0.8)",
            marginBottom: "32px",
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
            HOW TO MEASURE
          </p>
          {[
            {
              label: "LENGTH",
              desc: "Measure from the highest point of the shoulder down to the bottom hem",
            },
            {
              label: "BUST",
              desc: "Measure around the fullest part of your chest keeping the tape parallel to the floor",
            },
            {
              label: "SHOULDER",
              desc: "Measure from the edge of one shoulder to the edge of the other",
            },
            {
              label: "SLEEVE",
              desc: "Measure from the shoulder seam to the end of the sleeve",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "16px",
                alignItems: "flex-start",
              }}
            >
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "9px",
                  letterSpacing: "3px",
                  color: "rgba(200,110,15,0.6)",
                  minWidth: "80px",
                  paddingTop: "2px",
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "12px",
                  letterSpacing: "1px",
                  color: "rgba(245,240,232,0.3)",
                  lineHeight: 1.7,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Fit notes */}
        <div
          style={{
            border: "1px solid rgba(200,110,15,0.12)",
            borderRadius: "16px",
            padding: "28px",
            background: "rgba(18,10,4,0.8)",
            marginBottom: "40px",
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
            FIT NOTES
          </p>
          {[
            "All Villain Culture pieces are cut oversized — this is intentional",
            "If you prefer a tighter fit order one size down",
            "100% cotton — expect minimal shrinkage after first wash",
            "Wash cold and hang dry to preserve the vintage wash effect",
            "Measurements may vary slightly due to the vintage wash treatment",
          ].map((note, i) => (
            <p
              key={i}
              style={{
                fontFamily: "Special Elite",
                fontSize: "11px",
                letterSpacing: "1px",
                color: "rgba(245,240,232,0.25)",
                lineHeight: 1.8,
                marginBottom: "4px",
              }}
            >
              · {note}
            </p>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/collections")}
          style={{
            fontFamily: "Special Elite",
            fontSize: "11px",
            letterSpacing: "5px",
            padding: "16px 40px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            background:
              "linear-gradient(135deg, rgba(210,105,8,0.95) 0%, rgba(180,80,5,0.95) 100%)",
            color: "rgba(5,3,1,0.95)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(200,110,15,0.4)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          SHOP THE COLLECTION
        </button>
      </div>
    </div>
  );
}

export default SizeGuide;

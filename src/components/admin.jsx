import { useState, useEffect } from "react";

// ── DESIGN TOKENS ──
const C = {
  bg: "#0A0A0A",
  surface: "#111111",
  border: "rgba(255,255,255,0.06)",
  borderHover: "rgba(255,255,255,0.12)",
  text: "#F5F0E8",
  textMid: "rgba(245,240,232,0.45)",
  textLow: "rgba(245,240,232,0.18)",
  red: "#CC0000",
  redDim: "rgba(204,0,0,0.6)",
  redSub: "rgba(204,0,0,0.12)",
  green: "rgba(0,200,100,0.9)",
  yellow: "rgba(220,160,0,0.9)",
};

const F = {
  display: "Metal Mania",
  body: "Special Elite",
};

// ── STAT CARD ──
function StatCard({ label, value, highlight }) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${highlight ? C.red : C.border}`,
        borderRadius: "4px",
        padding: "28px 24px",
      }}
    >
      <p
        style={{
          fontFamily: F.body,
          fontSize: "9px",
          letterSpacing: "4px",
          color: highlight ? C.red : C.textLow,
          marginBottom: "12px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: F.display,
          fontSize: "36px",
          letterSpacing: "2px",
          color: highlight ? C.red : C.text,
          lineHeight: 1,
        }}
      >
        {value}
      </p>
    </div>
  );
}

// ── TABLE ──
function Table({ columns, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.border}` }}>
            {columns.map((col) => (
              <th
                key={col}
                style={{
                  fontFamily: F.body,
                  fontSize: "8px",
                  letterSpacing: "4px",
                  color: C.textLow,
                  textAlign: "left",
                  padding: "0 0 16px 0",
                  paddingRight: "24px",
                  fontWeight: "normal",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

// ── PILL ──
function Pill({ label, color }) {
  const colors = {
    green: {
      border: "rgba(0,200,100,0.3)",
      color: C.green,
      bg: "rgba(0,200,100,0.06)",
    },
    red: { border: "rgba(204,0,0,0.3)", color: C.redDim, bg: C.redSub },
    yellow: {
      border: "rgba(220,160,0,0.3)",
      color: C.yellow,
      bg: "rgba(220,160,0,0.06)",
    },
    dim: { border: C.border, color: C.textMid, bg: "transparent" },
  };
  const s = colors[color] || colors.dim;

  return (
    <span
      style={{
        fontFamily: F.body,
        fontSize: "8px",
        letterSpacing: "2px",
        padding: "4px 10px",
        borderRadius: "2px",
        border: `1px solid ${s.border}`,
        color: s.color,
        background: s.bg,
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}

// ── MAIN ADMIN ──
function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [contactData, setContactData] = useState([]);
  const [waitlistData, setWaitlistData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [editingStock, setEditingStock] = useState({});
  const [saveStatus, setSaveStatus] = useState({});

  useEffect(() => {
    if (!isLoggedIn) return;

    const endpoints = [
      { url: "waitlist", setter: setWaitlistData },
      { url: "contact", setter: setContactData },
      { url: "orders", setter: setOrderData },
      { url: "inventory", setter: setInventoryData },
    ];

    endpoints.forEach(({ url, setter }) => {
      fetch(
        `https://52m6m73pkj.execute-api.us-east-2.amazonaws.com/prod/${url}`,
      )
        .then((res) => res.json())
        .then((data) => setter(Array.isArray(data) ? data : []))
        .catch(() => setter([]));
    });
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (userName === "villainadmin" && password === "villainadmin123") {
      setIsLoggedIn(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setPassword("");
    setWaitlistData([]);
    setContactData([]);
    setOrderData([]);
    setInventoryData([]);
    setActiveTab("overview");
  };

  const exportCSV = () => {
    const rows = [
      ["Email", "Product", "Size", "Date"],
      ...waitlistData.map((i) => [
        i.email?.S || "",
        i.product?.S || "",
        i.size?.S || "",
        i.signedUpAt?.S || "",
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "villain-waitlist.csv";
    a.click();
  };

  const handleUpdateStock = async (productId, size, quantity) => {
    const key = `${productId}-${size}`;
    setSaveStatus((prev) => ({ ...prev, [key]: "saving" }));
    try {
      await fetch(
        "https://52m6m73pkj.execute-api.us-east-2.amazonaws.com/prod/inventory",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            size,
            quantity: parseInt(quantity),
          }),
        },
      );
      setInventoryData((prev) =>
        prev.map((item) =>
          item.productId?.S === productId
            ? {
                ...item,
                sizes: {
                  ...item.sizes,
                  M: { ...item.sizes?.M, [size]: { N: quantity.toString() } },
                },
              }
            : item,
        ),
      );
      setSaveStatus((prev) => ({ ...prev, [key]: "saved" }));
      setTimeout(() => setSaveStatus((prev) => ({ ...prev, [key]: "" })), 2000);
    } catch {
      setSaveStatus((prev) => ({ ...prev, [key]: "error" }));
    }
  };

  // ── COMPUTED ──
  const daysLeft = Math.ceil((new Date("2026-08-01") - new Date()) / 86400000);
  const totalRevenue = orderData.reduce(
    (s, o) => s + (parseFloat(o.amount?.N) || 0),
    0,
  );

  const productCount = waitlistData.reduce((acc, i) => {
    const p = i.product?.S || "Unknown";
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {});

  const hasLowInventory = inventoryData.some((item) =>
    Object.values(item.sizes?.M || {}).some((s) => parseInt(s.N || 0) <= 5),
  );

  const getStockStatus = (qty) => {
    if (qty === 0) return { color: C.red, label: "OUT" };
    if (qty <= 5) return { color: C.yellow, label: "LOW" };
    return { color: C.green, label: "OK" };
  };

  const TABS = [
    { key: "overview", label: "OVERVIEW" },
    { key: "orders", label: "ORDERS" },
    { key: "waitlist", label: "WAITLIST" },
    { key: "messages", label: "MESSAGES" },
    { key: "inventory", label: "INVENTORY", alert: hasLowInventory },
  ];

  // ── INPUT STYLE ──
  const inputStyle = {
    width: "100%",
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: "4px",
    padding: "14px 16px",
    color: C.text,
    fontFamily: F.body,
    fontSize: "13px",
    letterSpacing: "1px",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  };

  // ── ROW STYLE ──
  const trStyle = {
    borderBottom: `1px solid ${C.border}`,
    transition: "background 0.15s ease",
    cursor: "default",
  };

  const tdStyle = {
    fontFamily: F.body,
    fontSize: "12px",
    letterSpacing: "0.5px",
    color: C.textMid,
    padding: "16px 24px 16px 0",
    verticalAlign: "middle",
  };

  // ── LOGIN ──
  if (!isLoggedIn) {
    return (
      <div
        style={{
          background: C.bg,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          {/* Logo */}
          <p
            style={{
              fontFamily: F.display,
              fontSize: "28px",
              letterSpacing: "8px",
              color: C.red,
              textAlign: "center",
              marginBottom: "4px",
            }}
          >
            VILLAIN
          </p>
          <p
            style={{
              fontFamily: F.body,
              fontSize: "8px",
              letterSpacing: "6px",
              color: C.textLow,
              textAlign: "center",
              marginBottom: "48px",
            }}
          >
            ADMIN PORTAL
          </p>

          {/* Form */}
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              padding: "40px 32px",
            }}
          >
            <p
              style={{
                fontFamily: F.body,
                fontSize: "8px",
                letterSpacing: "4px",
                color: C.textLow,
                marginBottom: "8px",
              }}
            >
              USERNAME
            </p>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="villainadmin"
              style={{ ...inputStyle, marginBottom: "20px" }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.2)")
              }
              onBlur={(e) => (e.target.style.borderColor = C.border)}
            />

            <p
              style={{
                fontFamily: F.body,
                fontSize: "8px",
                letterSpacing: "4px",
                color: C.textLow,
                marginBottom: "8px",
              }}
            >
              PASSWORD
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="••••••••••••"
              style={{ ...inputStyle, marginBottom: "28px" }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.2)")
              }
              onBlur={(e) => (e.target.style.borderColor = C.border)}
            />

            {errorMessage && (
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "10px",
                  letterSpacing: "1px",
                  color: C.red,
                  marginBottom: "20px",
                }}
              >
                {errorMessage}
              </p>
            )}

            <button
              onClick={handleLogin}
              style={{
                width: "100%",
                padding: "14px",
                background: C.red,
                border: "none",
                borderRadius: "4px",
                color: C.text,
                fontFamily: F.body,
                fontSize: "10px",
                letterSpacing: "4px",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#aa0000")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = C.red)}
            >
              SIGN IN
            </button>
          </div>

          <p
            style={{
              fontFamily: F.body,
              fontSize: "8px",
              letterSpacing: "3px",
              color: "rgba(245,240,232,0.06)",
              textAlign: "center",
              marginTop: "24px",
            }}
          >
            VILLAIN CULTURE · RESTRICTED ACCESS
          </p>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ──
  return (
    <div style={{ background: C.bg, minHeight: "100vh", paddingTop: "70px" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "48px 32px 80px",
        }}
      >
        {/* ── HEADER ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            paddingBottom: "24px",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div>
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
              ADMIN
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <p
              style={{
                fontFamily: F.body,
                fontSize: "9px",
                letterSpacing: "2px",
                color: C.textLow,
              }}
            >
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <button
              onClick={handleLogout}
              style={{
                fontFamily: F.body,
                fontSize: "9px",
                letterSpacing: "3px",
                padding: "10px 20px",
                background: "transparent",
                border: `1px solid ${C.border}`,
                borderRadius: "4px",
                color: C.textLow,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.redDim;
                e.currentTarget.style.color = C.red;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.color = C.textLow;
              }}
            >
              SIGN OUT
            </button>
          </div>
        </div>

        {/* ── TABS ── */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "40px",
            borderBottom: `1px solid ${C.border}`,
            paddingBottom: "0",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: F.body,
                fontSize: "9px",
                letterSpacing: "3px",
                padding: "12px 20px",
                background: "transparent",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab.key ? C.red : "transparent"}`,
                color: activeTab === tab.key ? C.text : C.textLow,
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                marginBottom: "-1px",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.key)
                  e.currentTarget.style.color = C.textMid;
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.key)
                  e.currentTarget.style.color = C.textLow;
              }}
            >
              {tab.label}
              {tab.alert && (
                <span
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: C.red,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div>
            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "1px",
                background: C.border,
                border: `1px solid ${C.border}`,
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "32px",
              }}
              className="admin-stats"
            >
              {[
                { label: "WAITLIST", value: waitlistData.length },
                { label: "MESSAGES", value: contactData.length },
                { label: "ORDERS", value: orderData.length },
                { label: "REVENUE", value: `$${totalRevenue.toFixed(0)}` },
                { label: "DAYS LEFT", value: daysLeft, highlight: true },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: C.surface,
                    padding: "32px 24px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: F.body,
                      fontSize: "8px",
                      letterSpacing: "4px",
                      color: stat.highlight ? C.red : C.textLow,
                      marginBottom: "16px",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      fontFamily: F.display,
                      fontSize: "40px",
                      letterSpacing: "2px",
                      color: stat.highlight ? C.red : C.text,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Top products */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
              className="admin-grid"
            >
              {[
                {
                  title: "TOP PRODUCTS",
                  items: Object.entries(productCount)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5),
                  emptyMsg: "No waitlist data yet",
                },
                {
                  title: "RECENT ORDERS",
                  items: orderData
                    .slice(0, 5)
                    .map((o) => [
                      o.orderId?.S?.slice(0, 20) + "..." || "-",
                      `$${parseFloat(o.amount?.N || 0).toFixed(2)}`,
                    ]),
                  emptyMsg: "No orders yet",
                },
              ].map((section) => (
                <div
                  key={section.title}
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: "4px",
                    padding: "32px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: F.body,
                      fontSize: "8px",
                      letterSpacing: "4px",
                      color: C.textLow,
                      marginBottom: "24px",
                    }}
                  >
                    {section.title}
                  </p>

                  {section.items.length === 0 ? (
                    <p
                      style={{
                        fontFamily: F.body,
                        fontSize: "12px",
                        color: C.textLow,
                        letterSpacing: "1px",
                      }}
                    >
                      {section.emptyMsg}
                    </p>
                  ) : (
                    section.items.map(([name, value], i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 0",
                          borderBottom:
                            i < section.items.length - 1
                              ? `1px solid ${C.border}`
                              : "none",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: F.body,
                            fontSize: "11px",
                            letterSpacing: "0.5px",
                            color: C.textMid,
                            flex: 1,
                            paddingRight: "16px",
                          }}
                        >
                          {name}
                        </p>
                        <p
                          style={{
                            fontFamily: F.display,
                            fontSize: "16px",
                            color: C.text,
                            flexShrink: 0,
                          }}
                        >
                          {value}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {activeTab === "orders" && (
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              padding: "32px",
            }}
          >
            <p
              style={{
                fontFamily: F.body,
                fontSize: "8px",
                letterSpacing: "4px",
                color: C.textLow,
                marginBottom: "32px",
              }}
            >
              {orderData.length} ORDERS
            </p>

            {orderData.length === 0 ? (
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "12px",
                  color: C.textLow,
                  letterSpacing: "1px",
                }}
              >
                No orders yet.
              </p>
            ) : (
              <Table
                columns={["ORDER ID", "AMOUNT", "STATUS", "ITEMS", "DATE"]}
                rows={orderData.map((order, i) => {
                  const items = order.items?.S ? JSON.parse(order.items.S) : [];
                  return (
                    <tr
                      key={i}
                      style={trStyle}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255,255,255,0.02)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td
                        style={{
                          ...tdStyle,
                          maxWidth: "160px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order.orderId?.S || "-"}
                      </td>
                      <td
                        style={{
                          ...tdStyle,
                          fontFamily: F.display,
                          fontSize: "16px",
                          color: C.text,
                        }}
                      >
                        ${parseFloat(order.amount?.N || 0).toFixed(2)}
                      </td>
                      <td style={tdStyle}>
                        <Pill
                          label={order.status?.S?.toUpperCase() || "PENDING"}
                          color="green"
                        />
                      </td>
                      <td style={tdStyle}>
                        {items.length} {items.length === 1 ? "item" : "items"}
                      </td>
                      <td style={tdStyle}>
                        {order.createdAt?.S
                          ? new Date(order.createdAt.S).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  );
                })}
              />
            )}
          </div>
        )}

        {/* ── WAITLIST ── */}
        {activeTab === "waitlist" && (
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "4px",
              padding: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "32px",
              }}
            >
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "8px",
                  letterSpacing: "4px",
                  color: C.textLow,
                }}
              >
                {waitlistData.length} SIGNUPS
              </p>
              <button
                onClick={exportCSV}
                style={{
                  fontFamily: F.body,
                  fontSize: "8px",
                  letterSpacing: "3px",
                  padding: "10px 20px",
                  background: "transparent",
                  border: `1px solid ${C.border}`,
                  borderRadius: "4px",
                  color: C.textMid,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = C.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.color = C.textMid;
                }}
              >
                EXPORT CSV
              </button>
            </div>

            {waitlistData.length === 0 ? (
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "12px",
                  color: C.textLow,
                  letterSpacing: "1px",
                }}
              >
                No signups yet.
              </p>
            ) : (
              <Table
                columns={["EMAIL", "PRODUCT", "SIZE", "DATE"]}
                rows={waitlistData.map((item, i) => (
                  <tr
                    key={i}
                    style={trStyle}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.02)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={tdStyle}>{item.email?.S || "-"}</td>
                    <td style={tdStyle}>{item.product?.S || "-"}</td>
                    <td style={tdStyle}>
                      <Pill label={item.size?.S || "-"} color="dim" />
                    </td>
                    <td style={tdStyle}>
                      {item.signedUpAt?.S
                        ? new Date(item.signedUpAt.S).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              />
            )}
          </div>
        )}

        {/* ── MESSAGES ── */}
        {activeTab === "messages" && (
          <div>
            <p
              style={{
                fontFamily: F.body,
                fontSize: "8px",
                letterSpacing: "4px",
                color: C.textLow,
                marginBottom: "24px",
              }}
            >
              {contactData.length} MESSAGES
            </p>

            {contactData.length === 0 ? (
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "12px",
                  color: C.textLow,
                  letterSpacing: "1px",
                }}
              >
                No messages yet.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  background: C.border,
                  border: `1px solid ${C.border}`,
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                {contactData.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: C.surface,
                      padding: "28px 32px",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#161616")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = C.surface)
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "12px",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontFamily: F.display,
                            fontSize: "16px",
                            letterSpacing: "2px",
                            color: C.text,
                            marginBottom: "4px",
                          }}
                        >
                          {item.name?.S || "-"}
                        </p>
                        <p
                          style={{
                            fontFamily: F.body,
                            fontSize: "10px",
                            letterSpacing: "1px",
                            color: C.textLow,
                          }}
                        >
                          {item.email?.S || "-"}
                        </p>
                      </div>
                      <p
                        style={{
                          fontFamily: F.body,
                          fontSize: "9px",
                          letterSpacing: "1px",
                          color: C.textLow,
                        }}
                      >
                        {item.sentAt?.S
                          ? new Date(item.sentAt.S).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>
                    <p
                      style={{
                        fontFamily: F.body,
                        fontSize: "13px",
                        letterSpacing: "0.5px",
                        color: C.textMid,
                        lineHeight: 1.8,
                      }}
                    >
                      {item.message?.S || "-"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── INVENTORY ── */}
        {activeTab === "inventory" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "8px",
                  letterSpacing: "4px",
                  color: C.textLow,
                }}
              >
                {inventoryData.length} PRODUCTS
              </p>
              <p
                style={{
                  fontFamily: F.body,
                  fontSize: "9px",
                  letterSpacing: "2px",
                  color: C.textLow,
                }}
              >
                Click any number to edit
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1px",
                background: C.border,
                border: `1px solid ${C.border}`,
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              {inventoryData.length === 0 ? (
                <div style={{ background: C.surface, padding: "32px" }}>
                  <p
                    style={{
                      fontFamily: F.body,
                      fontSize: "12px",
                      color: C.textLow,
                      letterSpacing: "1px",
                    }}
                  >
                    No inventory data.
                  </p>
                </div>
              ) : (
                inventoryData
                  .sort((a, b) =>
                    (a.productId?.S || "").localeCompare(b.productId?.S || ""),
                  )
                  .map((item) => {
                    const sizes = item.sizes?.M || {};
                    const totalStock = Object.values(sizes).reduce(
                      (s, v) => s + parseInt(v.N || 0),
                      0,
                    );
                    const hasOut = Object.values(sizes).some(
                      (s) => parseInt(s.N || 0) === 0,
                    );
                    const hasLow = Object.values(sizes).some(
                      (s) => parseInt(s.N || 0) <= 5 && parseInt(s.N || 0) > 0,
                    );

                    return (
                      <div
                        key={item.productId?.S}
                        style={{ background: C.surface, padding: "28px 32px" }}
                      >
                        {/* Product header */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "16px",
                            }}
                          >
                            <p
                              style={{
                                fontFamily: F.body,
                                fontSize: "9px",
                                letterSpacing: "3px",
                                color: C.textLow,
                              }}
                            >
                              #{item.productId?.S}
                            </p>
                            <p
                              style={{
                                fontFamily: F.display,
                                fontSize: "16px",
                                letterSpacing: "2px",
                                color: C.text,
                              }}
                            >
                              {item.productName?.S}
                            </p>
                            {hasOut && (
                              <Pill label="OUT OF STOCK" color="red" />
                            )}
                            {hasLow && (
                              <Pill label="LOW STOCK" color="yellow" />
                            )}
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <p
                              style={{
                                fontFamily: F.display,
                                fontSize: "28px",
                                color: C.text,
                                lineHeight: 1,
                              }}
                            >
                              {totalStock}
                            </p>
                            <p
                              style={{
                                fontFamily: F.body,
                                fontSize: "8px",
                                letterSpacing: "3px",
                                color: C.textLow,
                              }}
                            >
                              TOTAL
                            </p>
                          </div>
                        </div>

                        {/* Size grid */}
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                          }}
                        >
                          {Object.entries(sizes).map(([size, stockObj]) => {
                            const qty = parseInt(stockObj.N || 0);
                            const key = `${item.productId?.S}-${size}`;
                            const editing = editingStock[key] !== undefined;
                            const status = saveStatus[key];
                            const stock = getStockStatus(qty);

                            return (
                              <div
                                key={size}
                                style={{
                                  background: editing ? "#1a1a1a" : "#0f0f0f",
                                  border: `1px solid ${editing ? "rgba(255,255,255,0.15)" : C.border}`,
                                  borderRadius: "4px",
                                  padding: "12px 16px",
                                  minWidth: "72px",
                                  textAlign: "center",
                                  transition: "all 0.2s ease",
                                }}
                              >
                                <p
                                  style={{
                                    fontFamily: F.body,
                                    fontSize: "7px",
                                    letterSpacing: "3px",
                                    color: C.textLow,
                                    marginBottom: "8px",
                                  }}
                                >
                                  {size}
                                </p>

                                {editing ? (
                                  <input
                                    type="number"
                                    value={editingStock[key]}
                                    onChange={(e) =>
                                      setEditingStock((prev) => ({
                                        ...prev,
                                        [key]: e.target.value,
                                      }))
                                    }
                                    onBlur={() => {
                                      handleUpdateStock(
                                        item.productId?.S,
                                        size,
                                        editingStock[key],
                                      );
                                      setEditingStock((prev) => {
                                        const n = { ...prev };
                                        delete n[key];
                                        return n;
                                      });
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        handleUpdateStock(
                                          item.productId?.S,
                                          size,
                                          editingStock[key],
                                        );
                                        setEditingStock((prev) => {
                                          const n = { ...prev };
                                          delete n[key];
                                          return n;
                                        });
                                      }
                                    }}
                                    autoFocus
                                    style={{
                                      width: "52px",
                                      background: "transparent",
                                      border: "none",
                                      borderBottom:
                                        "1px solid rgba(255,255,255,0.2)",
                                      color: C.text,
                                      fontFamily: F.display,
                                      fontSize: "22px",
                                      textAlign: "center",
                                      outline: "none",
                                    }}
                                  />
                                ) : (
                                  <p
                                    onClick={() =>
                                      setEditingStock((prev) => ({
                                        ...prev,
                                        [key]: qty.toString(),
                                      }))
                                    }
                                    title="Click to edit"
                                    style={{
                                      fontFamily: F.display,
                                      fontSize: "24px",
                                      color: stock.color,
                                      cursor: "pointer",
                                      lineHeight: 1,
                                      marginBottom: "6px",
                                      transition: "opacity 0.15s ease",
                                    }}
                                    onMouseEnter={(e) =>
                                      (e.currentTarget.style.opacity = "0.7")
                                    }
                                    onMouseLeave={(e) =>
                                      (e.currentTarget.style.opacity = "1")
                                    }
                                  >
                                    {qty}
                                  </p>
                                )}

                                <p
                                  style={{
                                    fontFamily: F.body,
                                    fontSize: "7px",
                                    letterSpacing: "1px",
                                    color: stock.color,
                                  }}
                                >
                                  {status === "saving"
                                    ? "···"
                                    : status === "saved"
                                      ? "SAVED"
                                      : status === "error"
                                        ? "ERR"
                                        : stock.label}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .admin-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default Admin;

import { useState, useEffect } from "react";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [contactData, setContactData] = useState([]);
  const [waitlistData, setWaitlistData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(
        "https://52m6m73pkj.execute-api.us-east-2.amazonaws.com/prod/waitlist",
      )
        .then((res) => res.json())
        .then((data) => setWaitlistData(Array.isArray(data) ? data : []))
        .catch(() => setWaitlistData([]));

      fetch(
        "https://52m6m73pkj.execute-api.us-east-2.amazonaws.com/prod/contact",
      )
        .then((res) => res.json())
        .then((data) => setContactData(Array.isArray(data) ? data : []))
        .catch(() => setContactData([]));

      fetch(
        "https://52m6m73pkj.execute-api.us-east-2.amazonaws.com/prod/orders",
      )
        .then((res) => res.json())
        .then((data) => setOrderData(Array.isArray(data) ? data : []))
        .catch(() => setOrderData([]));
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (userName === "villainadmin" && password === "villainadmin123") {
      setIsLoggedIn(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setPassword("");
    setWaitlistData([]);
    setContactData([]);
    setOrderData([]);
  };

  const exportCSV = () => {
    const rows = [
      ["Email", "Product", "Size", "Date"],
      ...waitlistData.map((item) => [
        item.email?.S || "",
        item.product?.S || "",
        item.size?.S || "",
        item.signedUpAt?.S || "",
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

  const daysLeft = Math.ceil(
    (new Date("2026-08-01") - new Date()) / (1000 * 60 * 60 * 24),
  );

  const productCount = {};
  waitlistData.forEach((item) => {
    const product = item.product?.S || "Unknown";
    productCount[product] = (productCount[product] || 0) + 1;
  });
  const topProducts = Object.entries(productCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const sizeCount = {};
  waitlistData.forEach((item) => {
    const size = item.size?.S || "Unknown";
    sizeCount[size] = (sizeCount[size] || 0) + 1;
  });
  const topSizes = Object.entries(sizeCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const totalRevenue = orderData.reduce((sum, order) => {
    return sum + (parseFloat(order.amount?.N) || 0);
  }, 0);

  // ── DASHBOARD VIEW ──
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#030201] px-4 py-10 md:px-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <p
              className="text-[9px] tracking-[6px] text-[rgba(200,110,15,0.6)] mb-1"
              style={{ fontFamily: "Special Elite" }}
            >
              VILLAIN CULTURE
            </p>
            <h1
              className="text-3xl tracking-widest text-[rgba(245,240,232,0.95)]"
              style={{ fontFamily: "Metal Mania" }}
            >
              ADMIN DASHBOARD
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-[10px] tracking-[4px] text-[rgba(200,110,15,0.6)] border border-[rgba(200,110,15,0.3)] px-4 py-2 rounded-lg hover:border-[rgba(200,110,15,0.8)] hover:text-[rgba(200,110,15,0.9)] transition-all"
            style={{ fontFamily: "Special Elite" }}
          >
            LOGOUT
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            { label: "TOTAL SIGNUPS", value: waitlistData.length },
            { label: "TOTAL CONTACTS", value: contactData.length },
            { label: "TOTAL ORDERS", value: orderData.length },
            { label: "TOTAL REVENUE", value: `$${totalRevenue.toFixed(2)}` },
            { label: "DAYS TO LAUNCH", value: daysLeft },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-[rgba(200,110,15,0.2)] rounded-xl p-6 bg-[rgba(18,10,4,0.8)] text-center"
            >
              <p
                className="text-3xl text-[rgba(200,110,15,0.9)] mb-2"
                style={{ fontFamily: "Metal Mania" }}
              >
                {stat.value}
              </p>
              <p
                className="text-[9px] tracking-[4px] text-[rgba(245,240,232,0.3)]"
                style={{ fontFamily: "Special Elite" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Popular Products and Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Top Products */}
          <div className="border border-[rgba(200,110,15,0.2)] rounded-xl p-6 bg-[rgba(18,10,4,0.8)]">
            <p
              className="text-[9px] tracking-[5px] text-[rgba(200,110,15,0.6)] mb-4"
              style={{ fontFamily: "Special Elite" }}
            >
              MOST WANTED
            </p>
            {topProducts.length === 0 ? (
              <p
                className="text-[rgba(245,240,232,0.2)] text-sm"
                style={{ fontFamily: "Special Elite" }}
              >
                No data yet
              </p>
            ) : (
              topProducts.map(([product, count], i) => (
                <div
                  key={product}
                  className="flex justify-between items-center mb-3"
                >
                  <p
                    className="text-[rgba(245,240,232,0.7)] text-sm"
                    style={{ fontFamily: "Special Elite" }}
                  >
                    {["🥇", "🥈", "🥉"][i]} {product}
                  </p>
                  <p
                    className="text-[rgba(200,110,15,0.8)] text-sm"
                    style={{ fontFamily: "Special Elite" }}
                  >
                    {count}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Top Sizes */}
          <div className="border border-[rgba(200,110,15,0.2)] rounded-xl p-6 bg-[rgba(18,10,4,0.8)]">
            <p
              className="text-[9px] tracking-[5px] text-[rgba(200,110,15,0.6)] mb-4"
              style={{ fontFamily: "Special Elite" }}
            >
              MOST POPULAR SIZE
            </p>
            {topSizes.length === 0 ? (
              <p
                className="text-[rgba(245,240,232,0.2)] text-sm"
                style={{ fontFamily: "Special Elite" }}
              >
                No data yet
              </p>
            ) : (
              topSizes.map(([size, count], i) => (
                <div
                  key={size}
                  className="flex justify-between items-center mb-3"
                >
                  <p
                    className="text-[rgba(245,240,232,0.7)] text-sm"
                    style={{ fontFamily: "Special Elite" }}
                  >
                    {["🥇", "🥈", "🥉"][i]} {size}
                  </p>
                  <p
                    className="text-[rgba(200,110,15,0.8)] text-sm"
                    style={{ fontFamily: "Special Elite" }}
                  >
                    {count}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="border border-[rgba(200,110,15,0.2)] rounded-xl p-6 bg-[rgba(18,10,4,0.8)] mb-10">
          <p
            className="text-[9px] tracking-[5px] text-[rgba(200,110,15,0.6)] mb-6"
            style={{ fontFamily: "Special Elite" }}
          >
            ORDERS
          </p>
          {orderData.length === 0 ? (
            <p
              className="text-[rgba(245,240,232,0.2)] text-sm"
              style={{ fontFamily: "Special Elite" }}
            >
              No orders yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(200,110,15,0.1)]">
                    {["ORDER ID", "AMOUNT", "STATUS", "ITEMS", "DATE"].map(
                      (col) => (
                        <th
                          key={col}
                          className="text-left text-[8px] tracking-[4px] text-[rgba(200,110,15,0.5)] pb-3 pr-4"
                          style={{ fontFamily: "Special Elite" }}
                        >
                          {col}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((order, i) => {
                    const items = order.items?.S
                      ? JSON.parse(order.items.S)
                      : [];
                    return (
                      <tr
                        key={i}
                        className="border-b border-[rgba(245,240,232,0.04)] hover:bg-[rgba(200,110,15,0.03)] transition-colors"
                      >
                        <td
                          className="py-3 pr-4 text-[rgba(245,240,232,0.4)] text-xs"
                          style={{
                            fontFamily: "Special Elite",
                            maxWidth: "120px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {order.orderId?.S || "-"}
                        </td>
                        <td
                          className="py-3 pr-4 text-[rgba(200,110,15,0.8)] text-xs"
                          style={{ fontFamily: "Special Elite" }}
                        >
                          ${parseFloat(order.amount?.N || 0).toFixed(2)}
                        </td>
                        <td className="py-3 pr-4 text-xs">
                          <span
                            style={{
                              fontFamily: "Special Elite",
                              fontSize: "8px",
                              letterSpacing: "2px",
                              padding: "3px 8px",
                              borderRadius: "4px",
                              border: "1px solid rgba(0,180,0,0.4)",
                              color: "rgba(0,180,0,0.7)",
                            }}
                          >
                            {order.status?.S?.toUpperCase() || "PENDING"}
                          </span>
                        </td>
                        <td
                          className="py-3 pr-4 text-[rgba(245,240,232,0.4)] text-xs"
                          style={{ fontFamily: "Special Elite" }}
                        >
                          {items.length} {items.length === 1 ? "ITEM" : "ITEMS"}
                        </td>
                        <td
                          className="py-3 pr-4 text-[rgba(245,240,232,0.3)] text-xs"
                          style={{ fontFamily: "Special Elite" }}
                        >
                          {order.createdAt?.S
                            ? new Date(order.createdAt.S).toLocaleDateString()
                            : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Waitlist Table */}
        <div className="border border-[rgba(200,110,15,0.2)] rounded-xl p-6 bg-[rgba(18,10,4,0.8)] mb-10">
          <div className="flex justify-between items-center mb-6">
            <p
              className="text-[9px] tracking-[5px] text-[rgba(200,110,15,0.6)]"
              style={{ fontFamily: "Special Elite" }}
            >
              WAITLIST SIGNUPS
            </p>
            <button
              onClick={exportCSV}
              className="text-[9px] tracking-[3px] text-[rgba(200,110,15,0.6)] border border-[rgba(200,110,15,0.3)] px-3 py-1 rounded-lg hover:border-[rgba(200,110,15,0.8)] transition-all"
              style={{ fontFamily: "Special Elite" }}
            >
              EXPORT CSV
            </button>
          </div>
          {waitlistData.length === 0 ? (
            <p
              className="text-[rgba(245,240,232,0.2)] text-sm"
              style={{ fontFamily: "Special Elite" }}
            >
              No signups yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(200,110,15,0.1)]">
                    {["EMAIL", "PRODUCT", "SIZE", "DATE"].map((col) => (
                      <th
                        key={col}
                        className="text-left text-[8px] tracking-[4px] text-[rgba(200,110,15,0.5)] pb-3 pr-4"
                        style={{ fontFamily: "Special Elite" }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {waitlistData.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-[rgba(245,240,232,0.04)] hover:bg-[rgba(200,110,15,0.03)] transition-colors"
                    >
                      <td
                        className="py-3 pr-4 text-[rgba(245,240,232,0.6)] text-xs"
                        style={{ fontFamily: "Special Elite" }}
                      >
                        {item.email?.S || "-"}
                      </td>
                      <td
                        className="py-3 pr-4 text-[rgba(245,240,232,0.6)] text-xs"
                        style={{ fontFamily: "Special Elite" }}
                      >
                        {item.product?.S || "-"}
                      </td>
                      <td
                        className="py-3 pr-4 text-[rgba(245,240,232,0.6)] text-xs"
                        style={{ fontFamily: "Special Elite" }}
                      >
                        {item.size?.S || "-"}
                      </td>
                      <td
                        className="py-3 pr-4 text-[rgba(245,240,232,0.3)] text-xs"
                        style={{ fontFamily: "Special Elite" }}
                      >
                        {item.signedUpAt?.S
                          ? new Date(item.signedUpAt.S).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Contact Messages */}
        <div className="border border-[rgba(200,110,15,0.2)] rounded-xl p-6 bg-[rgba(18,10,4,0.8)]">
          <p
            className="text-[9px] tracking-[5px] text-[rgba(200,110,15,0.6)] mb-6"
            style={{ fontFamily: "Special Elite" }}
          >
            CONTACT MESSAGES
          </p>
          {contactData.length === 0 ? (
            <p
              className="text-[rgba(245,240,232,0.2)] text-sm"
              style={{ fontFamily: "Special Elite" }}
            >
              No messages yet
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {contactData.map((item, i) => (
                <div
                  key={i}
                  className="border border-[rgba(200,110,15,0.1)] rounded-lg p-4 hover:border-[rgba(200,110,15,0.3)] transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p
                      className="text-[rgba(245,240,232,0.8)] text-sm"
                      style={{ fontFamily: "Special Elite" }}
                    >
                      {item.name?.S || "-"}
                    </p>
                    <p
                      className="text-[rgba(245,240,232,0.2)] text-xs"
                      style={{ fontFamily: "Special Elite" }}
                    >
                      {item.sentAt?.S
                        ? new Date(item.sentAt.S).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                  <p
                    className="text-[rgba(200,110,15,0.6)] text-xs mb-2"
                    style={{ fontFamily: "Special Elite" }}
                  >
                    {item.email?.S || "-"}
                  </p>
                  <p
                    className="text-[rgba(245,240,232,0.4)] text-xs leading-relaxed"
                    style={{ fontFamily: "Special Elite" }}
                  >
                    {item.message?.S || "-"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── LOGIN VIEW ──
  return (
    <div className="min-h-screen bg-[#030201] flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-[rgba(200,110,15,0.3)] rounded-xl p-10 bg-[rgba(18,10,4,0.98)]">
        <p
          className="text-[10px] tracking-[8px] text-[rgba(200,110,15,0.6)] mb-2"
          style={{ fontFamily: "Special Elite" }}
        >
          VILLAIN CULTURE
        </p>
        <h1
          className="text-3xl tracking-widest text-[rgba(245,240,232,0.95)] mb-8"
          style={{ fontFamily: "Metal Mania" }}
        >
          ADMIN ACCESS
        </h1>

        <p
          className="text-[9px] tracking-[5px] text-[rgba(200,110,15,0.55)] mb-2"
          style={{ fontFamily: "Special Elite" }}
        >
          USERNAME
        </p>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter username"
          className="w-full bg-transparent border-b border-[rgba(200,110,15,0.2)] pb-3 mb-6 text-[rgba(245,240,232,0.85)] placeholder-[rgba(245,240,232,0.15)] outline-none focus:border-[rgba(200,110,15,0.6)] transition-colors"
          style={{
            fontFamily: "Special Elite",
            fontSize: "14px",
            letterSpacing: "2px",
          }}
        />

        <p
          className="text-[9px] tracking-[5px] text-[rgba(200,110,15,0.55)] mb-2"
          style={{ fontFamily: "Special Elite" }}
        >
          PASSWORD
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="Enter password"
          className="w-full bg-transparent border-b border-[rgba(200,110,15,0.2)] pb-3 mb-8 text-[rgba(245,240,232,0.85)] placeholder-[rgba(245,240,232,0.15)] outline-none focus:border-[rgba(200,110,15,0.6)] transition-colors"
          style={{
            fontFamily: "Special Elite",
            fontSize: "14px",
            letterSpacing: "2px",
          }}
        />

        {errorMessage && (
          <p
            className="text-red-500 text-[11px] tracking-widest mb-4"
            style={{ fontFamily: "Special Elite" }}
          >
            {errorMessage}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full py-4 rounded-xl text-[rgba(5,3,1,0.95)] text-[11px] tracking-[5px] transition-all hover:brightness-110"
          style={{
            fontFamily: "Special Elite",
            background:
              "linear-gradient(135deg, rgba(210,105,8,0.95) 0%, rgba(180,80,5,0.95) 100%)",
          }}
        >
          ENTER
        </button>

        <p
          className="text-center text-[9px] tracking-widest text-[rgba(245,240,232,0.1)] mt-6"
          style={{ fontFamily: "Special Elite" }}
        >
          VILLAIN CULTURE · RESTRICTED ACCESS
        </p>
      </div>
    </div>
  );
}

export default Admin;

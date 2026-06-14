import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full z-[200] bg-black/80 backdrop-blur-2xl">
      {/* ── MAIN BAR ── */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* Hamburger — mobile only */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-[5px] cursor-pointer"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: isOpen ? "#CC0000" : "rgba(245,240,232,0.8)",
              transition: "all 0.3s ease",
              transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: isOpen ? "#CC0000" : "rgba(245,240,232,0.8)",
              transition: "all 0.3s ease",
              opacity: isOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: isOpen ? "#CC0000" : "rgba(245,240,232,0.8)",
              transition: "all 0.3s ease",
              transform: isOpen
                ? "rotate(-45deg) translate(5px, -5px)"
                : "none",
            }}
          />
        </button>

        {/* Logo — centered on mobile, left on desktop */}
        <h1
          style={{ fontFamily: "Metal Mania" }}
          className="text-2xl text-red-600 tracking-widest absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
          VILLAIN
        </h1>

        {/* Nav links — desktop only */}
        <ul className="hidden md:flex gap-8">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/collections", label: "Collections" },
            { to: "/contact", label: "Contact" },
            { to: "/admin", label: "Admin" },
          ].map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-white/90 hover:text-red-500 hover:underline transition-all duration-300"
                style={{ fontFamily: "Creepster" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Coming soon badge — hidden on mobile */}
        <div
          className="hidden md:block border border-red-600/60 text-red-600 px-4 py-1 text-xs tracking-widest"
          style={{ fontFamily: "Creepster" }}
        >
          COMING SOON
        </div>

        {/* Empty div to balance mobile layout */}
        <div className="md:hidden w-[22px]" />
      </div>

      {/* ── MOBILE MENU ── */}
      <div
        style={{
          maxHeight: isOpen ? "300px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
          background: "rgba(5,2,1,0.97)",
          backdropFilter: "blur(12px)",
        }}
      >
        <ul className="flex flex-col items-center gap-0 py-4">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/collections", label: "Collections" },
            { to: "/contact", label: "Contact" },
            { to: "/admin", label: "Admin" },
          ].map((link) => (
            <li key={link.to} className="w-full text-center">
              <Link
                to={link.to}
                onClick={closeMenu}
                className="block py-4 text-white/80 hover:text-red-500 transition-all duration-300 border-b border-red-800/20"
                style={{
                  fontFamily: "Creepster",
                  fontSize: "18px",
                  letterSpacing: "4px",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Coming soon badge in mobile menu */}
          <li className="mt-4 mb-2">
            <div
              className="border border-red-600/60 text-red-600 px-6 py-2 text-xs tracking-widest"
              style={{ fontFamily: "Creepster" }}
            >
              COMING SOON
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

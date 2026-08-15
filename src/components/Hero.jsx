import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const launch = new Date("2026-08-01T00:00:00");
      const now = new Date();
      const diff = launch - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (!email) {
      setError("Enter your email");
      return;
    }
    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }
    setSubmitted(true);
    setError("");
    setEmail("");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 top-0 bg-black/30" />

      {/* MOBILE ONLY — Status + Timer top bar */}
      <div className="md:hidden absolute top-20 left-0 right-0 z-20 flex justify-between items-center px-4">
        {/* Mobile Status */}
        <div className="flex items-center gap-2 border border-[#CC0000]/40 bg-[#0A0A0A]/80 backdrop-blur-md px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-[#CC0000] animate-pulse" />
          <p
            className="text-[#CC0000] text-[9px] tracking-[2px]"
            style={{ fontFamily: "Creepster" }}
          >
            OFFLINE
          </p>
        </div>

        {/* Mobile Timer */}
        <div className="flex gap-2 border border-[#CC0000]/30 bg-[#0A0A0A]/80 backdrop-blur-md px-3 py-2">
          {[
            { label: "D", value: timeLeft.days },
            { label: "H", value: timeLeft.hours },
            { label: "M", value: timeLeft.mins },
            { label: "S", value: timeLeft.secs },
          ].map((box) => (
            <div key={box.label} className="flex flex-col items-center">
              <span
                className="text-[#CC0000] text-sm leading-none"
                style={{ fontFamily: "Metal Mania" }}
              >
                {String(box.value).padStart(2, "0")}
              </span>
              <span
                className="text-[#F5F0E8]/30 text-[7px]"
                style={{ fontFamily: "Creepster" }}
              >
                {box.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP ONLY — Right side cards */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col gap-3">
        {/* Villain Status Card */}
        <div className="border border-[#CC0000]/40 bg-[#0A0A0A]/80 backdrop-blur-md px-5 py-4 w-56">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#CC0000] animate-pulse" />
            <p
              className="text-[#F5F0E8] text-[10px] tracking-[3px]"
              style={{ fontFamily: "Creepster" }}
            >
              VILLAIN STATUS
            </p>
          </div>
          <p
            className="text-[#CC0000] text-sm tracking-[2px] mb-1"
            style={{ fontFamily: "Creepster" }}
          >
            [ OFFLINE ]
          </p>
          <div className="w-full h-px bg-[#CC0000]/20 my-2" />
          <p
            className="text-[#F5F0E8]/25 text-[9px] tracking-widest"
            style={{ fontFamily: "Creepster" }}
          >
            RECONNECT TO REALITY? →
          </p>
        </div>

        {/* Countdown Timer Card */}
        <div className="border border-[#CC0000]/30 bg-[#0A0A0A]/80 backdrop-blur-md p-5 w-56">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-1 rounded-full bg-[#CC0000]" />
            <p
              className="text-[#CC0000] text-[10px] tracking-[4px]"
              style={{ fontFamily: "Creepster" }}
            >
              COMING SOON ☆
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HRS", value: timeLeft.hours },
              { label: "MIN", value: timeLeft.mins },
              { label: "SEC", value: timeLeft.secs },
            ].map((box) => (
              <div key={box.label} className="flex flex-col items-center">
                <div className="bg-[#0A0A0A] border border-[#CC0000]/20 w-full aspect-square flex items-center justify-center">
                  <span
                    className="text-[#CC0000] text-xl"
                    style={{ fontFamily: "Metal Mania" }}
                  >
                    {String(box.value).padStart(2, "0")}
                  </span>
                </div>
                <span
                  className="text-[#F5F0E8]/30 text-[8px] tracking-[1px] mt-1"
                  style={{ fontFamily: "Creepster" }}
                >
                  {box.label}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-[#CC0000]/20 mt-4" />
          <p
            className="text-[#F5F0E8]/20 text-[9px] tracking-widest mt-2 text-center"
            style={{ fontFamily: "Creepster" }}
          >
            THE WAIT IS ALMOST OVER
          </p>
        </div>
      </div>

      {/* CENTER — Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 md:px-8">
        {/* Eyebrow */}
        <p
          className="text-[#CC0000] text-[10px] md:text-xs tracking-[4px] md:tracking-[6px] uppercase mb-3"
          style={{ fontFamily: "Creepster" }}
        >
          Welcome to the
        </p>

        {/* Main heading */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-widest mb-2 leading-none"
          style={{ fontFamily: "Metal Mania" }}
        >
          <span className="text-[#F5F0E8]">VILLAIN </span>
          <span className="text-[#CC0000] drop-shadow-[0_0_30px_rgba(204,0,0,0.8)]">
            SOCIETY
          </span>
        </h1>

        {/* Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent my-4" />

        {/* Tagline */}
        <p
          className="text-[#F5F0E8]/50 text-xs md:text-sm tracking-[2px] md:tracking-[3px] mb-6"
          style={{ fontFamily: "Creepster" }}
        >
          Built for the ones who never fit.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/about")}
          className="bg-[#CC0000] text-black px-8 md:px-10 py-3 text-xs md:text-sm tracking-[3px] hover:bg-[#FF0000] hover:shadow-[0_0_30px_rgba(204,0,0,0.6)] transition-all duration-300 hover:-translate-y-1"
          style={{ fontFamily: "Creepster" }}
        >
          IT'S VILLAIN TIME
        </button>
      </div>

      {/* BOTTOM — Footer */}
      <div className="absolute bottom-4 md:bottom-5 left-0 right-0 z-20 flex flex-col items-center gap-1">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-800/40 to-transparent mb-2" />
        <p
          className="text-[#F5F0E8]/15 text-[8px] md:text-[9px] tracking-[3px] md:tracking-[4px] text-center px-4"
          style={{ fontFamily: "Creepster" }}
        >
          VILLAIN SOCIETY © 2026 · EST. 2026 · VILLAIN WORLD
        </p>
      </div>
    </div>
  );
}

export default Hero;

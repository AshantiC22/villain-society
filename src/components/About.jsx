import { useState, useEffect } from "react";

function About() {
  const [revealed, setRevealed] = useState([false, false, false, false, false]);

  useEffect(() => {
    revealed.forEach((_, i) => {
      setTimeout(() => {
        setRevealed((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 400);
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#080808] overflow-x-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover "
      >
        <source src="/about-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="fixed inset-0 pointer-events-none" />

      {/* Grain overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Red glow top */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-900/10 blur-[120px] pointer-events-none z-0" />

      {/* Red glow bottom */}
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-red-950/20 blur-[100px] pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 pt-32 pb-24">
        {/* ── DOCUMENT HEADER ── */}
        <div
          className={`mb-16 transition-all duration-700 ${revealed[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Top meta row */}
          <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
            <div>
              <p
                className="text-[#CC0000]/60 text-[10px] tracking-[8px] uppercase mb-2"
                style={{ fontFamily: "Special Elite" }}
              >
                Department of Unknown Origins
              </p>
              <p
                className="text-[#F5F0E8]/20 text-[9px] tracking-[5px]"
                style={{ fontFamily: "Special Elite" }}
              >
                CASE FILE: VS-2026-001 · EYES ONLY
              </p>
            </div>

            {/* Top secret stamp */}
            <div className="border-2 border-[#CC0000]/70 rounded-sm px-5 py-2 rotate-[-6deg] backdrop-blur-sm bg-[#CC0000]/5">
              <p
                className="text-[#CC0000] text-xl tracking-[6px]"
                style={{ fontFamily: "Metal Mania" }}
              >
                TOP SECRET
              </p>
            </div>
          </div>

          {/* Status pills */}
          <div className="flex gap-3 flex-wrap mb-10">
            {[
              { label: "STATUS", value: "ACTIVE", dot: true },
              { label: "THREAT LEVEL", value: "DANGEROUS" },
              { label: "ORIGIN", value: "████████", redact: true },
              { label: "CLASSIFICATION", value: "VILLAIN WORLD" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#111111]/80 backdrop-blur-md border border-[#F5F0E8]/8 rounded-full px-4 py-2 flex items-center gap-2"
              >
                <span
                  className="text-[#F5F0E8]/25 text-[8px] tracking-[3px]"
                  style={{ fontFamily: "Special Elite" }}
                >
                  {item.label}:
                </span>
                {item.dot && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#CC0000] animate-pulse" />
                )}
                {item.redact ? (
                  <span className="bg-[#F5F0E8]/70 text-transparent text-[10px] px-2 rounded-sm select-none">
                    {item.value}
                  </span>
                ) : (
                  <span
                    className="text-[#F5F0E8]/70 text-[10px] tracking-[2px]"
                    style={{ fontFamily: "Special Elite" }}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Main heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl tracking-widest text-[#F5F0E8] leading-tight"
            style={{ fontFamily: "Metal Mania" }}
          >
            WE WERE NEVER
            <br />
            THE VILLAIN.
            <br />
            <span className="text-[#CC0000] drop-shadow-[0_0_40px_rgba(204,0,0,0.4)]">
              THEY MADE US ONE.
            </span>
          </h1>
        </div>

        {/* ── SECTION 1 — Origin ── */}
        <div
          className={`mb-10 transition-all duration-700 delay-200 ${revealed[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-[#0D0D0D]/60 backdrop-blur-xl border border-[#F5F0E8]/6 rounded-2xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-[#CC0000]/40 to-transparent rounded-full" />

            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <p
                className="text-[#F5F0E8]/20 text-[9px] tracking-[6px]"
                style={{ fontFamily: "Special Elite" }}
              >
                SECTION 01 · ORIGIN REPORT
              </p>
              <div className="border border-[#CC0000]/30 rounded-sm px-3 py-1 rotate-[2deg] bg-[#CC0000]/5">
                <p
                  className="text-[#CC0000]/50 text-[9px] tracking-[3px]"
                  style={{ fontFamily: "Special Elite" }}
                >
                  UNCLASSIFIED
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <p
                className="text-[#F5F0E8]/60 text-sm md:text-base leading-loose"
                style={{ fontFamily: "Special Elite" }}
              >
                Villain Society was not built in a boardroom. It was built in
                the silence after being used. In the nights you stayed loyal to
                people who never deserved it. In the moments you chose others
                over yourself and got nothing back but a{" "}
                <span className="bg-[#F5F0E8]/75 text-transparent rounded-sm px-1 select-none">
                  lesson
                </span>
                .
              </p>

              <p
                className="text-[#F5F0E8]/60 text-sm md:text-base leading-loose"
                style={{ fontFamily: "Special Elite" }}
              >
                The world does not reward the good. It{" "}
                <span className="bg-[#F5F0E8]/75 text-transparent rounded-sm px-8 select-none">
                  ████████████
                </span>{" "}
                from them. It tests them. It pushes them to a limit most people
                never come back from.
              </p>

              <p
                className="text-[#F5F0E8]/80 text-sm md:text-base leading-loose"
                style={{ fontFamily: "Special Elite" }}
              >
                But some of us do come back.{" "}
                <span className="text-[#F5F0E8] font-bold">
                  Different. Harder. Unbreakable.
                </span>
              </p>

              <p
                className="text-[#F5F0E8]/60 text-sm md:text-base leading-loose"
                style={{ fontFamily: "Special Elite" }}
              >
                That transformation — that moment you stopped apologizing for
                existing and started moving with purpose and power — that is
                what Villain Society is.
              </p>
            </div>

            <div className="flex justify-end mt-8">
              <div className="border-2 border-[#CC0000]/40 rounded-sm px-5 py-2 rotate-[-3deg] bg-[#CC0000]/5">
                <p
                  className="text-[#CC0000]/50 text-lg tracking-[4px]"
                  style={{ fontFamily: "Metal Mania" }}
                >
                  CONFIRMED
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2 — What Is A Villain ── */}
        <div
          className={`mb-10 transition-all duration-700 delay-300 ${revealed[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-[#0D0D0D]/60 backdrop-blur-xl border border-[#F5F0E8]/6 rounded-2xl p-8 md:p-10 relative overflow-hidden">
            {/* CLASSIFIED watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <p
                className="text-[#CC0000]/4 text-[100px] font-bold rotate-[-25deg] tracking-widest"
                style={{ fontFamily: "Metal Mania" }}
              >
                CLASSIFIED
              </p>
            </div>

            <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-[#CC0000]/40 to-transparent rounded-full" />

            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <p
                className="text-[#F5F0E8]/20 text-[9px] tracking-[6px]"
                style={{ fontFamily: "Special Elite" }}
              >
                SECTION 02 · SUBJECT ANALYSIS
              </p>
              <div className="border border-[#CC0000]/30 rounded-sm px-3 py-1 rotate-[-2deg] bg-[#CC0000]/5">
                <p
                  className="text-[#CC0000]/50 text-[9px] tracking-[3px]"
                  style={{ fontFamily: "Special Elite" }}
                >
                  CLASSIFIED
                </p>
              </div>
            </div>

            <h2
              className="text-2xl md:text-4xl tracking-widest text-[#F5F0E8] mb-8"
              style={{ fontFamily: "Metal Mania" }}
            >
              WHAT IS A VILLAIN?
            </h2>

            <div className="space-y-5 relative z-10">
              <p
                className="text-[#F5F0E8]/60 text-sm md:text-base leading-loose"
                style={{ fontFamily: "Special Elite" }}
              >
                A Villain is not evil.{" "}
                <span className="text-[#F5F0E8]">A Villain is evolved.</span>
              </p>

              <p
                className="text-[#F5F0E8]/60 text-sm md:text-base leading-loose"
                style={{ fontFamily: "Special Elite" }}
              >
                They are the person who got stabbed in the back enough times to
                learn how to{" "}
                <span className="bg-[#F5F0E8]/75 text-transparent rounded-sm px-16 select-none">
                  ████████████████
                </span>
                . Who loved too hard and got burned enough times to build
                something from the ashes. Who was told they were too much and
                decided — <span className="text-[#CC0000]">good.</span>
              </p>

              <div className="border-l-2 border-[#CC0000]/50 pl-6 my-8 py-2">
                <p
                  className="text-[#F5F0E8]/80 text-base md:text-lg leading-relaxed italic"
                  style={{ fontFamily: "Special Elite" }}
                >
                  "A Villain does not ask for permission. A Villain does not
                  need validation. A Villain has already been through the worst
                  and chose to keep going anyway."
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <div className="w-14 h-14 border border-[#F5F0E8]/8 rounded-full flex items-center justify-center backdrop-blur-sm">
                <p
                  className="text-[#F5F0E8]/15 text-[7px] text-center tracking-widest leading-tight"
                  style={{ fontFamily: "Special Elite" }}
                >
                  PRINT
                  <br />
                  ON
                  <br />
                  FILE
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 3 — Mission ── */}
        <div
          className={`mb-10 transition-all duration-700 delay-400 ${revealed[3] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-[#0D0D0D]/60 backdrop-blur-xl border border-[#F5F0E8]/6 rounded-2xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <p
                className="text-[#CC0000]/4 text-[100px] font-bold rotate-[-25deg] tracking-widest"
                style={{ fontFamily: "Metal Mania" }}
              >
                RESTRICTED
              </p>
            </div>

            <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-[#CC0000]/40 to-transparent rounded-full" />

            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <p
                className="text-[#F5F0E8]/20 text-[9px] tracking-[6px]"
                style={{ fontFamily: "Special Elite" }}
              >
                SECTION 03 · KNOWN MISSION
              </p>
              <div className="border border-[#CC0000]/30 rounded-sm px-3 py-1 rotate-[3deg] bg-[#CC0000]/5">
                <p
                  className="text-[#CC0000]/50 text-[9px] tracking-[3px]"
                  style={{ fontFamily: "Special Elite" }}
                >
                  RESTRICTED
                </p>
              </div>
            </div>

            <div className="space-y-5 relative z-10">
              <p
                className="text-[#F5F0E8]/60 text-sm md:text-base leading-loose"
                style={{ fontFamily: "Special Elite" }}
              >
                Villain Society exists for the ones who never fit the mold. The
                ones who got pushed to their limit and unlocked a version of
                themselves that even they did not know existed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                {[
                  { label: "THIS IS NOT", value: "FASHION" },
                  { label: "THIS IS NOT", value: "A BRAND" },
                  { label: "THIS IS NOT", value: "FOR EVERYONE" },
                ].map((item) => (
                  <div
                    key={item.value}
                    className="bg-[#111]/60 backdrop-blur-sm border border-[#F5F0E8]/6 rounded-xl p-5 text-center"
                  >
                    <p
                      className="text-[#F5F0E8]/25 text-[8px] tracking-[3px] mb-3"
                      style={{ fontFamily: "Special Elite" }}
                    >
                      {item.label}
                    </p>
                    <div className="bg-[#F5F0E8]/70 h-4 w-full rounded-sm" />
                  </div>
                ))}
              </div>

              <p
                className="text-[#F5F0E8]/60 text-sm md:text-base leading-loose"
                style={{ fontFamily: "Special Elite" }}
              >
                This is armor. This is proof that you survived. This is what
                discipline looks like when it is worn on your back.
              </p>

              <p
                className="text-[#F5F0E8]/80 text-sm md:text-base leading-loose"
                style={{ fontFamily: "Special Elite" }}
              >
                We build for the ones who became{" "}
                <span className="text-[#F5F0E8] font-bold">
                  exactly what the world tried to break.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ── CLOSING ── */}
        <div
          className={`mb-10 transition-all duration-700 delay-500 ${revealed[4] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-[#0D0D0D]/60 backdrop-blur-xl border border-[#CC0000]/20 rounded-2xl p-10 md:p-14 relative overflow-hidden text-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 bg-red-900/10 blur-[80px] rounded-full" />
            </div>

            <p
              className="text-[#F5F0E8]/20 text-[9px] tracking-[6px] mb-6"
              style={{ fontFamily: "Special Elite" }}
            >
              FINAL STATEMENT · AGENT UNKNOWN
            </p>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#CC0000]/50 to-transparent mx-auto mb-8" />

            <p
              className="text-[#F5F0E8] text-2xl md:text-4xl leading-relaxed relative z-10"
              style={{ fontFamily: "Metal Mania" }}
            >
              You were always the villain
              <br />
              in someone else's story.
              <br />
              <span className="text-[#CC0000] drop-shadow-[0_0_30px_rgba(204,0,0,0.5)]">
                Now you dress like it.
              </span>
            </p>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#CC0000]/50 to-transparent mx-auto mt-8 mb-6" />

            <div className="flex justify-center items-center gap-4">
              <div className="h-px bg-[#F5F0E8]/10 w-16" />
              <p
                className="text-[#F5F0E8]/20 text-[9px] tracking-[5px]"
                style={{ fontFamily: "Special Elite" }}
              >
                VILLAIN SOCIETY · EST. 2026
              </p>
              <div className="h-px bg-[#F5F0E8]/10 w-16" />
            </div>
          </div>
        </div>

        {/* ── FOOTER BAR ── */}
        <div className="bg-[#0D0D0D]/40 backdrop-blur-xl border border-[#F5F0E8]/6 rounded-xl p-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p
              className="text-[#F5F0E8]/15 text-[9px] tracking-[4px]"
              style={{ fontFamily: "Special Elite" }}
            >
              DESTROY AFTER READING
            </p>
            <p
              className="text-[#F5F0E8]/15 text-[9px] tracking-[4px]"
              style={{ fontFamily: "Special Elite" }}
            >
              CASE FILE: VS-2026-001
            </p>
            <div className="border border-[#CC0000]/30 rounded-sm px-3 py-1 rotate-[-2deg] bg-[#CC0000]/5">
              <p
                className="text-[#CC0000]/40 text-[9px] tracking-[3px]"
                style={{ fontFamily: "Special Elite" }}
              >
                DO NOT DISTRIBUTE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

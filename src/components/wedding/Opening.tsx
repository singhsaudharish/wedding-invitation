import { useEffect, useState } from "react";
import bride from "@/assets/bride.png";
import groom from "@/assets/groom.png";
import bg from "@/assets/wedding-bg.jpg";
import { Mandala } from "./Decor";

export function Opening({ onOpen }: { onOpen: () => void }) {
  const [stage, setStage] = useState(0); // 0 bg, 1 characters, 2 speech, 3 names+button, 4 doors
  useEffect(() => {
    const ts = [setTimeout(() => setStage(1), 700), setTimeout(() => setStage(2), 2400), setTimeout(() => setStage(3), 3600)];
    return () => ts.forEach(clearTimeout);
  }, []);

  const open = () => {
    setStage(4);
    onOpen();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-ivory">
      <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90 anim-rise" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/70" />
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="anim-glow absolute h-2 w-2 rounded-full bg-gold-light shadow-[0_0_12px_4px] shadow-gold-light"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 23) % 45}%`, animationDelay: `${i * 0.3}s` }}
        />
      ))}

      <div className="relative flex h-full flex-col items-center justify-end px-3 pb-6 sm:pb-10">
        {stage >= 2 && (
          <div className="anim-pop relative mx-auto mb-3 max-w-md rounded-3xl border-2 border-gold bg-card/95 px-5 py-4 text-center shadow-xl sm:mb-5 sm:max-w-lg">
            <p className="font-serif text-base italic leading-snug text-primary sm:text-xl">
              <span className="anim-wave">🙏</span> "Namaste! With lots of love and happiness, we invite you to celebrate our special wedding moments with us!"
            </p>
            <span className="absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-gold bg-card" />
          </div>
        )}

        <div className="flex w-full max-w-3xl items-end justify-center gap-0 sm:gap-6">
          {stage >= 1 && (
            <>
              <div className="anim-enter-left relative w-[42%] max-w-[260px]">
                <img src={bride} alt="Animated bride in maroon lehenga waving" width={768} height={1152} className="anim-bob h-auto w-full drop-shadow-2xl" />
              </div>
              <div className="anim-enter-right relative w-[42%] max-w-[260px]" >
                <img src={groom} alt="Animated groom in golden sherwani waving" width={768} height={1152} className="anim-bob h-auto w-full drop-shadow-2xl" style={{ animationDelay: "0.5s" }} />
              </div>
            </>
          )}
        </div>

        {stage >= 3 && (
          <div className="anim-rise mt-2 text-center">
            <h1 className="font-script text-5xl text-primary drop-shadow sm:text-7xl">
              Dhanashri <span className="text-rose">❤️</span> Sairaj
            </h1>
            <button
              onClick={open}
              className="btn-shimmer anim-pop mt-4 rounded-full border-2 border-gold px-7 py-3 font-display text-sm tracking-widest text-primary-foreground shadow-xl transition hover:scale-105 sm:text-base"
            >
              ✨ Open Wedding Invitation ✨
            </button>
          </div>
        )}
      </div>

      {/* Golden doors */}
      {stage === 4 && (
        <div className="pointer-events-none absolute inset-0 flex">
          {["door-l", "door-r"].map((c) => (
            <div key={c} className={`${c} relative h-full w-1/2 overflow-hidden border-x-4 border-gold bg-primary`}>
              <div className="absolute inset-4 rounded-t-full border-4 border-gold/70" />
              <Mandala className="absolute left-1/2 top-1/2 w-40 -translate-x-1/2 -translate-y-1/2 text-gold sm:w-64" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Loader() {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ivory">
      <Mandala className="anim-spin-slow w-28 text-gold" />
      <p className="mt-4 font-script text-3xl text-primary">Dhanashri & Sairaj</p>
    </div>
  );
}

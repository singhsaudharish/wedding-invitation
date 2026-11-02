import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarPlus, MapPin, Menu, Music, Pause, Share2, ArrowUp, X } from "lucide-react";
import mandap from "@/assets/mandap.jpg";
import bride from "@/assets/bride.png";
import groom from "@/assets/groom.png";
import { Opening, Loader } from "@/components/wedding/Opening";
import { Petals, Mandala, Divider, Reveal, Countdown } from "@/components/wedding/Decor";
import { EVENTS, calendarUrl, mapsUrl, type WeddingEvent } from "@/lib/events";
import { startMusic, stopMusic } from "@/lib/music";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhanashri ❤️ Sairaj – Wedding Invitation" },
      { name: "description", content: "You are warmly invited to the Engagement, Haldi, Wedding & Reception of Dhanashri and Sairaj in Mumbai, 2026." },
      { property: "og:title", content: "Dhanashri ❤️ Sairaj – Wedding Invitation" },
      { property: "og:description", content: "Join us to celebrate our wedding ceremonies in Mumbai – Nov & Dec 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["welcome", "Welcome"],
  ["engagement", "Engagement"],
  ["haldi", "Haldi"],
  ["wedding", "Wedding"],
  ["countdown", "Countdown"],
  ["blessings", "Blessings"],
] as const;

function Index() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [showSite, setShowSite] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [menu, setMenu] = useState(false);
  const [top, setTop] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    const s = () => setTop(window.scrollY > 600);
    window.addEventListener("scroll", s);
    return () => (clearTimeout(t), window.removeEventListener("scroll", s));
  }, []);

  useEffect(() => {
    document.body.style.overflow = showSite ? "" : "hidden";
  }, [showSite]);

  const handleOpen = () => {
    setOpened(true);
    startMusic();
    setPlaying(true);
    setTimeout(() => setShowSite(true), 1700);
  };

  const toggleMusic = () => {
    if (playing) stopMusic();
    else startMusic();
    setPlaying(!playing);
  };

  const share = async () => {
    const data = { title: "Dhanashri ❤️ Sairaj – Wedding Invitation", text: "You're invited to our wedding celebrations!", url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(data); } catch { /* cancelled */ }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${data.text} ${data.url}`)}`, "_blank");
    }
  };

  const [eng, haldi, wed] = EVENTS as [WeddingEvent, WeddingEvent, WeddingEvent];

  return (
    <div className="relative min-h-screen bg-background">
      {loading && <Loader />}
      {!showSite && !loading && <Opening onOpen={handleOpen} />}
      {opened && <Petals />}

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-gold/40 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <a href="#welcome" className="font-script text-2xl text-primary">D ❤ S</a>
          <nav className="hidden gap-6 md:flex">
            {NAV.map(([id, l]) => (
              <a key={id} href={`#${id}`} className="font-display text-xs tracking-widest text-primary hover:text-gold">{l}</a>
            ))}
          </nav>
          <button className="text-primary md:hidden" onClick={() => setMenu(!menu)} aria-label="Menu">
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <nav className="flex flex-col border-t border-gold/30 bg-background md:hidden">
            {NAV.map(([id, l]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="px-6 py-3 font-display text-sm tracking-widest text-primary">{l}</a>
            ))}
          </nav>
        )}
      </header>

      {/* Welcome */}
      <section id="welcome" className="relative overflow-hidden px-4 pb-20 pt-28 text-center">
        <Mandala className="anim-spin-slow absolute -left-32 -top-32 w-96 text-gold/20" />
        <Mandala className="anim-spin-slow absolute -bottom-32 -right-32 w-96 text-rose/30" />
        <Reveal className="relative mx-auto max-w-2xl">
          <p className="font-deva text-xl text-primary sm:text-2xl">॥ ॐ श्री गणपतये नमः ॥</p>
          <Divider />
          <p className="font-display tracking-[0.3em] text-gold">WEDDING CELEBRATION</p>
          <h2 className="mt-2 font-script text-6xl text-primary sm:text-8xl">Dhanashri & Sairaj</h2>
          <p className="mt-4 text-xl italic text-muted-foreground">"Two hearts, one beautiful journey, and a lifetime of togetherness."</p>
          <p className="mt-6 text-lg">With the blessings of our elders and families, we cordially invite you to join us in celebrating our wedding ceremonies.</p>
        </Reveal>
        <div className="relative mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          <PersonCard img={bride} role="Bride" name="Dhanashri" line="D/o Shri Harisingh Karki & Mrs. Heera Karki" />
          <PersonCard img={groom} role="Groom" name="Sairaj" line="S/o Late Sanjay Satvidkar & Smt. Sampada Satvidkar" />
        </div>
      </section>

      {/* Engagement */}
      <section id="engagement" className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-muted px-4 py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="relative mx-auto mb-4 h-24 w-40">
            <span className="ring-l absolute left-6 top-4 block h-16 w-16 rounded-full border-[6px] border-gold shadow-[0_0_20px] shadow-gold-light" />
            <span className="ring-r absolute right-6 top-4 block h-16 w-16 rounded-full border-[6px] border-gold shadow-[0_0_20px] shadow-gold-light" />
            <span className="anim-glow absolute left-1/2 top-0 -translate-x-1/2 text-2xl">💎</span>
            <span className="anim-glow absolute right-2 top-1 text-sm" style={{ animationDelay: ".8s" }}>✨</span>
            <span className="anim-glow absolute bottom-0 left-2 text-sm" style={{ animationDelay: "1.4s" }}>✨</span>
          </div>
          <EventCard e={eng} extra={<p className="text-lg"><b>Bride:</b> Dhanashri · <b>Groom:</b> Sairaj</p>} />
        </Reveal>
      </section>

      {/* Haldi */}
      <section id="haldi" className="relative overflow-hidden bg-gradient-to-b from-haldi-soft to-haldi/40 px-4 py-20">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 flex justify-around text-3xl">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="anim-bob" style={{ animationDelay: `${i * 0.2}s` }}>🏵️</span>
          ))}
        </div>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-5xl">🌼 🥥 🌼</p>
          <EventCard e={haldi} tone="haldi" />
        </Reveal>
      </section>

      {/* Wedding */}
      <section id="wedding" className="relative overflow-hidden px-4 py-20">
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="relative mx-auto mb-6 max-w-2xl overflow-hidden rounded-t-[50%] border-4 border-gold shadow-2xl">
            <img src={mandap} alt="Decorated wedding mandap" loading="lazy" width={1200} height={912} className="w-full" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 pb-2">
              <img src={bride} alt="" loading="lazy" className="anim-bob w-[22%]" />
              <img src={groom} alt="" loading="lazy" className="anim-bob w-[22%]" style={{ animationDelay: ".6s" }} />
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="petal text-xl" style={{ left: `${(i * 7) % 100}%`, animationDuration: `${5 + (i % 4)}s`, animationDelay: `${-i * 0.6}s` }}>🌹</span>
              ))}
            </div>
          </div>
          <EventCard e={wed} />
        </Reveal>
      </section>

      {/* Countdown */}
      <section id="countdown" className="bg-primary px-4 py-20 text-center text-primary-foreground">
        <Reveal>
          <h2 className="font-script text-5xl text-gold-light sm:text-6xl">Counting Down</h2>
          <p className="mb-10 mt-2 text-sm tracking-widest">INDIAN STANDARD TIME</p>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-3">
            {EVENTS.map((e) => (
              <div key={e.id}>
                <h3 className="mb-3 font-display tracking-widest text-gold-light">{e.title}</h3>
                <Countdown target={e.startIso} />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Blessings */}
      <section id="blessings" className="relative overflow-hidden px-4 py-20 text-center">
        <Mandala className="anim-spin-slow absolute left-1/2 top-1/2 w-[36rem] -translate-x-1/2 -translate-y-1/2 text-lavender/40" />
        <Reveal className="relative mx-auto max-w-xl rounded-3xl border-2 border-gold bg-card/90 p-8 shadow-xl">
          <p className="text-3xl">🌺 🪔 🌺</p>
          <h2 className="mt-3 font-display tracking-[0.2em] text-gold">WITH BEST COMPLIMENTS FROM</h2>
          <p className="mt-3 font-script text-4xl text-primary">Smt. Damaradevi Kalusingh Karki</p>
          <p className="text-xl">& Family</p>
          <Divider />
          <h3 className="font-display tracking-[0.2em] text-gold">VYAVASTHAPAK</h3>
          <p className="mt-2 text-xl">Navmitra Krida Mandal</p>
          <p className="text-xl">Stree Jagruti Mahila Mandal</p>
          <Divider />
          <p className="text-xl italic text-primary">"Your presence and blessings will make our celebrations even more special."</p>
          <p className="mt-4 font-script text-3xl text-rose">Thank you ❤️</p>
        </Reveal>
        <p className="mt-10 font-script text-4xl text-primary">Dhanashri ❤️ Sairaj</p>
      </section>

      {/* Floating actions */}
      {showSite && (
        <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3">
          <FabButton label={playing ? "Pause music" : "Play music"} onClick={toggleMusic}>{playing ? <Pause size={18} /> : <Music size={18} />}</FabButton>
          <FabButton label="Share invitation" onClick={share}><Share2 size={18} /></FabButton>
          {top && <FabButton label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp size={18} /></FabButton>}
        </div>
      )}
    </div>
  );
}

function FabButton({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button aria-label={label} title={label} onClick={onClick} className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-primary text-primary-foreground shadow-lg transition hover:scale-110">
      {children}
    </button>
  );
}

function PersonCard({ img, role, name, line }: { img: string; role: string; name: string; line: string }) {
  return (
    <Reveal className="rounded-3xl border-2 border-gold/60 bg-card p-6 shadow-lg">
      <div className="mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-gold bg-secondary">
        <img src={img} alt={name} loading="lazy" className="h-[260%] w-full object-cover object-top" />
      </div>
      <p className="mt-4 font-display text-sm tracking-[0.3em] text-gold">{role.toUpperCase()}</p>
      <p className="font-script text-5xl text-primary">{name}</p>
      <p className="mt-2 text-lg text-muted-foreground">{line}</p>
    </Reveal>
  );
}

function EventCard({ e, tone, extra }: { e: WeddingEvent; tone?: "haldi"; extra?: React.ReactNode }) {
  return (
    <div className={`relative rounded-3xl border-2 border-gold p-6 shadow-2xl sm:p-10 ${tone === "haldi" ? "bg-haldi-soft" : "bg-card"}`}>
      <span className="absolute left-3 top-3 text-gold">❀</span>
      <span className="absolute right-3 top-3 text-gold">❀</span>
      <h2 className="font-display text-2xl tracking-[0.2em] text-gold-gradient sm:text-4xl">{e.title.toUpperCase()}</h2>
      <Divider />
      {extra}
      <p className="mt-2 text-xl font-semibold text-primary">{e.date}</p>
      <p className="text-lg">{e.time}</p>
      <p className="mt-5 font-display tracking-widest text-gold">{e.id === "haldi" ? "RESIDENCE" : "VENUE"}</p>
      {e.id !== "haldi" && <p className="font-script text-4xl text-primary">{e.placeTitle}</p>}
      <p className="mx-auto mt-1 max-w-md text-lg text-muted-foreground">{e.address}</p>
      <div className="my-6"><Countdown target={e.startIso} tone={tone === "haldi" ? "haldi" : "primary"} /></div>
      <div className="flex flex-wrap justify-center gap-3">
        <a href={mapsUrl(e)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-display text-xs tracking-widest text-primary-foreground shadow transition hover:scale-105">
          <MapPin size={16} /> GOOGLE MAPS
        </a>
        <a href={calendarUrl(e)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 font-display text-xs tracking-widest text-primary transition hover:scale-105">
          <CalendarPlus size={16} /> ADD TO CALENDAR
        </a>
      </div>
    </div>
  );
}

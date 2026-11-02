export type WeddingEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  startIso: string; // IST
  endIso: string;
  placeTitle: string;
  address: string;
};

export const EVENTS: WeddingEvent[] = [
  {
    id: "engagement",
    title: "Engagement Ceremony",
    date: "Monday, 16 November 2026",
    time: "5:00 PM",
    startIso: "2026-11-16T17:00:00+05:30",
    endIso: "2026-11-16T21:00:00+05:30",
    placeTitle: "Flamingo Banquet Hall",
    address:
      "2nd Floor, Above Shri Kutchi Lohar Banquet, 15, Laxmi Narayan Lane, Near Matunga (C.R.) Railway Station, Matunga (East), Mumbai – 400019.",
  },
  {
    id: "haldi",
    title: "Haldi Ceremony",
    date: "Wednesday, 02 December 2026",
    time: "6:00 PM to 8:00 PM",
    startIso: "2026-12-02T18:00:00+05:30",
    endIso: "2026-12-02T20:00:00+05:30",
    placeTitle: "Residence",
    address: "A-602, Amar Nagar CHS, Behind Worli BEST Agar, Sasmira Road, Worli, Mumbai – 400030.",
  },
  {
    id: "wedding",
    title: "Wedding & Reception",
    date: "Friday, 04 December 2026",
    time: "5:00 PM onwards · Followed by Dinner",
    startIso: "2026-12-04T17:00:00+05:30",
    endIso: "2026-12-04T23:00:00+05:30",
    placeTitle: "Vanita Samaj Hall",
    address: "Shivaji Park, S. S. Marg, Dadar (West), Mumbai – 400028.",
  },
];

export function mapsUrl(e: WeddingEvent) {
  const q = e.id === "haldi" ? e.address : `${e.placeTitle}, ${e.address}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

const toCal = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function calendarUrl(e: WeddingEvent) {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: `${e.title} – Dhanashri & Sairaj`,
    dates: `${toCal(e.startIso)}/${toCal(e.endIso)}`,
    details: `${e.date}, ${e.time}. With love, Dhanashri & Sairaj`,
    location: `${e.placeTitle}, ${e.address}`,
    ctz: "Asia/Kolkata",
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

export function timeLeft(targetIso: string, now: number) {
  const diff = Math.max(0, new Date(targetIso).getTime() - now);
  return {
    done: diff === 0,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// Gentle synthesized raga-style melody using Web Audio (no external file needed).
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let timer: ReturnType<typeof setInterval> | null = null;

const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33]; // C major pentatonic-ish (Bhoopali)
const MELODY = [0, 1, 2, 3, 4, 3, 2, 1, 2, 4, 5, 4, 3, 2, 1, 0, 2, 3, 4, 6, 5, 4, 3, 2];

function pluck(freq: number, t: number) {
  if (!ctx || !master) return;
  const o = ctx.createOscillator();
  const o2 = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "triangle";
  o2.type = "sine";
  o.frequency.value = freq;
  o2.frequency.value = freq * 2.01;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.25, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, t + 1.6);
  o.connect(g);
  o2.connect(g);
  g.connect(master);
  o.start(t);
  o2.start(t);
  o.stop(t + 1.7);
  o2.stop(t + 1.7);
}

function drone() {
  if (!ctx || !master) return;
  [130.81, 196.0].forEach((f) => {
    const o = ctx!.createOscillator();
    const g = ctx!.createGain();
    o.type = "sine";
    o.frequency.value = f;
    g.gain.value = 0.05;
    o.connect(g);
    g.connect(master!);
    o.start();
  });
}

export function startMusic() {
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0.35;
    master.connect(ctx.destination);
    drone();
  }
  ctx.resume();
  if (timer) return;
  // Song 1: calm Bhoopali melody. Song 2: festive shehnai-style "baraat" tune.
  // They alternate, each playing twice through.
  const SONG2 = [0, 2, 4, 5, 4, 2, 4, 5, 6, 5, 4, 2, 3, 2, 1, 0, 4, 4, 5, 4, 2, 1, 2, 0];
  const songs = [MELODY, SONG2];
  let i = 0;
  const step = () => {
    if (!ctx) return;
    const song = songs[Math.floor(i / (MELODY.length * 2)) % 2] ?? MELODY;
    const isSong2 = song === SONG2;
    const freq = (SCALE[song[i % song.length] ?? 0] ?? 261.63) * (isSong2 ? 1.5 : 1);
    pluck(freq, ctx.currentTime + 0.05);
    if (isSong2 && i % 2 === 0) pluck(freq / 2, ctx.currentTime + 0.05);
    i++;
  };
  step();
  timer = setInterval(step, 500);
}

export function stopMusic() {
  if (timer) clearInterval(timer);
  timer = null;
  ctx?.suspend();
}

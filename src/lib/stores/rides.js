// nur Zeitbasistarif
import { writable, derived } from 'svelte/store';
import { isAvailable, setStatus } from './scooters';

const TARIFF = {
  unlockFeeCents: 100,   // 1,00 €
  perMinuteCents: 25     // 0,25 €/Min
};

function priceCents(durationMinutes) {
  const g = TARIFF.unlockFeeCents;
  const t = Math.max(0, Math.ceil(durationMinutes)) * TARIFF.perMinuteCents;
  return Math.round(g + t);
}

export const activeRide = writable(null); // {id,scooterId,startedAt,stoppedAt}

let tickHandle = null;
export const now = writable(Date.now());

function startTicker() {
  if (tickHandle) return;
  tickHandle = setInterval(() => now.set(Date.now()), 1000);
}
function stopTicker() {
  if (!tickHandle) return;
  clearInterval(tickHandle);
  tickHandle = null;
}

export const durationMinutes = derived(
  [activeRide, now],
  ([$ride]) => {
    if (!$ride) return 0;
    const end = $ride.stoppedAt ? $ride.stoppedAt : Date.now();
    return Math.max(0, (end - $ride.startedAt) / 60000);
  }
);

export const livePriceCents = derived(
  [durationMinutes],
  ([minutes]) => priceCents(minutes)
);

export function startRide(scooter) {
  if (!scooter || !isAvailable(scooter)) return { ok: false, reason: 'not_available' };
  const ride = {
    id: `R-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
    scooterId: scooter.id,
    startedAt: Date.now(),
    stoppedAt: null
  };
  setStatus(scooter.id, 'in_use');
  activeRide.set(ride);
  startTicker();
  return { ok: true, rideId: ride.id };
}

export function stopRide() {
  let summary = null;
  let scooterId = null;

  // 1) Abschluss berechnen
  activeRide.update(r => {
    if (!r) return r;
    const stoppedAt = Date.now();
    const minutes = Math.max(0, (stoppedAt - r.startedAt) / 60000);
    const price = priceCents(minutes);
    scooterId = r.scooterId;
    summary = {
      rideId: r.id,
      scooterId: r.scooterId,
      minutes: Math.ceil(minutes),
      priceCents: price
    };
    return { ...r, stoppedAt };
  });

  // 2) Status freigeben und Ticker stoppen
  if (scooterId) setStatus(scooterId, 'available');
  stopTicker();

  // 3) Fahrt wirklich beenden -> UI entsperrt Start-Button wieder
  activeRide.set(null);

  return summary;
}


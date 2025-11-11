// Zeilen 1–132
import { writable, derived } from 'svelte/store';
import { selectedScooter, isAvailable, setStatus } from './scooters';

const TARIFF = {
  unlockFeeCents: 100,   // 1,00 €
  perMinuteCents: 25,    // 0,25 €/Min
  perKmCents: 20         // 0,20 €/km
};

function priceCents(durationMinutes, distanceKm) {
  const g = TARIFF.unlockFeeCents;
  const t = Math.max(0, Math.ceil(durationMinutes)) * TARIFF.perMinuteCents;
  const s = Math.max(0, distanceKm) * TARIFF.perKmCents;
  return Math.round(g + t + s);
}

export const activeRide = writable(null); // {id,scooterId,startedAt,stoppedAt,distanceKm}

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
  [activeRide, durationMinutes],
  ([$ride, minutes]) => {
    if (!$ride) return 0;
    return priceCents(minutes, $ride.distanceKm);
  }
);

export function startRide(scooter) {
  if (!scooter || !isAvailable(scooter)) return { ok: false, reason: 'not_available' };
  const ride = {
    id: `R-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
    scooterId: scooter.id,
    startedAt: Date.now(),
    stoppedAt: null,
    distanceKm: 0
  };
  setStatus(scooter.id, 'in_use');
  activeRide.set(ride);
  startTicker();
  return { ok: true, rideId: ride.id };
}

export function addDistance(deltaKm) {
  activeRide.update(r => (r ? { ...r, distanceKm: Math.max(0, r.distanceKm + Math.max(0, deltaKm)) } : r));
}

export function stopRide() {
  let summary = null;
  activeRide.update(r => {
    if (!r) return r;
    const stoppedAt = Date.now();
    const minutes = Math.max(0, (stoppedAt - r.startedAt) / 60000);
    const price = priceCents(minutes, r.distanceKm);
    summary = {
      rideId: r.id,
      scooterId: r.scooterId,
      minutes: Math.ceil(minutes),
      km: Number(r.distanceKm.toFixed(2)),
      priceCents: price
    };
    setStatus(r.scooterId, 'available');
    return { ...r, stoppedAt };
  });
  stopTicker();
  return summary;
}

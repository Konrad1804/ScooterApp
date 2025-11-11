// Zeilen 1–78
import { writable, derived } from 'svelte/store';

function id() {
  return Math.random().toString(36).slice(2, 10);
}

export const scooters = writable([
  { id: 'SC-1001', model: 'Urban Lite', batteryPercent: 95, status: 'available' },
  { id: 'SC-1002', model: 'City Pro',  batteryPercent: 72, status: 'available' },
  { id: 'SC-1003', model: 'City Pro',  batteryPercent: 18, status: 'maintenance' }
]);

export const selectedScooterId = writable(null);
export const selectedScooter = derived(
  [scooters, selectedScooterId],
  ([$scooters, $id]) => $scooters.find(s => s.id === $id) ?? null
);

export function addScooter({ id: givenId, model, batteryPercent = 100, status = 'available' }) {
  const newId = givenId?.trim() || `SC-${id().toUpperCase()}`;
  scooters.update(list => [...list, { id: newId, model, batteryPercent, status }]);
  return newId;
}

export function setStatus(scooterId, status) {
  scooters.update(list =>
    list.map(s => (s.id === scooterId ? { ...s, status } : s))
  );
}

export function updateBattery(scooterId, batteryPercent) {
  scooters.update(list =>
    list.map(s => (s.id === scooterId ? { ...s, batteryPercent } : s))
  );
}

export function isAvailable(s) {
  return s.status === 'available' && s.batteryPercent > 10;
}

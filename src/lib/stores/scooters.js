import { writable, derived } from 'svelte/store';

function id() {
  return Math.random().toString(36).slice(2, 10);
}

export const scooters = writable([
  
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

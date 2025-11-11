<!-- Zeilen 1–112 -->
<script>
  import { selectedScooter } from '../stores/scooters';
  import { activeRide, startRide, stopRide, livePriceCents, durationMinutes, addDistance } from '../stores/rides';

  let distanceInput = 0.1; // km zum manuellen Hinzufügen

  function start() {
    if ($selectedScooter) startRide($selectedScooter);
  }
  function stop() {
    const sum = stopRide();
    if (sum) alert(`Fahrt ${sum.rideId}\nMinuten: ${sum.minutes}\nkm: ${sum.km}\nPreis: ${(sum.priceCents/100).toFixed(2)} €`);
  }
  function add() {
    addDistance(Number(distanceInput) || 0);
  }
</script>

<div>
  <button on:click={start} disabled={!$selectedScooter || $activeRide}>Start</button>
  <button on:click={stop} disabled={!$activeRide}>Stop</button>
</div>

<div>
  <p>Aktuelle Dauer: {Math.ceil($durationMinutes)} min</p>
  <p>Preis: {($livePriceCents / 100).toFixed(2)} €</p>
</div>

<div>
  <input type="number" min="0" step="0.1" bind:value={distanceInput} />
  <button on:click={add} disabled={!$activeRide}>+ Distanz (km)</button>
</div>

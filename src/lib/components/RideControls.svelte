<script>
  import { selectedScooter } from '../stores/scooters';
  import { activeRide, startRide, stopRide, livePriceCents, durationMinutes } from '../stores/rides';

  function start() {
    if ($selectedScooter) startRide($selectedScooter);
  }
  function stop() {
    const sum = stopRide();
    if (sum) alert(`Fahrt ${sum.rideId}\nMinuten: ${sum.minutes}\nPreis: ${(sum.priceCents/100).toFixed(2)} €`);
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

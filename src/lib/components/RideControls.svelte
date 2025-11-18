<script>
  import { selectedScooter } from '../stores/scooters';
  import { activeRide, startRide, stopRide, livePriceCents, durationMinutes } from '../stores/rides';

  function start() {
    if ($selectedScooter) startRide($selectedScooter);
  }
  function stop() {
    const sum = stopRide();
    if (sum) {
      alert(`Fahrt ${sum.rideId}\nMinuten: ${sum.minutes}\nPreis: ${(sum.priceCents/100).toFixed(2)} €`);
  }
  }
</script>
<div class="card">
  <div class="row" style="justify-content:flex-start;">
    <button class="btn btn-primary" on:click={start} disabled={!$selectedScooter || $activeRide}>Start</button>
    <button class="btn btn-danger" on:click={stop} disabled={!$activeRide}>Stop</button>
  </div>

  <div style="margin-top:0.75rem; text-align:left;">
    <p class="muted" style="margin:0 0 0.25rem;">Aktuelle Dauer</p>
    <p style="margin:0 0 0.5rem; font-weight:700;">{Math.ceil($durationMinutes)} min</p>

    <p class="muted" style="margin:0 0 0.25rem;">Preis</p>
    <p style="margin:0; font-size:1.15rem; font-weight:800;">{($livePriceCents / 100).toFixed(2)} €</p>
  </div>
</div>
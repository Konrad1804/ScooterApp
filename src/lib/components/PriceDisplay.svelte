<script>
  import { livePriceCents } from '../stores/rides';
</script>
<div class="card">
  <p style="font-weight:700; margin:0;">Aktueller Preis</p>
  <p style="font-size:1.25rem; margin:0.5rem 0 0; font-weight:800;">{($livePriceCents / 100).toFixed(2)} €</p>
</div>

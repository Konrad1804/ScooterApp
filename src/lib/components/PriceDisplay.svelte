<!-- Zeilen 1–18 -->
<script>
  import { livePriceCents } from '../stores/rides';
</script>

<p style="font-weight:600">Preis: {($livePriceCents / 100).toFixed(2)} €</p>

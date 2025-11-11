<!-- Zeilen 1–20 -->
<script>
  function goto(hash) { location.hash = hash; }
</script>

<h1>Fahrpreis-App</h1>
<button on:click={() => goto('#/customer')}>Kunde</button>
<button on:click={() => goto('#/employee')}>Mitarbeiter</button>

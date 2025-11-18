<script>
  function goto(hash) { location.hash = hash; }
</script>

<img src="/scooteq.png" alt="ScooTeq" style="max-width:280px; display:block; margin:0 auto 1rem;" />
<h1>ScooTeq Deine App</h1>
<button on:click={() => goto('#/customer')}>Kunde</button>
<button on:click={() => goto('#/employee')}>Mitarbeiter</button>

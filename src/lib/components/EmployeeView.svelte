<script>
  import { addScooter, scooters, setStatus, updateBattery } from '../stores/scooters';

  let id = '';
  let model = '';
  let batteryPercent = 100;

  function submit() {
    const newId = addScooter({ id, model, batteryPercent, status: 'available' });
    id = ''; batteryPercent = 100;
    alert(`Scooter ${newId} angelegt`);
  }
</script>

<h2>Mitarbeiter</h2>

<form on:submit|preventDefault={submit}>
  <input placeholder="ID optional" bind:value={id} />
  <input placeholder="Modell" bind:value={model} />
  <input type="number" min="0" max="100" bind:value={batteryPercent} />
  <button type="submit">Hinzufügen</button>
</form>

<h3>Bestand</h3>
<ul>
  {#each $scooters as s}
    <li>
      {s.id} · {s.model} · {s.batteryPercent}% · {s.status}
      <button on:click={() => setStatus(s.id, 'available')}>available</button>
      <button on:click={() => setStatus(s.id, 'in_use')}>in_use</button>
      <button on:click={() => setStatus(s.id, 'maintenance')}>maintenance</button>
      <!-- Zeile 34 ersetzen -->
      <input type="number" min="0" max="100" value={s.batteryPercent}
      on:change={(e)=>updateBattery(s.id, Number(/** @type {HTMLInputElement} */(e.target).value))} />

    </li>
  {/each}
</ul>


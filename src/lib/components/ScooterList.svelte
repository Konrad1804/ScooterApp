<!-- Zeilen 1–48 -->
<script>
  import { scooters, selectedScooterId } from '../stores/scooters';
  import { get } from 'svelte/store';
  export let showOnlyAvailable = false;

  $: list = $scooters.filter(s => !showOnlyAvailable || (s.status === 'available' && s.batteryPercent > 10));

  function selectFirstIfNone() {
    if (!get(selectedScooterId) && list.length) selectedScooterId.set(list[0].id);
  }
  $: selectFirstIfNone();
</script>

<label for="scooter">Scooter</label>
<select id="scooter" bind:value={$selectedScooterId}>
  {#each list as s}
    <option value={s.id}>
      {s.id} · {s.model} · {s.batteryPercent}%
    </option>
  {/each}
</select>

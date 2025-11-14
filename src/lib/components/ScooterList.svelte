<script>
  import { scooters, selectedScooterId } from '../stores/scooters';
  import { get } from 'svelte/store';
  export let showOnlyAvailable = false;


  $: filtered = $scooters.filter(s => !showOnlyAvailable || (s.status === 'available' && s.batteryPercent > 10));
  $: list = (() => {
    const selId = get(selectedScooterId);
    if (!selId) return filtered;
    if (filtered.some(s => s.id === selId)) return filtered;
    const sel = $scooters.find(s => s.id === selId);
    return sel ? [...filtered, sel] : filtered;
  })();

  function selectFirstIfNone() {
    if (!get(selectedScooterId) && list.length) selectedScooterId.set(list[0].id);
  }
  $: selectFirstIfNone();
</script>

<label for="scooter">Scooter</label>
<select id="scooter" bind:value={$selectedScooterId}>
  {#each list as s}
    <option value={s.id}>
      {s.id} · {s.model} · {s.batteryPercent}%{s.status !== 'available' ? ` · ${s.status}` : ''}
    </option>
  {/each}
</select>

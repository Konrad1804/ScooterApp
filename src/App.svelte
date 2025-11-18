<script>
  import Index from './routes/index.svelte';
  import Customer from './routes/customer.svelte';
  import Employee from './routes/employee.svelte';

  import { onMount } from 'svelte';
  let route = (typeof window !== 'undefined' && window.location.hash) || '#/';

  function resolve() {
    const h = window.location.hash || '#/';
    if (h.startsWith('#/customer')) route = '#/customer';
    else if (h.startsWith('#/employee')) route = '#/employee';
    else route = '#/';
  }

  onMount(() => {
    resolve();
    window.addEventListener('hashchange', resolve);
  });
</script>

<header class="site-header">
  <div class="brand">
    <img src="/ScooTeq.png" alt="ScooTeq logo" />
    <div>
      <div class="title">ScooTeq GmbH</div>
      <div class="subtitle">Shared Scooters</div>
    </div>
  </div>

  <nav class="nav" aria-label="Hauptnavigation">
    <a href="#/">Home</a>
    <a href="#/customer">Kunde</a>
    <a href="#/employee">Mitarbeiter</a>
  </nav>
</header>

<main id="app" class="site-container">
  {#if route === '#/'}
    <Index />
  {:else if route === '#/customer'}
    <Customer />
  {:else if route === '#/employee'}
    <Employee />
  {/if}
</main>

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

{#if route === '#/'}
  <Index />
{:else if route === '#/customer'}
  <Customer />
{:else if route === '#/employee'}
  <Employee />
{/if}

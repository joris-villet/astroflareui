<script lang="ts">
  import ky from 'ky';
  import { Database } from '@lucide/svelte';
  import type { Data, Table } from '../interfaces';
  import { onMount } from 'svelte';

  let tables = $state<Table[]>([]);

  async function fetchTables() {
    try {
      const result = await ky.get('/api/read/tables').json<Data>();
      // console.log('result => ', result);
      if (result.success) {
        tables.push(...result.data);
      }
    } catch (err) {
      console.log('error => ', err);
    }
  }

  onMount(() => {
    fetchTables();
  });
</script>

{#if tables.length > 0}
  <ul>
    {#each tables as t}
      <li class="flex gap-1 py-2 group">
        <span class="group-hover:text-orange-500">
          <Database />
        </span>
        <a
          class="group-hover:text-neutral-600"
          href={`/dashboard/table/${t.table_name}`}
        >
          {t.table_name}
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <p>...chargement</p>
{/if}

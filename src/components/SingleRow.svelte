<!-- <script lang="ts">
  import ky from 'ky';
  import type { TableColumn, TableRow } from '../types';
  import type { Data } from '../interfaces';
  import { onMount } from 'svelte';

  interface Props {
    table: string;
    id: number | string;
  }
  let props: Props = $props();

  let columns = $state<any[]>([]);
  let rows = $state<any[]>([]);

  const fetchRow = async () => {
    try {
      const result = await ky
        .get(`/api/read/row/${props.table}-${props.id}`)
        .json<Data>();

      if (result.success) {
        rows.push(result.data[0]); // Garder l'objet directement
        columns.push(Object.keys(result.data[0]));
      }
    } catch (error) {
      console.log('error row => ', error);
    }
  };

  onMount(() => {
    fetchRow();
    $inspect('rows => ', rows);
  });
</script>

{#if rows.length}
  <div class="flex flex-col gap-2">
    {#each rows as row}
      {#each columns as column}
        <label for={column}>{column}</label>
        <input type="text" value={row[column]} />
      {/each}
    {/each}
  </div>
{/if}
 -->

<script lang="ts">
  import ky from 'ky';
  import type { TableColumn, TableRow } from '../types';
  import type { Data } from '../interfaces';
  import { onMount } from 'svelte';

  interface Props {
    table: string;
    id: number | string;
  }
  let props: Props = $props();

  let columns = $state<any[]>([]);
  let rows = $state<any[]>([]);

  const fetchRow = async () => {
    try {
      const result = await ky
        .get(`/api/read/row/${props.table}-${props.id}`)
        .json<Data>();

      if (result.success) {
        rows = result.data; // Directement les objets !
        columns = Object.keys(result.data[0]);
      }
    } catch (error) {
      console.log('error row => ', error);
    }
  };

  onMount(() => {
    fetchRow();
  });
</script>

{#if rows.length}
  <div class="flex flex-col gap-2">
    {#each rows as row}
      {#each columns as column}
        {#if column === 'id'}
          <div class="flex flex-crow gap-2">
            <p>{column}</p>
            <p>{row[column]}</p>
          </div>
        {:else}
          <div class="flex flex-col gap-2">
            <label for={column}>{column}</label>
            <input type="text" id={column} value={row[column]} />
          </div>
        {/if}
      {/each}
    {/each}
  </div>
{/if}

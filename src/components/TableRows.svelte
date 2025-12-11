<script lang="ts">
  import ky from 'ky';
  import type { TableRow, TableColumn } from '../types';

  let { table } = $props();

  let columns: TableColumn[] = $state([]);
  let rows: TableRow[] = $state([]);

  const fetchTableRows = async () => {
    try {
      // console.log('table => ', table);
      const response = await ky
        .get(`/api/read/${table}`)
        .json<{ success: boolean; data: TableRow[] }>();

      // console.log('response => ', response);

      if (response.success && response.data.length > 0) {
        rows = response.data;
        // 🔑 Récupère les colonnes depuis la 1re ligne
        columns = Object.keys(response.data[0]);
      } else {
        rows = [];
        // 🔁 Si pas de données, on demande la structure à la DB
        const schema = await ky
          .get(`/api/schema/${table}`)
          .json<{ columns: TableColumn[] }>();
        columns = schema.columns;
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Appel initial
  $effect(() => {
    fetchTableRows();
  });
</script>

{#if rows.length === 0}
  <p class="text-gray-500">Aucune donnée</p>
{:else}
  <table class="w-full">
    <thead>
      <tr>
        {#each columns as col}
          <th class="border p-2 text-left">{col}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row (row.id)}
        <tr class="group">
          {#each columns as col}
            <td class="p-2 group-hover:bg-amber-200 duration-400">
              <a class="block" href={`/dashboard/table/${table}/row/${row.id}`}>
                {row[col] == null ? '—' : String(row[col])}
              </a>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

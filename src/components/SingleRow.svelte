<!-- <script lang="ts">
  import ky from 'ky';
  import type { TableColumn, TableRow } from '../types';

  interface Props {
    table: string;
    id: number | string;
  }
  let props: Props = $props();

  let columns: TableColumn[] = $state([]);
  let rows: TableRow[] = $state([]);

  const fetchRow = async () => {
    try {
      // console.log('table => ', table);
      const response = await ky
        .get(`/api/read/row/${props.table}-${props.id}`)
        .json<{ success: boolean; data: TableRow[] }>();

      console.log('response => ', response);

      if (response.success && response.data) {
        rows = response.data;
        // 🔑 Récupère les colonnes depuis la 1re ligne
        columns = Object.keys(response.data[0]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Appel initial
  $effect(() => {
    fetchRow();
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
        <tr>
          {#each columns as col}
            <td class="p-2">
              {row[col] == null ? '—' : String(row[col])}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{/if} -->

<script lang="ts">
  import ky from 'ky';
  import type { TableColumn, TableRow } from '../types';

  interface Props {
    table: string;
    id: number | string;
  }
  let props: Props = $props();

  let columns: TableColumn[] = $state([]);
  let rows: TableRow[] = $state([]);

  const fetchRow = async () => {
    try {
      const response = await ky
        .get(`/api/read/row/${props.table}-${props.id}`)
        .json<{ success: boolean; data: TableRow[] }>();

      if (response.success && response.data.length > 0) {
        rows = response.data; // ← tableau avec 1 seul objet
        columns = Object.keys(response.data[0]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  $effect(() => {
    fetchRow();
  });
</script>

{#if rows.length === 0}
  <p class="text-gray-500">Aucune donnée</p>
{:else}
  <!-- ✅ On prend le PREMIER (et seul) item -->
  {#each [rows[0]] as row}
    <div class="max-w-3xl space-y-4 p-2">
      {#each columns as col}
        {#if col === 'id'}
          <div class="flex w-full">
            <div class="w-full">id</div>
            <div class="w-full">{row[col]}</div>
          </div>
        {:else}
          <label for={col}>{col}</label>
          <input
            type="text"
            value={row[col] ?? ''}
            oninput={(e) => (row[col] = (e.target as HTMLInputElement).value)}
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        {/if}
        <!-- <div class="flex items-start py-2 border-b border-gray-100">

          <div class="w-1/3 font-medium text-gray-700 pr-4 truncate">
            {col}
          </div>
          <div class="w-2/3">
            {#if col === 'id'}
              <span class="text-gray-500 font-mono">{row[col]}</span>
            {:else}
              <input
                type="text"
                value={row[col] ?? ''}
                oninput={(e) =>
                  (row[col] = (e.target as HTMLInputElement).value)}
                class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            {/if}
          </div>
        </div> -->
      {/each}
    </div>
  {/each}
{/if}

<!-- <label for={col}>{col}</label>
            <input
              type="text"
              value={row[col] ?? ''}
              oninput={(e) => (row[col] = (e.target as HTMLInputElement).value)}
              class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            /> -->

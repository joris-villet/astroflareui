<script lang="ts">
  import ky from 'ky';
  import type { Data } from '../interfaces';
  import { onMount } from 'svelte';
  // import EmptyTable from "./EmptyTable.svelte";

  let { table } = $props();
  let rows = $state<any[]>([]);

  const fetchRows = async () => {
    try {
      const result = await ky.get(`/api/read/table/${table}`).json<Data>();
      // console.log('result rows => ', result);

      if (result.success) {
        rows.push(...result.data);
      }
    } catch (error) {
      console.log('error rows => ', error);
    }
  };

  onMount(() => {
    fetchRows();
  });

  const columns = $derived.by(() => {
    if (rows.length === 0) return [];
    return Object.keys(rows[0]);
  });

  let columnWidths = $state<Record<string, string>>(
    Object.fromEntries(columns.map((col) => [col, 'auto']))
  );

  // État du resize en cours
  let resizingCol: string | null = $state(null);
  let startX = 0;
  let startWidth = 0;

  // Démarrer le resize
  function startResize(col: string, event: MouseEvent) {
    resizingCol = col;
    startX = event.clientX;
    const currentWidth = columnWidths[col];
    startWidth = currentWidth.endsWith('px') ? parseFloat(currentWidth) : 200; // fallback si 'auto'

    event.preventDefault();

    // Ajouter les listeners globaux
    window.addEventListener('mousemove', doResize);
    window.addEventListener('mouseup', stopResize);
  }

  // Pendant le déplacement
  function doResize(event: MouseEvent) {
    if (!resizingCol) return;
    const delta = event.clientX - startX;
    const newWidth = Math.max(50, startWidth + delta); // min 50px
    columnWidths[resizingCol] = `${newWidth}px`;
  }

  // Arrêter le resize
  function stopResize() {
    resizingCol = null;
    window.removeEventListener('mousemove', doResize);
    window.removeEventListener('mouseup', stopResize);
  }

  $effect(() => {
    if (Object.keys(columnWidths).length > 0) {
      localStorage.setItem(
        `table-${table}-widths`,
        JSON.stringify(columnWidths)
      );
    }
  });
</script>

{#if rows.length === 0}
  No Rows
{:else}
  <div class="overflow-auto">
    <table class="w-full table-fixed border-collapse">
      <colgroup>
        {#each columns as col}
          <col style="width: {columnWidths[col]};" />
        {/each}
      </colgroup>
      <thead class="select-none">
        <tr>
          {#each columns as col}
            <th class="border p-2 text-left relative group">
              {col}
              <!-- Grip de resize (à droite de chaque <th>, sauf la dernière)  -->
              {#if columns.indexOf(col) < columns.length - 1}
                <button
                  class="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-orange-400/30"
                  aria-label="Resize column"
                  onmousedown={(e) => startResize(col, e)}
                ></button>
              {/if}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row.id)}
          <tr
            class="group border-l-3 border-transparent hover:border-orange-500 duration-200"
          >
            {#each columns as col}
              <td class="group-hover:text-orange-500 truncate">
                <a
                  class="block py-2 pl-2"
                  href={`/dashboard/table/${table}/row/${row.id}`}
                >
                  {row[col] == null ? '—' : String(row[col])}
                </a>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

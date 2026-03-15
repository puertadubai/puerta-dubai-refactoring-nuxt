<script setup lang="ts">
import type { GoldenVisaTable } from '~/data/goldenVisaGuide'

defineProps<{
  table: GoldenVisaTable
}>()
</script>

<template>
  <div class="gv-table-wrap">
    <table class="gv-table">
      <thead>
        <tr>
          <th v-for="head in table.head" :key="head">{{ head }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in table.rows" :key="index">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex" :data-label="table.head[cellIndex]">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.gv-table-wrap {
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(18, 18, 18, 0.28);
}

.gv-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.gv-table th,
.gv-table td {
  padding: 15px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-align: left;
  vertical-align: top;
}

.gv-table th {
  color: #dcc6b8;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.gv-table td {
  color: rgba(247, 243, 238, 0.84);
  line-height: 1.55;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.gv-table tbody tr:last-child td {
  border-bottom: 0;
}

@media (max-width: 900px) {
  .gv-table {
    min-width: 0;
    table-layout: auto;
  }

  .gv-table thead {
    display: none;
  }

  .gv-table,
  .gv-table tbody,
  .gv-table tr,
  .gv-table td {
    display: block;
    width: 100%;
  }

  .gv-table tr {
    padding: 14px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .gv-table tbody tr:last-child {
    border-bottom: 0;
  }

  .gv-table td {
    padding: 8px 14px;
    border-bottom: 0;
  }

  .gv-table td::before {
    content: attr(data-label);
    display: block;
    margin-bottom: 6px;
    color: #dcc6b8;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
}
</style>

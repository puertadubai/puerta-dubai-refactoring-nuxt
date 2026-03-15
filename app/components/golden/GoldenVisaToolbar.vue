<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    canPrint?: boolean
  }>(),
  {
    canPrint: true
  }
)

const printGuide = () => {
  if (!props.canPrint) return
  if (!import.meta.client) return
  window.print()
}
</script>

<template>
  <div class="gv-toolbar">
    <div class="gv-toolbar-actions">
      <button type="button" class="gv-toolbar-btn" :disabled="!canPrint" @click="printGuide">
        Download PDF
      </button>
    </div>
  </div>
</template>

<style scoped>
.gv-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  padding: 8px 0 24px;
}

.gv-toolbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.gv-toolbar-btn {
  border: 1px solid rgba(220, 198, 184, 0.45);
  background: rgba(220, 198, 184, 0.06);
  color: #f7f3ee;
  padding: 11px 18px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.74rem;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.gv-toolbar-btn:disabled {
  opacity: 0.42;
  cursor: not-allowed;
}

.gv-toolbar-btn:hover {
  background: #dcc6b8;
  color: #302d2d;
  border-color: #dcc6b8;
}

@media (max-width: 720px) {
  .gv-toolbar {
    padding-top: 0;
  }

  .gv-toolbar-actions {
    width: auto;
    margin-left: auto;
  }
}
</style>

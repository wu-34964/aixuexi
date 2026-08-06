<template>
  <fieldset class="filter-group">
    <legend>{{ title }}</legend>
    <div class="chips">
      <label v-for="option in options" :key="option" class="chip" :class="{ selected: modelValue.includes(option) }">
        <input
          type="checkbox"
          :checked="modelValue.includes(option)"
          @change="toggle(option)"
        />
        <span>{{ option }}</span>
      </label>
    </div>
  </fieldset>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  options: { type: Array, required: true },
  modelValue: { type: Array, required: true }
})
const emit = defineEmits(['update:modelValue'])

const toggle = value => {
  const next = props.modelValue.includes(value)
    ? props.modelValue.filter(item => item !== value)
    : [...props.modelValue, value]
  emit('update:modelValue', next)
}
</script>

<style scoped>
.filter-group { margin: 0 0 14px; padding: 0; border: 0; }
.filter-group legend { margin-bottom: 8px; font-size: 14px; font-weight: 700; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { position: relative; padding: 7px 12px; border: 1px solid var(--vp-c-divider); border-radius: 999px; background: var(--vp-c-bg); color: var(--vp-c-text-2); font-size: 14px; cursor: pointer; user-select: none; }
.chip input { position: absolute; opacity: 0; pointer-events: none; }
.chip.selected { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); font-weight: 700; }
.chip:focus-within { outline: 3px solid color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent); outline-offset: 2px; }
</style>

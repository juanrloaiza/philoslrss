<script setup lang="ts">
const props = defineProps({
    isLoading: Boolean,
})
</script>

<template>
    <button 
      :class="{'hover:opacity-50 opacity-50': isLoading }"
      class="m-6 p-3 border-2 rounded border-slate-300 bg-white hover:bg-slate-100">
      {{ isLoading ? "Loading..." : "Load more"}}
    </button>

</template>
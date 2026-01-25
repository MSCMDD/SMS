<script setup lang="ts">
const { frontmatter } = defineProps(['frontmatter'])
console.log(frontmatter)
</script>

<template>
  <div class="md-context"><slot /></div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const props = defineProps<{
  title?: string
  likes?: number
  url?: string
  excerpt?: string
}>()
const OpenSearch = defineModel()
const router = useRouter()
const OnClick = () => {
  if (props.url) {
    router.push(props.url.replace('.html', ''))
  }
  OpenSearch.value = false
}
</script>

<template>
  <div class="search-cell" @click="OnClick">
    <h5 v-text="props.title" class="title" />
    <p v-html="excerpt"></p>
  </div>
</template>

<style lang="scss" scoped>
.search-cell {
  padding: 10px;
  border-block-start: 1px solid;
  transition: background-color 0.5s;
  .title {
    margin: 0;
  }
  p {
    font-size: 0.6em;
    margin: 0;
  }
  &:hover {
    background-color: aquamarine;
  }
}
</style>

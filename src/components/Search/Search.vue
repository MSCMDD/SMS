<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import type { Pagefind } from 'vite-plugin-pagefind/types'
import SearchCell from './SearchCell.vue'
const OpenSearch = defineModel()
const pagefind = ref<Pagefind | null>(null)
const searchValue = ref('')
const searchResults = ref<any[]>([])
const isLoading = ref(false)

onMounted(async () => {
  const getPageFindJs = Function(`return import("/pagefind/pagefind.js")`)
  pagefind.value = await getPageFindJs()
  if (pagefind.value) {
    pagefind.value.init()
  }
})

watch(
  searchValue,
  async (newVal) => {
    if (!pagefind.value || !newVal.trim()) {
      searchResults.value = []
      return
    }

    try {
      isLoading.value = true
      const search = await pagefind.value.debouncedSearch(newVal)

      if (search?.results?.length > 0) {
        const data = await Promise.all(search.results.map(async (r) => await r.data()))
        searchResults.value = data
      } else {
        searchResults.value = []
      }
    } catch (error) {
      console.error(' 搜索失败:', error)
      searchResults.value = []
    } finally {
      isLoading.value = false
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="search-container">
    <div id="search">
      <input class="search-input" v-model="searchValue" placeholder="输入搜索内容" />
      <p v-if="isLoading">搜索中...</p>
      <div class="search-list" v-else-if="searchResults.length">
        <search-cell
          v-for="(result, index) in searchResults"
          :key="index"
          :url="result.url"
          :title="result.meta.title"
          :excerpt="result.excerpt"
          v-model="OpenSearch"
        />
      </div>
      <p v-else>暂无搜索结果</p>
    </div>
  </div>
</template>
<style lang="scss">
.search-container {
  height: 100vh;
  box-sizing: border-box;
  padding: 20px;
  .search-input {
    border-radius: 2px;
    height: 2rem;
    width: 100%;
    box-sizing: border-box;
    background: none;
    transition: background 0.5s;
    &:focus {
      background: aliceblue;
    }
  }
  .search-list {
    height: calc(100% - 40px);
    overflow-y: auto;
    margin-top: 20px;
  }
}
</style>

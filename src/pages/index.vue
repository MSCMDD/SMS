<script lang="ts" setup>
import Card from '@/components/Card/Card.vue'
import Swiper from '@/components/Swiper/Swiper.vue'
import type { MdFile } from '@/composables/types/types'

const convertToRoute = (filePath: string) => {
  return `${filePath.replace('/src/pages', '').replace('.md', '')}`
}

const mdFiles: Record<string, MdFile> = import.meta.glob('/src/pages/**/blog/**/*.md', {
  eager: true,
})

// 筛选并转换为目标格式的函数
const getPinnedBlogs = (
  data: Record<string, MdFile>,
): Array<{ imgurl: string; title: string; url: string }> => {
  return (
    Object.entries(data)
      .filter(([_, blogItem]) => blogItem.pin === true && blogItem.cover)
      // 转换为目标结构
      .map(([filePath, blogItem]) => ({
        imgurl: blogItem.cover as string,
        title: blogItem.title,
        url: convertToRoute(filePath),
      }))
  )
}
console.log(mdFiles)
console.log(getPinnedBlogs(mdFiles))
</script>

<template>
  <div class="list">
    <Swiper :height="230" :data="getPinnedBlogs(mdFiles)" />
    <Card
      v-for="(mdFile, key) in mdFiles"
      :key="key"
      :title="mdFile.title"
      :cover="mdFile.cover"
      :url="convertToRoute(key)"
      :tags="mdFile.tags"
      :desc="mdFile.desc"
      :height="230"
    />
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>

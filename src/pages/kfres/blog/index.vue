<script lang="ts" setup>
import Card from '@/components/Card/Card.vue'
import Swiper from '@/components/Swiper/Swiper.vue'
const data = [
  {
    imgurl: '/kkk.png',
    title: 'awa',
    url: 'sss',
  },
  {
    imgurl: '/kkk.png',
    title: 'awa',
    url: 'sss',
  },
  {
    imgurl: '/kkk.png',
    title: 'awa',
    url: 'sss',
  },
]

const convertToRoute = (filePath: string) => {
  return `${filePath.replace('/src/pages', '').replace('.md', '')}`
}

const mdFiles = import.meta.glob('/src/pages/kfres/blog/**/*.md', { eager: true })
console.log(mdFiles)
</script>

<template>
  <div class="list">
    <Swiper :height="230" :data="data" />
    <Card
      v-for="(mdFile, key) in mdFiles"
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

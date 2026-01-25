<script setup lang="ts">
import { useRouter } from 'vue-router'
const props = defineProps<{
  cover?: string
  title?: string
  desc?: string
  url?: string
  tags?: string[]
  height: number
}>()
const route = useRouter()
const push = (url: string | undefined) => {
  if (url) {
    route.push(url)
  }
}
</script>
<template>
  <div class="card" @click="push(url)">
    <img v-if="cover" class="imgbox" :src="cover" />
    <div class="detial">
      <p class="title" v-text="title"></p>
      <p class="desc" v-text="desc"></p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card {
  max-width: 600px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: v-bind("$props.height * 1.5 + 'px'");
  background: var(--bg-color);
  border: 0.5px var(--border-color) outset;
  border-radius: 3px;
  height: v-bind('height + "px"');
  // @media响应式查询适配不同屏幕
  @media screen and (max-width: 720px) {
    min-width: 100%;
  }
  .imgbox {
    width: 100%;
    height: 70%;
    object-fit: cover;
  }
  .detial {
    display: flex;
    padding: 5px;
    flex-direction: column;
    .title {
      font-size: 1.2rem;
      font-weight: bolder;
      margin-block-start: 0em;
      margin-block-end: 0em;
    }
    .desc {
      font-size: 0.8rem;
      margin-block-start: 0em;
      margin-block-end: 0em;
    }
  }
}
</style>

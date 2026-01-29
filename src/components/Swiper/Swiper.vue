<script lang="ts" setup>
const props = defineProps<{
  data: { imgurl: string; title?: string; url?: string }[]
  height: number
}>()
import SwiperItem from './SwiperItem.vue'
import { ref } from 'vue'
const page = ref(0)
const y_pointc = () => {
  if (page.value < props.data.length - 1) {
    page.value += 1
  } else {
    page.value = 0
  }
}
</script>
<template>
  <div class="swiper-box" @click="y_pointc">
    <div class="swiper">
      <SwiperItem
        :key="info.imgurl"
        v-for="info in props.data"
        :imgurl="info.imgurl"
        :title="info.title"
        :url="info.url"
        :height="props.height"
      />
    </div>
    <div class="swiper-dots">
      <span
        :key="item"
        @click.stop="y_pointc"
        @click="page = index"
        v-for="(item, index) in props.data.length"
        class="swiper-dot"
        :class="{ active: page == index }"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.swiper-box {
  position: relative;
  flex: 1;
  height: v-bind("$props.height + 'px'");
  // width: 60%;
  min-width: v-bind("$props.height * 1.5 + 'px'");
  max-width: 600px;
  border: 0.5px var(--border-color) outset;
  border-radius: 3px;
  overflow: hidden;
  @media screen and (max-width: 720px) {
    min-width: 100%;
  }
  .swiper {
    position: relative;
    transform: translateY(v-bind("page * $props.height * -1 + 'px'"));
    transition: transform 0.3s;
    width: 100%;
  }
  .swiper-dots {
    width: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-block: 10px;
    .swiper-dot {
      border-radius: 3px;
      margin-block: 5px;
      width: 4px;
      background-color: var(--border-color);
      flex-grow: 1;
      transition: flex-grow 0.3s;
      &.active {
        background-color: greenyellow;
        flex-grow: 2;
      }
    }
  }
}
</style>

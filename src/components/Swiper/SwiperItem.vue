<script lang="ts" setup>
const props = defineProps<{
  imgurl: string
  title?: string
  url?: string
  height: number
}>()
</script>
<template>
  <div class="swiper-container">
    <div class="swiper-item">
      <img :src="props.imgurl" />
    </div>
    <div class="swiper-info">
      <div class="text-blend">
        <h3>{{ props.title }}</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper-container {
  position: relative;
}

.swiper-item {
  height: v-bind('height + "px"');
  width: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.swiper-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;

  .text-blend {
    mix-blend-mode: difference;
    color: white;

    h3 {
      margin: 0;
      font-weight: 700;
      font-size: 1.8rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>

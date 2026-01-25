<script lang="ts" setup>
import packageinfo from '@/../package.json'
</script>
<template>
  <div class="about">
    <p class="title">USTL社团开放内容平台</p>
    <p class="ver" v-text="packageinfo.version"></p>
  </div>
</template>

<style lang="scss" scoped>
.about {
  display: flex;
  width: 100%;
  background: var(--bg-color);
  border: 0.5px var(--border-color) outset;
  border-radius: 3px;
  flex-direction: column;
  align-items: center;
  .title {
    margin-block-end: 0em;
    font-size: 1.3rem;
  }
  .ver {
    margin-block-start: 0.5em;
  }
}
</style>

<script setup lang="ts">
import Layout from './layouts/Layout.vue'
</script>

<template>
  <Layout>
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <div :key="route.path" class="context">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </Layout>
</template>

<style scoped lang="sass">
.context
  // 添加必要的布局属性
  height: 100%
  width: 100%
  padding: 1rem;

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.2s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>

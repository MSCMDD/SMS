<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Logo from '@/assets/img/logo.png'
import ClubsData from '@/database/Clubs.yaml'
import type { ClubsType, ClubType } from '@/composables/types/types'
const route = useRoute()
const Clubs: ClubsType = ClubsData
const ClubInfo = computed(() => {
  const NavType = route.path.split('/')[1] || 'index' // 处理空路径
  return Clubs[NavType] as ClubType
})
const isActive = ref<boolean>(false)
</script>

<template>
  <div class="r_nav" :class="{ active: isActive }">
    <transition name="fade" mode="out-in">
      <div class="nav_body" :key="ClubInfo.name">
        <div
          @click="$router.push('/' + route.path.split('/')[1])"
          :key="ClubInfo.name"
          class="header"
        >
          <img class="logo" :src="Logo" />
          <div class="block">
            <a class="title">{{ ClubInfo.name }}</a>
            <a class="detial">{{ ClubInfo.navdetail }}</a>
          </div>
        </div>
        <div class="r_nav-menu">
          <button
            v-for="info in ClubInfo.navs"
            class="r_nav-menu-btn"
            @click="$router.push(info.to)"
            :key="info.value"
          >
            {{ info.value }}
          </button>
        </div>
      </div>
    </transition>
  </div>

  <a @click="isActive = !isActive" class="nav-btn"
    ><v-icon name="md-menu" scale="1.5" fill="black"
  /></a>
</template>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.r_nav {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  flex-direction: column;
  width: 280px;
  height: 100vh;
  background: rgba(214, 208, 208, 0.4);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  transition: all 0.5s;
  z-index: 200;
  // @media响应式查询适配不同屏幕
  @media screen and (max-width: 720px) {
    right: -280px;
    @media screen and (max-width: 360px) {
      width: calc(100vw - 45px);
      @media screen and (max-width: 240px) {
        width: 100vw;
      }
    }
  }
  &.active {
    right: 0;
  }
  .header {
    display: flex;
    align-items: center;
    margin: 20px;
    .logo {
      height: 60px;
      width: 60px;
      border-radius: 50px;
      margin-right: 10px;
    }
    .block {
      display: flex;
      flex-direction: column;
      .title {
        font-size: 2rem;
        font-weight: 900;
        line-height: 1.2;
      }
      .detial {
        line-height: 1.2;
      }
    }
  }
  .r_nav-menu {
    display: flex;
    justify-content: center;
    background-color: var(--bg-color);
    margin: 10px;
    border-radius: 5px;
    border-color: var(--border-color);
    &-btn {
      flex-grow: 1;
      margin: 2px;
    }
  }
}
.nav-btn {
  position: fixed;
  z-index: 200;
  right: 2rem;
  bottom: 2rem;
  background: rgba(214, 208, 208, 0.4);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  display: grid;
  place-items: center; /* 水平和垂直居中 */
  border-radius: 2px;
  padding: 10px;
  text-decoration: none;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c6daef;
  }
  // @media媒体查询实现小屏幕显示菜单切换按钮
  @media screen and (min-width: 720px) {
    display: none;
  }
}
</style>

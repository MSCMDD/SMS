<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import KFLogo from '@/assets/img/kfres.png'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Divider from '../Divider/Divider.vue'
import Search from '../Search/Search.vue'
const route = useRoute()
const NavType = computed(() => {
  const NavType = route.path.split('/')[1] || 'index' // 处理空路径
  return NavType
})

const DarkMode = ref({
  mode: 0, // 0 跟随系统; 1 Light; 2 Dark
  icon: 'md-computer',
})

onMounted(() => {
  watchEffect(() => {
    if (DarkMode.value.mode == 1) {
      document.body.setAttribute('data-theme', 'false')
      DarkMode.value.icon = 'md-wbsunny-outlined'
    } else if (DarkMode.value.mode == 2) {
      document.body.setAttribute('data-theme', 'true')
      DarkMode.value.icon = 'md-tsunami-outlined'
    } else {
      if (DarkMode.value.mode > 2) {
        DarkMode.value.mode = 0
        DarkMode.value.icon = 'md-computer'
      }
      document.body.removeAttribute('data-theme')
    }
  })
})

const search = ref(false)
</script>

<template>
  <div class="l_nav">
    <div class="l_nav-block">
      <button class="l_btn" :class="{ active: NavType == 'index' }" @click="$router.push('/')">
        <v-icon name="md-gridview" scale="1.5" fill="black" />
      </button>
      <button
        class="l_btn"
        :class="{ active: NavType == 'kfres' }"
        @click="$router.push('/kfres/')"
      >
        <img class="logo" :src="KFLogo" />
      </button>
      <button
        class="l_btn"
        :class="{ active: NavType == 'resource' }"
        @click="$router.push('/resource/')"
      >
        <v-icon name="md-book" scale="1.5" fill="black" />
      </button>
      <Divider />
      <button class="l_btn" :class="{ active: search == true }" @click="search = !search">
        <v-icon name="md-managesearch-twotone" scale="1.5" fill="black" />
      </button>
    </div>
    <div class="l_nav-block">
      <Divider />
      <button
        class="l_btn"
        :class="{ active: NavType == 'setting' }"
        @click="$router.push('/setting/')"
      >
        <v-icon name="md-settings-outlined" scale="1.5" />
      </button>
      <button class="l_btn" @click="DarkMode.mode += 1">
        <v-icon :name="DarkMode.icon" scale="1.5" />
      </button>
    </div>
  </div>
  <div class="l_nav-search" :class="{ active: search == true }">
    <Search v-model="search" />
  </div>
</template>

<style lang="scss">
.l_nav {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 45px;
  height: 100vh;
  background-color: var(--nav-bg-color);
  transition: all 0.5s;
  z-index: 200;
  // @media响应式查询适配不同屏幕
  @media screen and (max-width: 240px) {
    left: -45px;
  }
  .l_nav-block {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    .l_btn {
      padding-block: 10px;
      width: 100%;
      border-width: 0;
      transition: background-color 0.5s;
      background-color: var(--nav-bg-color);
      &:hover {
        background-color: antiquewhite;
      }
      &.active {
        background-color: aliceblue;
      }
      .logo {
        height: 28px;
      }
    }
  }
}
.l_nav-search {
  position: fixed;
  height: 100vh;
  width: 240px;

  z-index: 190;
  background: rgba(214, 208, 208, 0.4);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  transition: left 0.2s;
  left: -195px;
  &.active {
    left: 45px;
  }
}
</style>

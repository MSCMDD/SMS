<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GlobalClickListener } from '@/composables/click'
import KFLogo from '@/assets/img/kfres.png'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Divider from '../Divider/Divider.vue'
import Search from '../Search/Search.vue'
import { useThemeStore } from '@/stores/Theme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const { settheme } = themeStore

const route = useRoute()
const NavType = computed(() => {
  const NavType = route.path.split('/')[1] || 'index' // 处理空路径
  return NavType
})

const search = ref(false)
onMounted(() => {
  const listener = GlobalClickListener.getInstance()
  listener.register((event) => {
    const target = event.target as HTMLElement
    if (
      search.value == true &&
      !target.closest('.l_nav-search') &&
      !target.closest('.l_btn[class*="active"]') &&
      !target.closest('.tooltip-content')
    ) {
      search.value = false
    }
  })
})
</script>

<template>
  <div class="l_nav">
    <div class="l_nav-block">
      <Tooltip position="right">
        <template #trigger>
          <button class="l_btn" :class="{ active: NavType == 'index' }" @click="$router.push('/')">
            <v-icon name="md-gridview" scale="1.5" fill="black" />
          </button>
        </template>
        <template #content>主页</template>
      </Tooltip>
      <Tooltip position="right">
        <template #trigger>
          <button
            class="l_btn"
            :class="{ active: NavType == 'kfres' }"
            @click="$router.push('/kfres/')"
          >
            <img class="logo" :src="KFLogo" />
          </button>
        </template>
        <template #content>空飞研究社</template>
      </Tooltip>
      <Tooltip position="right">
        <template #trigger>
          <button
            class="l_btn"
            :class="{ active: NavType == 'resource' }"
            @click="$router.push('/resource/')"
          >
            <v-icon name="md-book" scale="1.5" fill="black" />
          </button>
        </template>
        <template #content>资源区</template>
      </Tooltip>
      <Divider />

      <Tooltip position="right">
        <template #trigger>
          <button class="l_btn" :class="{ active: search == true }" @click="search = !search">
            <v-icon name="md-managesearch-twotone" scale="1.5" fill="black" />
          </button>
        </template>
        <template #content>搜索</template>
      </Tooltip>
    </div>
    <div class="l_nav-block">
      <Divider />
      <Tooltip position="right">
        <template #trigger>
          <button
            class="l_btn"
            :class="{ active: NavType == 'setting' }"
            @click="$router.push('/setting/')"
          >
            <v-icon name="md-settings-outlined" scale="1.5" />
          </button>
        </template>
        <template #content>设置</template>
      </Tooltip>
      <Tooltip position="right">
        <template #trigger>
          <button class="l_btn" @click="settheme()">
            <v-icon :name="theme.icon" scale="1.5" />
          </button>
        </template>
        <template #content>切换主题</template>
      </Tooltip>
    </div>
  </div>
  <div class="l_nav-search" :class="{ active: search == true }" @click.stop="">
    <Search v-model="search" />
  </div>
</template>

<style lang="scss">
@use '/src/assets/css/variables.scss' as vars;
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
  transition: all 0.5s;
  border-right: 1px solid var(--border-color);
  background-color: var(--bg-color);
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
      width: 45px;
      position: relative;
      height: 45px;
      border-width: 0;
      background-color: transparent;
      transition: 0.5s background-color;
      &:hover {
        background-color: #{vars.$hover-primary};
      }
      &.active {
        background-color: #{vars.$active-primary};
      }

      svg {
        fill: var(--text-color);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .logo {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  transition: left 0.2s;
  left: -195px;
  @media screen and (max-width: 240px) {
    left: -235px;
  }
  &.active {
    left: 45px;
  }
}
</style>

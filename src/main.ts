// main.ts
import { ViteSSG } from 'vite-ssg' // 替换 Vue 的 createApp
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createHead } from '@unhead/vue/client'
import routes from 'virtual:generated-pages'
import './assets/css/index.scss'
import MD_Context from '@/components/Markdown/Context.vue'
// 图标库
import {
  MdGridview,
  MdMenu,
  MdBook,
  MdAirplaneticketOutlined,
  MdWbsunnyOutlined,
  MdSettingsOutlined,
  MdTsunamiOutlined,
  MdComputer,
  MdManagesearchTwotone,
} from 'oh-vue-icons/icons'
import { OhVueIcon, addIcons } from 'oh-vue-icons'

import App from './App.vue'

// SSG 入口函数
export const createApp = ViteSSG(
  App,
  {
    routes, // 传入路由配置
    base: import.meta.env.BASE_URL,
  },
  ({ app, router, initialState }) => {
    // ===== 1. 状态管理 =====
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    app.use(pinia)

    // 初始化 Pinia 状态 (SSR 兼容)
    if (import.meta.env.SSR) {
      initialState.pinia = pinia.state.value
    } else {
      pinia.state.value = initialState.pinia || {}
    }

    // ===== 2. Head 管理 =====
    const head = createHead()
    app.use(head)

    // ===== 3. 图标注册 =====
    addIcons(
      MdGridview,
      MdBook,
      MdMenu,
      MdAirplaneticketOutlined,
      MdWbsunnyOutlined,
      MdSettingsOutlined,
      MdTsunamiOutlined,
      MdComputer,
      MdManagesearchTwotone,
    )
    app.component('v-icon', OhVueIcon)
    app.component('MD_Context', MD_Context)
    // ===== 4. 路由守卫 =====
    router.beforeEach((to, from, next) => {
      // 可添加全局路由逻辑
      next()
    })
  },
)

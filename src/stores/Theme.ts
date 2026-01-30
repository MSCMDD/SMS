import { reactive, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = reactive({
      mode: 0, // 0 跟随系统; 1 Light; 2 Dark
      icon: 'md-computer',
    })
    function settheme() {
      theme.mode++
      if (theme.mode == 1) {
        theme.icon = 'md-wbsunny-outlined'
        document.body.setAttribute('data-theme', 'false')
      } else if (theme.mode == 2) {
        theme.icon = 'md-tsunami-outlined'
        document.body.setAttribute('data-theme', 'true')
      } else {
        if (theme.mode > 2) {
          theme.icon = 'md-computer'
          theme.mode = 0
        }
        document.body.removeAttribute('data-theme')
      }
    }
    function init() {
      if (theme.mode == 0) {
        theme.icon = 'md-computer'
        document.body.removeAttribute('data-theme')
      } else if (theme.mode == 1) {
        theme.icon = 'md-wbsunny-outlined'
        document.body.setAttribute('data-theme', 'false')
      } else if (theme.mode == 2) {
        theme.icon = 'md-tsunami-outlined'
        document.body.setAttribute('data-theme', 'true')
      }
    }
    onMounted(() => {
      init()
    })
    return { theme, settheme }
  },
  {
    persist: true,
  },
)

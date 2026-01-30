<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

type TooltipProps = {
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  isClickTrigger?: boolean
  showArrow?: boolean
}

const props = withDefaults(defineProps<TooltipProps>(), {
  position: 'top',
  delay: 300,
  isClickTrigger: false,
  showArrow: true,
})

const isVisible = ref(false)
const tooltipRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
let timer: number | null = null

const clearTimer = () => timer && clearTimeout(timer)

const showTooltip = () => {
  clearTimer()
  timer = window.setTimeout(() => {
    isVisible.value = true
    adjustPosition()
  }, props.delay)
}

const hideTooltip = () => {
  clearTimer()
  timer = window.setTimeout(() => (isVisible.value = false), props.delay)
}

const toggleTooltip = () => {
  isVisible.value = !isVisible.value
  isVisible.value && adjustPosition()
}

const adjustPosition = () => {
  if (!tooltipRef.value || !wrapperRef.value) return

  const { bottom, top } = tooltipRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const tooltipEl = tooltipRef.value

  if (bottom > viewportHeight && props.position === 'bottom') {
    tooltipEl.classList.replace(`tooltip--bottom`, `tooltip--top`)
  } else if (top < 0 && props.position === 'top') {
    tooltipEl.classList.replace(`tooltip--top`, `tooltip--bottom`)
  }
}

const handleResize = () => isVisible.value && adjustPosition()

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  clearTimer()
})
</script>

<template>
  <div class="tooltip-wrapper" ref="wrapperRef">
    <!-- 触发器元素 -->
    <span
      class="tooltip-trigger"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      @focus="showTooltip"
      @blur="hideTooltip"
      @click="isClickTrigger ? toggleTooltip : null"
    >
      <slot name="trigger"></slot>
    </span>

    <!-- 提示框内容 -->
    <transition name="tooltip-fade">
      <div
        v-if="isVisible"
        ref="tooltipRef"
        :class="['tooltip-content', `tooltip-${position}`]"
        role="tooltip"
        :aria-hidden="!isVisible"
      >
        <slot name="content"></slot>
        <span v-if="showArrow" class="tooltip-arrow"></span>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip-trigger {
  cursor: help;
}

.tooltip-content {
  position: absolute;
  max-width: 240px;
  padding: 8px 12px;
  border-radius: 2px;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1.4;
  z-index: 1000;
  transition: all 0.2s ease;
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
}

/* 位置样式 */
.tooltip-top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.tooltip-bottom {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.tooltip-left {
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

.tooltip-right {
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

/* 箭头样式 */
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.tooltip-top .tooltip-arrow {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px 6px 0 6px;
  border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
}

.tooltip-bottom .tooltip-arrow {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 6px 6px 6px;
  border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
}

.tooltip-left .tooltip-arrow {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px 0 6px 6px;
  border-color: transparent transparent transparent rgba(0, 0, 0, 0.8);
}

.tooltip-right .tooltip-arrow {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px 6px 6px 0;
  border-color: transparent rgba(0, 0, 0, 0.8) transparent transparent;
}

/* 过渡动画 */
.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
</style>

<template>
  <LNav />
  <main>
    <slot />
    <Footer />
  </main>
  <RNav />
</template>

<style lang="scss" scoped>
main {
  display: flex;
  position: absolute;
  top: 0;
  left: 45px;
  right: 280px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  transition: all 0.5s;
  z-index: 100;
  // @media响应式查询适配不同屏幕
  @media screen and (max-width: 720px) {
    right: 0;
    @media screen and (max-width: 360px) {
      margin: 0;
      @media screen and (max-width: 240px) {
        left: 0;
      }
    }
  }
}
</style>

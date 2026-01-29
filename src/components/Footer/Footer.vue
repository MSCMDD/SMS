<script setup lang="ts"></script>

<template>
  <div class="footer">
    <div class="footer-content">
      <p>Footer Content</p>
    </div>
    <div class="footer-bottom">
      <p>Footer Bottom Content</p>
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  width: 100%;
  padding: 2rem;
  // background: #f5f5f5;
  background: var(--footer-bg-color);
  border-top: 1px solid var(--border-color);
  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }
}
</style>

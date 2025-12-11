<script setup lang="ts">
import loading from '@/assets/svg/loading.svg'
</script>

<template>
  <div :class="$style.container">
    <img :src="loading" :class="$style.box" />
  </div>
</template>

<style module lang="scss">
.container {
  width: 128px;
  height: 128px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
}

.container .box {
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

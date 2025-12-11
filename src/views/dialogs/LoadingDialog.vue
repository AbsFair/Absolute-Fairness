<script setup lang="ts">
import { VueSpinnerClock } from 'vue3-spinners'
</script>

<template>
  <div :class="$style.container">
    <VueSpinnerClock size="64px" color="rgb(0, 0, 0)" />
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
  background-color: rgb(255, 255, 255);
}
</style>

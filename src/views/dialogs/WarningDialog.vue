<script setup lang="ts">
import { globalStates, messageInWarningDialog } from '@/state'
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.message">{{ messageInWarningDialog }}</div>
    <div :class="$style.buttons">
      <div :class="$style.ok" @click="globalStates.callbackForWarningDialog()">OK</div>
    </div>
  </div>
</template>

<style module lang="scss">
$padding: 24px;

.container {
  width: calc(100% - 2 * $padding);
  display: flex;
  padding: $padding;
  min-width: 256px;
  max-width: 512px;
  box-sizing: border-box;
  align-items: start;
  flex-shrink: 0;
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(255, 255, 255);
}

.message {
  color: rgb(0, 0, 0);
  font-size: 15px;
  line-height: 1.5;
  font-family: 'MyConsolas';
  margin-top: 0px;
  margin-bottom: $padding;
}

.buttons {
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: end;
}

.ok {
  color: rgb(255, 255, 255);
  height: 100%;
  cursor: pointer;
  z-index: 3;
  display: flex;
  font-size: 15px;
  box-sizing: border-box;
  font-weight: 500;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 32px;
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(0, 0, 0);
}
</style>

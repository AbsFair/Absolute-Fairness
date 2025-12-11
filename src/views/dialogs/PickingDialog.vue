<script setup lang="ts">
import phantom from '@/assets/svg/phantom.svg'
import backpack from '@/assets/svg/backpack.svg'
import { select, cancel } from '@/functions/dialogs/PickingDialog'
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.title">Connect Web3 Wallet</div>
    <div :class="$style.wallet" @click="select('Phantom')">
      <div :class="$style.name">Phantom</div>
      <img :src="phantom" :class="$style.icon" />
    </div>
    <div :class="$style.wallet" @click="select('Backpack')">
      <div :class="$style.name">Backpack</div>
      <img :src="backpack" :class="$style.icon" />
    </div>
    <div :class="$style.space"></div>
    <div :class="$style.buttons">
      <div :class="$style.cancel" @click="cancel()">Cancel</div>
    </div>
  </div>
</template>

<style module lang="scss">
$color: rgb(255, 255, 255, 0.9);

.container {
  width: 264px;
  height: 288px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  flex-direction: column;
  justify-content: start;
  background-color: rgb(255, 255, 255);
}

.title {
  width: 100%;
  height: 80px;
  color: rgb(0, 0, 0);
  display: flex;
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  font-family: 'MyConsolas';
  justify-content: center;
}

$height: 40px;
$padding: 24px;

.wallet {
  width: 100%;
  height: $height;
  display: flex;
  cursor: pointer;
  box-sizing: border-box;
  padding-left: $padding;
  padding-right: $padding;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.wallet:hover {
  background-color: rgb(0, 0, 0, 0.1);
}

.name {
  color: rgb(0, 0, 0);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: 'MyConsolas';
  font-weight: 500;
}

.icon {
  width: 20px;
  height: 20px;
}

.space {
  width: 100%;
  height: calc(100% - 80px - 2 * $height - 32px - $padding);
}

.buttons {
  width: 100%;
  height: 32px;
  display: flex;
  box-sizing: border-box;
  padding-left: $padding;
  padding-right: $padding;
  align-items: center;
  margin-bottom: $padding;
  flex-direction: row;
  justify-content: end;
}

.cancel {
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
  font-weight: 500;
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(0, 0, 0);
}
</style>

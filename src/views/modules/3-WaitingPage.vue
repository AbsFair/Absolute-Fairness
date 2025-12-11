<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  betAmountOfTheUser,
  launchUnixTimestamp,
  nameOfTheCurrentView,
  refresh_interval,
  viewNames,
} from '@/state'
import { refresh, tutorial, withdraw } from '@/functions/modules/3-WaitingPage'
import { timestampToFormattedHMS } from '@/box/L1/GetTimeDisplay'
import { refreshDAppStatusV2 } from '@/box/L5/RefreshDAppStatusV2'
import { refreshDAppStatusV3 } from '@/box/L5/RefreshDAppStatusV3'

const timestamp_display = ref('? min ? sec')

let interval: NodeJS.Timeout

onMounted(() => {
  //
  interval = setInterval(() => {
    const secs = Date.now() / 1000 - launchUnixTimestamp.value
    if (secs > 0) {
      timestamp_display.value = timestampToFormattedHMS(secs)
    }
  }, 1000)
  //
  refresh_interval.target = setInterval(() => {
    if (nameOfTheCurrentView.value == viewNames[3]) {
      refresh_interval.object = refreshDAppStatusV2(true)
    } else if (nameOfTheCurrentView.value == viewNames[4]) {
      refresh_interval.object = refreshDAppStatusV3(true)
    }
  }, refresh_interval.length)
})

onUnmounted(() => {
  clearInterval(interval)
  clearInterval(refresh_interval.target)
})
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <div :class="$style.title">Waiting Page</div>
      <div :class="$style.subtitle">The Amount You Bet</div>
      <div :class="$style.text_box">{{ betAmountOfTheUser }} SOL</div>
      <div :class="$style.subtitle">You Have Waited For</div>
      <div :class="$style.text_box">{{ timestamp_display }}</div>
      <div :class="$style.button_1" @click="refresh()">Refresh</div>
      <div :class="$style.button_2" @click="tutorial()">Tutorial</div>
      <div :class="$style.button_3" @click="withdraw()">Cancel and Refund</div>
    </div>
  </div>
</template>

<style module lang="scss">
$width: 320;
$padding: 32;

.container {
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

@media (max-height: 464px) {
  .container {
    overflow-y: auto;
    justify-content: start;
  }
}

.container .content {
  width: calc($width * 1px);
  margin: calc($padding * 1px) 0px calc($padding * 1px) 0px;
  z-index: 2;
  display: flex;
  padding: calc($padding * 1px);
  box-sizing: border-box;
  flex-shrink: 0;
  align-items: center;
  border-radius: 15px;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(0, 0, 0, 0.8);
}

.container .content .title {
  color: rgb(255, 255, 255);
  width: 100%;
  z-index: 3;
  display: flex;
  font-size: 25px;
  box-sizing: border-box;
  line-height: 1.6;
  font-weight: 600;
  font-family: 'MyConsolas';
  align-items: center;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
}

.container .content .subtitle {
  color: rgb(255, 255, 255);
  width: 100%;
  z-index: 3;
  display: flex;
  padding: 0px 2.5px 0px 2.5px;
  font-size: 15px;
  box-sizing: border-box;
  line-height: 1;
  font-weight: 500;
  font-family: 'MyConsolas';
  align-items: start;
  margin-bottom: 7.5px;
  flex-direction: row;
  justify-content: start;
}

.container .content .secs_box {
  color: rgb(255, 255, 255);
  width: 100%;
  border: 1px solid rgb(255, 255, 255);
  z-index: 3;
  display: flex;
  padding: 5px 10px 5px 10px;
  font-size: 15px;
  word-break: break-all;
  box-sizing: border-box;
  line-height: 1.6;
  font-weight: 500;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 5px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: start;
  background-color: rgb(255, 255, 255, 0);
}

.container .content .text_box {
  color: rgb(255, 255, 255);
  width: 100%;
  z-index: 3;
  display: flex;
  padding: 5px 10px 5px 10px;
  font-size: 15px;
  box-sizing: border-box;
  line-height: 1.6;
  font-weight: 500;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 5px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: start;
  background-color: rgb(255, 255, 255, 0.2);
}

.container .content .code_box {
  color: rgb(255, 255, 255);
  width: 100%;
  z-index: 3;
  display: flex;
  padding: 5px 10px 5px 10px;
  font-size: 15px;
  word-break: break-all;
  box-sizing: border-box;
  line-height: 1.6;
  font-weight: 500;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 5px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: start;
  background-color: rgb(255, 255, 255, 0.2);
}

.container .content .divider {
  width: calc(100% - 5px);
  height: 1px;
  margin: 0px 0px 15px 0px;
  border-radius: 1px;
  background-color: rgb(255, 255, 255, 0.2);
}

.container .content .button_1 {
  color: rgb(255, 255, 255);
  width: 100%;
  height: 35px;
  cursor: pointer;
  border: 1px solid rgb(255, 255, 255);
  z-index: 3;
  display: flex;
  font-size: 15px;
  box-sizing: border-box;
  margin-top: 7.5px;
  font-weight: 500;
  font-family: 'MyConsolas';
  align-items: center;
  margin-bottom: 10px;
  border-radius: 5px;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(255, 255, 255, 0);
}

.container .content .button_2 {
  color: rgb(0, 0, 0);
  width: 100%;
  height: 35px;
  cursor: pointer;
  z-index: 3;
  display: flex;
  font-size: 15px;
  box-sizing: border-box;
  font-weight: 500;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 5px;
  margin-bottom: 10px;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(255, 255, 255, 1);
}

.container .content .button_3 {
  color: rgb(255, 255, 255);
  width: 100%;
  height: 35px;
  cursor: pointer;
  z-index: 3;
  display: flex;
  font-size: 15px;
  box-sizing: border-box;
  font-weight: 500;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 5px;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(27, 103, 240, 1);
}
</style>

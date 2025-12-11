<script setup lang="ts">
import { computed } from 'vue'
import { refresh, tutorial, upgrade } from '@/functions/modules/2-ReferralProgram'
import { timestampToFormattedUTC } from '@/box/L1/GetTimeDisplay'
import {
  userReferralStatusC,
  userReferralRewardA,
  userReferralUpdateT,
  referralCodeOfTheUser,
} from '@/state'

const present_tier = computed(() => {
  if (userReferralStatusC.value == 0) {
    return 'Basic Member'
  } else if (userReferralStatusC.value == 1) {
    return 'Premier Member'
  } else {
    return 'Supreme Member'
  }
})

const total_reward = computed(() => {
  return userReferralRewardA.value / 1000000000
})

const update_time = computed(() => {
  return timestampToFormattedUTC(userReferralUpdateT.value)
})

const button_name = computed(() => {
  if (userReferralStatusC.value == 0) {
    return 'Upgrade to Premier'
  } else if (userReferralStatusC.value == 1) {
    return 'Upgrade to Supreme'
  } else {
    return 'Upgrade to Legends'
  }
})
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <div :class="$style.title">Referral Program</div>
      <div :class="$style.subtitle">Your Present Tier</div>
      <div :class="$style.text_box">{{ present_tier }}</div>
      <div :class="$style.spacer"></div>
      <div :class="$style.subtitle">Your Total Rewards</div>
      <div :class="$style.text_box">{{ total_reward }} SOL</div>
      <div :class="$style.caption">UTC of Update: {{ update_time }}</div>
      <div :class="$style.divider"></div>
      <div :class="$style.subtitle">Your Referral Code</div>
      <div :class="$style.code_box">{{ referralCodeOfTheUser }}</div>
      <div :class="$style.button_1" @click="refresh()">Refresh</div>
      <div :class="$style.button_2" @click="tutorial()">Tutorial</div>
      <div :class="$style.button_3" @click="upgrade()">{{ button_name }}</div>
    </div>
  </div>
</template>

<style module lang="scss">
$width: 320;
$padding: 32;
$background: rgb(255, 255, 255, 0.2);

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

@media (max-height: 598px) {
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

.container .content .divider {
  width: calc(100% - 5px);
  height: 1px;
  margin: 15px 0px 15px 0px;
  border-radius: 1px;
  background-color: $background;
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

.container .content .spacer {
  width: 100%;
  height: 15px;
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
  flex-direction: row;
  justify-content: start;
  background-color: $background;
}

.container .content .caption {
  color: rgb(255, 255, 255);
  width: 100%;
  z-index: 3;
  display: flex;
  padding: 0px 2.5px 0px 2.5px;
  font-size: 15px;
  box-sizing: border-box;
  margin-top: 7.5px;
  line-height: 1;
  font-weight: 500;
  font-family: 'MyConsolas';
  align-items: start;
  flex-direction: row;
  justify-content: start;
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
  background-color: $background;
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

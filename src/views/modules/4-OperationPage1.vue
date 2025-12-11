<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { refresh, operate, tutorial } from '@/functions/modules/4-OperationPage1.ts'
import {
  betAmountOfTheUser,
  betAmountOfTheOppo,
  hintForConfirmation,
  launchUnixTimestamp,
  opponentWeb3Address,
  refresh_interval,
  theMostRecentBid,
  theMostRecentLog,
  yourDiceRolls1,
  yourDiceRolls2,
  yourDiceRolls3,
  yourDiceRolls4,
  yourDiceRolls5,
  maxSecondsForClocks,
  operationButtonName,
} from '@/state'

import dice_0 from '@/assets/svg/dice-0.svg'
import dice_1 from '@/assets/svg/dice-1.svg'
import dice_2 from '@/assets/svg/dice-2.svg'
import dice_3 from '@/assets/svg/dice-3.svg'
import dice_4 from '@/assets/svg/dice-4.svg'
import dice_5 from '@/assets/svg/dice-5.svg'
import dice_6 from '@/assets/svg/dice-6.svg'
import { refreshDAppStatusV3 } from '@/box/L5/RefreshDAppStatusV3'

let interval: NodeJS.Timeout | undefined = undefined

const mins = ref('??')
const secs = ref('??')

onMounted(() => {
  //
  interval = setInterval(() => {
    const outs = maxSecondsForClocks.value - Date.now() / 1000 + launchUnixTimestamp.value
    if (outs > 0) {
      mins.value = Math.floor(outs / 60)
        .toString()
        .padStart(2, '0')
      secs.value = Math.floor(outs % 60)
        .toString()
        .padStart(2, '0')
    } else {
      mins.value = '00'
      secs.value = '00'
    }
  }, 1000)
  //
  refresh_interval.target = setInterval(() => {
    refresh_interval.object = refreshDAppStatusV3(true)
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
      <div :class="$style.title">Operation Page</div>
      <div :class="$style.hints">
        <div :class="$style.clock">
          <div :class="$style.part">
            <div :class="$style.time">{{ mins }}</div>
            <div :class="$style.unit">min</div>
          </div>
          <div :class="$style.part">
            <div :class="$style.time">{{ secs }}</div>
            <div :class="$style.unit">sec</div>
          </div>
        </div>
        <div :class="$style.texts_1" v-if="hintForConfirmation == 'Your Turn!'">
          {{ hintForConfirmation }}
        </div>
        <div :class="$style.texts_2" v-else-if="hintForConfirmation == 'Await Opp!'">
          {{ hintForConfirmation }}
        </div>
      </div>
      <div :class="$style.subtitle">Bets Pool (SOL)</div>
      <div :class="$style.text_box">
        You: {{ betAmountOfTheUser }} + Opp: {{ betAmountOfTheOppo }}
      </div>
      <div :class="$style.subtitle">Your Dice Rolls</div>
      <div :class="$style.dice_box">
        <img :src="dice_0" :class="$style.dice" v-if="yourDiceRolls1 == 0" />
        <img :src="dice_1" :class="$style.dice" v-else-if="yourDiceRolls1 == 1" />
        <img :src="dice_2" :class="$style.dice" v-else-if="yourDiceRolls1 == 2" />
        <img :src="dice_3" :class="$style.dice" v-else-if="yourDiceRolls1 == 3" />
        <img :src="dice_4" :class="$style.dice" v-else-if="yourDiceRolls1 == 4" />
        <img :src="dice_5" :class="$style.dice" v-else-if="yourDiceRolls1 == 5" />
        <img :src="dice_6" :class="$style.dice" v-else-if="yourDiceRolls1 == 6" />

        <img :src="dice_0" :class="$style.dice" v-if="yourDiceRolls2 == 0" />
        <img :src="dice_1" :class="$style.dice" v-else-if="yourDiceRolls2 == 1" />
        <img :src="dice_2" :class="$style.dice" v-else-if="yourDiceRolls2 == 2" />
        <img :src="dice_3" :class="$style.dice" v-else-if="yourDiceRolls2 == 3" />
        <img :src="dice_4" :class="$style.dice" v-else-if="yourDiceRolls2 == 4" />
        <img :src="dice_5" :class="$style.dice" v-else-if="yourDiceRolls2 == 5" />
        <img :src="dice_6" :class="$style.dice" v-else-if="yourDiceRolls2 == 6" />

        <img :src="dice_0" :class="$style.dice" v-if="yourDiceRolls3 == 0" />
        <img :src="dice_1" :class="$style.dice" v-else-if="yourDiceRolls3 == 1" />
        <img :src="dice_2" :class="$style.dice" v-else-if="yourDiceRolls3 == 2" />
        <img :src="dice_3" :class="$style.dice" v-else-if="yourDiceRolls3 == 3" />
        <img :src="dice_4" :class="$style.dice" v-else-if="yourDiceRolls3 == 4" />
        <img :src="dice_5" :class="$style.dice" v-else-if="yourDiceRolls3 == 5" />
        <img :src="dice_6" :class="$style.dice" v-else-if="yourDiceRolls3 == 6" />

        <img :src="dice_0" :class="$style.dice" v-if="yourDiceRolls4 == 0" />
        <img :src="dice_1" :class="$style.dice" v-else-if="yourDiceRolls4 == 1" />
        <img :src="dice_2" :class="$style.dice" v-else-if="yourDiceRolls4 == 2" />
        <img :src="dice_3" :class="$style.dice" v-else-if="yourDiceRolls4 == 3" />
        <img :src="dice_4" :class="$style.dice" v-else-if="yourDiceRolls4 == 4" />
        <img :src="dice_5" :class="$style.dice" v-else-if="yourDiceRolls4 == 5" />
        <img :src="dice_6" :class="$style.dice" v-else-if="yourDiceRolls4 == 6" />

        <img :src="dice_0" :class="$style.dice" v-if="yourDiceRolls5 == 0" />
        <img :src="dice_1" :class="$style.dice" v-else-if="yourDiceRolls5 == 1" />
        <img :src="dice_2" :class="$style.dice" v-else-if="yourDiceRolls5 == 2" />
        <img :src="dice_3" :class="$style.dice" v-else-if="yourDiceRolls5 == 3" />
        <img :src="dice_4" :class="$style.dice" v-else-if="yourDiceRolls5 == 4" />
        <img :src="dice_5" :class="$style.dice" v-else-if="yourDiceRolls5 == 5" />
        <img :src="dice_6" :class="$style.dice" v-else-if="yourDiceRolls5 == 6" />
      </div>
      <div :class="$style.subtitle">Most Recent Log</div>
      <div :class="$style.mark_box">{{ theMostRecentLog }}</div>
      <div :class="$style.subtitle">Most Recent Bid</div>
      <div :class="$style.mark_box">{{ theMostRecentBid }}</div>
      <div :class="$style.subtitle">Your Opponent's Address</div>
      <div :class="$style.code_box">{{ opponentWeb3Address }}</div>
      <div :class="$style.divider"></div>
      <div :class="$style.button_row">
        <div :class="$style.button_1" @click="refresh()">Refresh</div>
        <div :class="$style.button_1" @click="operate()">{{ operationButtonName }}</div>
      </div>
      <div :class="$style.button_3" @click="tutorial()">Tutorial</div>
    </div>
  </div>
</template>

<style module lang="scss">
////////////////////////////////////////////////////////////////////////////////

$width: 320;
$padding: 32;
$box_tint: rgb(255, 255, 255, 0.2);

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

@media (max-height: 776px) {
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

.container .content .divider {
  width: calc(100% - 5px);
  height: 1px;
  margin: 0px 0px 15px 0px;
  border-radius: 1px;
  background-color: $box_tint;
}

////////////////////////////////////////////////////////////////////////////////

$hint_space: 15px;
$hints_height: 60px;
$clock_part_w: 22.5px;
$clock_part_h: 35px;
$time_font_size: 20px;
$unit_font_size: 12.5px;

.container .content .hints {
  color: rgb(255, 255, 255);
  width: 100%;
  height: $hints_height;
  z-index: 3;
  display: flex;
  box-sizing: border-box;
  line-height: 1;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 5px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
}

.container .content .hints .clock {
  width: calc(2 * $clock_part_w + 2 * ($hints_height - $clock_part_h));
  height: 100%;
  border: 1px solid rgb(255, 255, 255);
  display: flex;
  box-sizing: border-box;
  align-items: center;
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-evenly;
}

.container .content .hints .clock .part {
  width: $clock_part_w;
  height: $clock_part_h;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.container .content .hints .clock .part .time {
  display: flex;
  font-size: $time_font_size;
  align-items: center;
  justify-content: center;
}

.container .content .hints .clock .part .unit {
  display: flex;
  font-size: $unit_font_size;
  align-items: center;
  justify-content: center;
}

.container .content .hints .texts_1 {
  color: rgb(255, 255, 255);
  width: calc(100% - $hint_space - 2 * $clock_part_w - 2 * ($hints_height - $clock_part_h));
  height: 100%;
  display: flex;
  font-size: 20px;
  font-weight: 500;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  background-color: rgba(208, 11, 87, 1);
}

.container .content .hints .texts_2 {
  color: rgb(255, 255, 255);
  width: calc(100% - $hint_space - 2 * $clock_part_w - 2 * ($hints_height - $clock_part_h));
  height: 100%;
  display: flex;
  font-size: 20px;
  font-weight: 500;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  background-color: rgba(87, 208, 11, 1);
}

////////////////////////////////////////////////////////////////////////////////

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

$dice_size: 38px;

.container .content .dice_box {
  width: 100%;
  z-index: 3;
  display: flex;
  box-sizing: border-box;
  font-family: 'MyConsolas';
  align-items: center;
  margin-bottom: 15px;
  border-radius: 5px;
  padding-top: calc((100% - 5 * $dice_size) / 6);
  padding-bottom: calc((100% - 5 * $dice_size) / 6);
  flex-direction: row;
  justify-content: space-evenly;
  background-color: $box_tint;
}

.container .content .dice_box .dice {
  width: $dice_size;
  height: $dice_size;
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
  margin-bottom: 15px;
  align-items: center;
  border-radius: 5px;
  flex-direction: row;
  justify-content: start;
  background-color: $box_tint;
}

.container .content .mark_box {
  color: rgb(255, 255, 255);
  width: 100%;
  border: 1px solid rgb(255, 255, 255);
  z-index: 3;
  display: flex;
  padding: 5px 10px 5px 10px;
  font-size: 15px;
  box-sizing: border-box;
  line-height: 1.6;
  font-weight: 500;
  font-family: 'MyConsolas';
  margin-bottom: 15px;
  align-items: center;
  border-radius: 5px;
  flex-direction: row;
  justify-content: start;
}

.container .content .code_box {
  color: rgb(255, 255, 255);
  width: 100%;
  z-index: 3;
  display: flex;
  padding: 6px 10px 6px 10px;
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
  background-color: $box_tint;
}

////////////////////////////////////////////////////////////////////////////////

.container .content .button_row {
  color: rgb(255, 255, 255);
  width: 100%;
  height: 35px;
  display: flex;
  font-size: 15px;
  font-family: 'MyConsolas';
  align-items: center;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
}

.container .content .button_1 {
  width: calc((100% - 15px) / 2);
  height: 100%;
  border: 1px solid rgb(255, 255, 255);
  cursor: pointer;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
}

.container .content .button_2 {
  width: calc((100% - 15px) / 2);
  height: 100%;
  cursor: pointer;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  background-color: rgba(11, 87, 208, 1);
}

.container .content .button_3 {
  color: rgb(0, 0, 0);
  width: 100%;
  height: 35px;
  cursor: pointer;
  display: flex;
  font-size: 15px;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 5px;
  flex-direction: row;
  justify-content: center;
  background-color: rgb(255, 255, 255);
}

////////////////////////////////////////////////////////////////////////////////
</style>

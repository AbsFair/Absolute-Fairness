<script setup lang="ts">
import { refreshDAppStatusV2 } from '@/box/L5/RefreshDAppStatusV2'
import { refresh, tutorial, confirm } from '@/functions/modules/4-ConfirmationPage'
import {
  launchUnixTimestamp,
  hintForConfirmation,
  opponentWeb3Address,
  betAmountOfTheUser,
  refresh_interval,
  luckyWordsForSimple,
  maxSecondsForClocks,
} from '@/state'
import { onMounted, onUnmounted, ref } from 'vue'

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
    refresh_interval.object = refreshDAppStatusV2(true)
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
      <div :class="$style.title">Confirmation Page</div>
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
      <div :class="$style.subtitle">The Amount You Bet</div>
      <div :class="$style.text_box">{{ betAmountOfTheUser }} SOL</div>
      <div :class="$style.subtitle">Re-Enter Lucky Words</div>
      <input
        :class="$style.input_box"
        v-model="luckyWordsForSimple"
        placeholder="At least 12 characters."
      />
      <div :class="$style.subtitle">Your Opponent's Address</div>
      <div :class="$style.code_box">{{ opponentWeb3Address }}</div>
      <div :class="$style.button_1" @click="refresh()">Refresh</div>
      <div :class="$style.button_2" @click="tutorial()">Tutorial</div>
      <div :class="$style.button_3" @click="confirm()">Confirm to Draw</div>
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

@media (max-height: 634px) {
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

.container .content .input_box {
  color: rgb(255, 255, 255);
  width: 100%;
  border: none;
  z-index: 3;
  display: flex;
  padding: 5px 10px 5px 10px;
  font-size: 15px;
  box-sizing: border-box;
  line-height: 1.6;
  font-weight: 500;
  font-family: 'MyConsolas';
  align-items: center;
  margin-bottom: 15px;
  border-radius: 5px;
  flex-direction: row;
  justify-content: start;
  background-color: rgb(255, 255, 255, 0.2);
}

.container .content .input_box:focus {
  outline: none;
}

.container .content .input_box::placeholder {
  color: rgb(255, 255, 255, 0.5);
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

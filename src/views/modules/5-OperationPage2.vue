<script setup lang="ts">
import { goBack, tutorial, challenge, makeABid } from '@/functions/modules/5-OperationPage2.ts'
import { launchUnixTimestamp, maxSecondsForClocks, onChainData } from '@/state'
import { onMounted, onUnmounted, ref } from 'vue'

import adding from '@/assets/svg/add.svg'
import reduct from '@/assets/svg/reduct.svg'

import dice_1 from '@/assets/svg/dice-1.svg'
import dice_2 from '@/assets/svg/dice-2.svg'
import dice_3 from '@/assets/svg/dice-3.svg'
import dice_4 from '@/assets/svg/dice-4.svg'
import dice_5 from '@/assets/svg/dice-5.svg'
import dice_6 from '@/assets/svg/dice-6.svg'
import { getDiceFace } from '@/box/L1/GetDiceFace'

const quantity = ref(1)
const diceFace = ref(1)

function computeDiceFace() {
  if (diceFace.value == 1) {
    return 5
  } else {
    return diceFace.value - 2
  }
}

function alterQuantity(x: number) {
  const new_value = quantity.value + x
  if (new_value > 10) {
    quantity.value = 10
  } else if (new_value < 1) {
    quantity.value = 1
  } else {
    quantity.value = new_value
  }
}

function alterDiceFace(x: number) {
  if (x == 1) {
    if (diceFace.value == 6) {
      diceFace.value = 1
    } else if (2 <= diceFace.value && diceFace.value <= 5) {
      diceFace.value += 1
    }
  } else if (x == -1) {
    if (diceFace.value == 1) {
      diceFace.value = 6
    } else if (3 <= diceFace.value && diceFace.value <= 6) {
      diceFace.value -= 1
    }
  }
}

let interval: NodeJS.Timeout | undefined = undefined

const mins = ref('00')
const secs = ref('00')

onMounted(() => {
  if (onChainData.bData != undefined) {
    if (onChainData.bData.g_degree[0] != 0) {
      quantity.value = onChainData.bData.g_degree[0]
    }
    diceFace.value = getDiceFace(onChainData.bData.g_degree[1])
  }
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
})

onUnmounted(() => {
  clearInterval(interval)
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
        <div :class="$style.texts">Your Turn!</div>
      </div>
      <div :class="$style.subtitle">Select Quantity</div>
      <div :class="$style.selection">
        <img :src="reduct" :class="$style.button" @click="alterQuantity(-1)" />
        <div :class="$style.display">{{ quantity }}</div>
        <img :src="adding" :class="$style.button" @click="alterQuantity(1)" />
      </div>
      <div :class="$style.subtitle">Select Dice Face</div>
      <div :class="$style.selection">
        <img :src="reduct" :class="$style.button" @click="alterDiceFace(-1)" />
        <img :src="dice_1" :class="$style.display" v-if="diceFace == 1" />
        <img :src="dice_2" :class="$style.display" v-else-if="diceFace == 2" />
        <img :src="dice_3" :class="$style.display" v-else-if="diceFace == 3" />
        <img :src="dice_4" :class="$style.display" v-else-if="diceFace == 4" />
        <img :src="dice_5" :class="$style.display" v-else-if="diceFace == 5" />
        <img :src="dice_6" :class="$style.display" v-else-if="diceFace == 6" />
        <img :src="adding" :class="$style.button" @click="alterDiceFace(1)" />
      </div>
      <div :class="$style.button_1" @click="goBack()">Go Back</div>
      <div :class="$style.button_2" @click="tutorial()">Tutorial</div>
      <div :class="$style.button_3" @click="challenge()">Challenge</div>
      <div :class="$style.button_4" @click="makeABid(quantity, computeDiceFace())">Make a Bid</div>
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

@media (max-height: 636px) {
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

.container .content .hints .texts {
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
  background-color: $box_tint;
}

.container .content .selection {
  width: 100%;
  height: 60px;
  z-index: 3;
  display: flex;
  box-sizing: border-box;
  font-family: 'MyConsolas';
  align-items: center;
  margin-bottom: 15px;
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: $box_tint;
}

.container .content .selection .button {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.container .content .selection .display {
  color: rgb(255, 255, 255);
  width: 30px;
  height: 30px;
  display: flex;
  font-size: 30px;
  line-height: 1;
  align-items: center;
  font-family: 'MyConsolas';
  justify-content: center;
}

////////////////////////////////////////////////////////////////////////////////

.container .content .button_1 {
  color: rgb(255, 255, 255);
  width: 100%;
  height: 35px;
  border: 1px solid rgb(255, 255, 255);
  cursor: pointer;
  display: flex;
  font-size: 15px;
  margin-top: 7.5px;
  box-sizing: border-box;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 5px;
  margin-bottom: 10px;
  justify-content: center;
}

.container .content .button_2 {
  color: rgb(0, 0, 0);
  width: 100%;
  height: 35px;
  cursor: pointer;
  display: flex;
  font-size: 15px;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 5px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: center;
  background-color: rgb(255, 255, 255);
}

.container .content .button_3 {
  color: rgb(255, 255, 255);
  width: 100%;
  height: 35px;
  border: 1px solid rgb(255, 255, 255);
  cursor: pointer;
  display: flex;
  font-size: 15px;
  box-sizing: border-box;
  font-family: 'MyConsolas';
  align-items: center;
  margin-bottom: 10px;
  border-radius: 5px;
  justify-content: center;
  // background-color: rgba(208, 11, 87, 1);
}

.container .content .button_4 {
  color: rgb(255, 255, 255);
  width: 100%;
  height: 35px;
  // border: 1px solid rgb(255, 255, 255);
  cursor: pointer;
  display: flex;
  font-size: 15px;
  box-sizing: border-box;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  background-color: rgba(27, 103, 240, 1);
}

////////////////////////////////////////////////////////////////////////////////
</style>

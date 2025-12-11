<script setup lang="ts">
import { ref, computed } from 'vue'
import { refresh, tutorial, nextStep } from '@/functions/modules/2-PreGameSetup'
import {
  selectedAmountForBattle,
  selectedAmountForSimple,
  luckyWordsForBattle,
  luckyWordsForSimple,
  nameOfTheCurrentView,
  basicAmount,
  viewNames,
} from '@/state'

const level = ref(1)

const amount = computed(() => {
  if (nameOfTheCurrentView.value == viewNames[3]) {
    return (Math.pow(2, selectedAmountForSimple[level.value]) * basicAmount) / 1000000000
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    return (Math.pow(2, selectedAmountForBattle[level.value]) * basicAmount) / 1000000000
  } else {
    return 0
  }
})

const subtitle = computed(() => {
  if (nameOfTheCurrentView.value == viewNames[3]) {
    return 'Bet Amount'
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    return 'Bet Amount Per Bid'
  } else {
    return ''
  }
})

const reEnteredluckyWords = ref('')

function select(value: number) {
  level.value = value
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <div :class="$style.title">Pre-Game Setup</div>
      <div :class="$style.selector">
        <div :class="$style.selector_1">
          <div
            :class="[level >= 0 ? $style.selector_dot_1 : $style.selector_dot_2]"
            @click="select(0)"
          ></div>
          <div
            :class="[level >= 1 ? $style.selector_dot_1 : $style.selector_dot_2]"
            @click="select(1)"
          ></div>
          <div
            :class="[level >= 2 ? $style.selector_dot_1 : $style.selector_dot_2]"
            @click="select(2)"
          ></div>
          <div
            :class="[level >= 3 ? $style.selector_dot_1 : $style.selector_dot_2]"
            @click="select(3)"
          ></div>
          <div
            :class="[level >= 4 ? $style.selector_dot_1 : $style.selector_dot_2]"
            @click="select(4)"
          ></div>
        </div>
        <div :class="$style.selector_2">
          <div :class="$style.dot_2"></div>
          <div :class="[level >= 1 ? $style.selector_line_1 : $style.selector_line_2]"></div>
          <div :class="$style.dot_2"></div>
          <div :class="[level >= 2 ? $style.selector_line_1 : $style.selector_line_2]"></div>
          <div :class="$style.dot_2"></div>
          <div :class="[level >= 3 ? $style.selector_line_1 : $style.selector_line_2]"></div>
          <div :class="$style.dot_2"></div>
          <div :class="[level >= 4 ? $style.selector_line_1 : $style.selector_line_2]"></div>
          <div :class="$style.dot_2"></div>
        </div>
      </div>
      <div :class="$style.subtitle">{{ subtitle }}</div>
      <div :class="$style.text_box">{{ amount }} SOL</div>
      <div :class="$style.subtitle">Enter Lucky Words</div>
      <input
        :class="$style.input_box"
        v-model="luckyWordsForSimple"
        placeholder="At least 6 characters."
        v-if="nameOfTheCurrentView == viewNames[3]"
      />
      <input
        :class="$style.input_box"
        v-model="luckyWordsForBattle"
        placeholder="At least 6 characters."
        v-else-if="nameOfTheCurrentView == viewNames[4]"
      />
      <div :class="$style.subtitle">Confirm Lucky Words</div>
      <input
        :class="$style.input_box"
        v-model="reEnteredluckyWords"
        placeholder="Both inputs must be same."
      />
      <div :class="$style.button_1" @click="refresh()">Refresh</div>
      <div :class="$style.button_2" @click="tutorial()">Tutorial</div>
      <div :class="$style.button_3" @click="nextStep(level, reEnteredluckyWords)">
        Bet to Continue
      </div>
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

@media (max-height: 563px) {
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
  background-color: $background;
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
  border-radius: 5px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: start;
  background-color: $background;
}

.container .content .input_box:focus {
  outline: none;
}

.container .content .input_box::placeholder {
  color: rgb(255, 255, 255, 0.5);
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

$dot_size: 12.5px;
$dot_border_size: 4px;
$selector_height: 12.5px;
$selector_padding: 2.5px;

.container .content .selector {
  width: calc(($width - 2 * $padding) * 1px);
  height: $selector_height;
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 15px;
}

.container .content .selector_1 {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: $selector_height;
  justify-content: space-between;
  left: 0px;
  padding-left: $selector_padding;
  padding-right: $selector_padding;
  position: absolute;
  top: 0px;
  width: calc(($width - 2 * $padding) * 1px);
  z-index: 1;
}

.container .content .selector_2 {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: $selector_height;
  justify-content: space-around;
  left: 0px;
  padding-left: calc($selector_padding + $dot_border_size / 2);
  padding-right: calc($selector_padding + $dot_border_size / 2);
  position: absolute;
  top: 0px;
  width: calc(($width - 2 * $padding) * 1px);
  z-index: 0;
}

.container .content .selector_dot_1 {
  border-radius: $dot_size;
  border: $dot_border_size solid rgb(255, 255, 255);
  box-sizing: border-box;
  cursor: pointer;
  height: $dot_size;
  width: $dot_size;
}

.container .content .selector_dot_2 {
  border-radius: $dot_size;
  border: $dot_border_size solid rgb(127, 127, 127);
  box-sizing: border-box;
  cursor: pointer;
  height: $dot_size;
  width: $dot_size;
}

.container .content .selector_dot_3 {
  height: $dot_size;
  width: calc($dot_size - $dot_border_size);
}

.container .content .selector_line_1 {
  background-color: rgb(255, 255, 255);
  height: $dot_border_size;
  width: calc(100% / 4 - 1.25 * ($dot_size - $dot_border_size));
}

.container .content .selector_line_2 {
  background-color: rgb(127, 127, 127);
  height: $dot_border_size;
  width: calc(100% / 4 - 1.25 * ($dot_size - $dot_border_size));
}
</style>

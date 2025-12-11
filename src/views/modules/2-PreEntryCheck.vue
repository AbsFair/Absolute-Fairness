<script setup lang="ts">
import { refresh, tutorial, nextStep } from '@/functions/modules/2-PreEntryCheck'
import { luckyWordsForBattle } from '@/state'
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <div :class="$style.title">Pre-Entry Check</div>
      <div :class="$style.subtitle">Re-Enter Lucky Words</div>
      <input
        :class="$style.input_box"
        v-model="luckyWordsForBattle"
        placeholder="At least 6 characters."
      />
      <div :class="$style.button_1" @click="refresh()">Refresh</div>
      <div :class="$style.button_2" @click="tutorial()">Tutorial</div>
      <div :class="$style.button_3" @click="nextStep()">Continue</div>
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

@media (max-height: 467px) {
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
  background-color: $box_tint;
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

////////////////////////////////////////////////////////////////////////////////

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
////////////////////////////////////////////////////////////////////////////////
</style>

<script setup lang="ts">
import loading from '@/views/dialogs/LoadingDialog.vue'
import warning from '@/views/dialogs/WarningDialog.vue'
import { onMounted, onUnmounted } from 'vue'
import { play, tutorial } from '@/functions/view-2'
import { viewNames, showDialogOnView2, dialogTypeOnView2, nameOfTheCurrentView } from '@/state'

onMounted(() => {
  showDialogOnView2.value = false
  // showDialogOnView2.value = true
  // dialogTypeOnView2.value = 'disclaim'
  nameOfTheCurrentView.value = viewNames[2]
})

onUnmounted(() => {
  showDialogOnView2.value = false
})
</script>

<template>
  <div :class="$style.background">
    <div :class="$style.star" v-for="index in 128" :key="index"></div>
    <div :class="$style.container">
      <div :class="$style.border"></div>
      <div :class="$style.card">
        <div :class="[$style.flag, $style.image_1]"></div>
        <div :class="$style.name">Fair Fate</div>
        <div :class="$style.intro">
          Speak your luck! Let fate decide in this simple, fair game of random!
        </div>
        <div :class="$style.button_row">
          <div :class="$style.button_1" @click="play(viewNames[3])">Play</div>
          <div :class="$style.space"></div>
          <div :class="$style.button_2" @click="tutorial(viewNames[3])">Tutorial</div>
        </div>
      </div>
      <div :class="$style.space"></div>
      <div :class="$style.card">
        <div :class="[$style.flag, $style.image_2]"></div>
        <div :class="$style.name">Liar's Dice</div>
        <div :class="$style.intro">
          Expose or deceive your opponents in this thrilling, fair game of wits!
        </div>
        <div :class="$style.button_row">
          <div :class="$style.button_1" @click="play(viewNames[4])">Play</div>
          <div :class="$style.space"></div>
          <div :class="$style.button_2" @click="tutorial(viewNames[4])">Tutorial</div>
        </div>
      </div>
      <div :class="$style.space"></div>
      <div :class="$style.card">
        <div :class="[$style.flag, $style.image_3]"></div>
        <div :class="$style.name">Referral System</div>
        <div :class="$style.intro">
          Refer friends, earn rewards and enjoy exclusive benefits together!
        </div>
        <div :class="$style.button_row">
          <div :class="$style.button_1" @click="play(viewNames[5])">Play</div>
          <div :class="$style.space"></div>
          <div :class="$style.button_2" @click="tutorial(viewNames[5])">Tutorial</div>
        </div>
      </div>
      <div :class="$style.border"></div>
    </div>
  </div>
  <div :class="$style.dialog_container" v-if="showDialogOnView2">
    <loading v-if="dialogTypeOnView2 == 'loading'" />
    <warning v-else-if="dialogTypeOnView2 == 'warning'" />
  </div>
</template>

<style module lang="scss">
@use 'sass:math';
@use 'sass:list';

.background {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: rgb(249, 251, 253);
}

.background .star {
  z-index: 0;
  position: absolute;
  animation-name: spin;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  @for $i from 1 through 128 {
    $size: calc((4 + math.random(6)) * 2.5px);
    $tint: list.nth((#fbfcca, #ffd0a7, #d7f3fe), math.random(3));
    $nums: math.random(20) - 10;
    @while abs($nums) <= 1 {
      $nums: math.random(20) - 10;
    }
    $bias: calc($nums * $size);
    &:nth-child(#{$i}) {
      top: 1% * math.random(99);
      left: 1% * math.random(99);
      width: $size;
      height: $size;
      box-shadow:
        0px 0px calc($size / 5) #fff inset,
        0px 0px calc($size / 5) $tint inset,
        0px 0px calc($size / 1) $tint inset,
        0px 0px calc($size / 5) #fff,
        0px 0px calc($size / 5) $tint;
      background: transparent;
      border-radius: $size;
      animation-delay: math.random(25) * (-1s);
      transform-origin: $bias $bias;
      animation-duration: 25s;
    }
  }
  @keyframes spin {
    100% {
      transform: translate3d(0px, 0px, 0px) rotate(360deg);
    }
  }
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: auto;
  flex-shrink: 0;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}

$max-width: calc(300px * 3 + 32px * 2 + 32px * 2);

@media (max-width: $max-width) {
  .container {
    flex-direction: column;
    justify-content: start;
  }
}

$basic-size: 50px;

.container .space {
  width: $basic-size;
  height: 100%;
  flex-shrink: 0;
}

.container .border {
  width: $basic-size;
  height: 100%;
  flex-shrink: 0;
}

@media (max-width: $max-width) {
  .container .space {
    width: 100%;
    height: $basic-size;
    flex-shrink: 0;
  }
  .container .border {
    width: 100%;
    height: $basic-size;
    flex-shrink: 0;
  }
}

.container .card {
  width: 300px;
  // height: 350px;
  z-index: 2;
  display: flex;
  box-shadow: 0px 0px 20px rgb(0, 0, 0, 0.05);
  background: rgb(255, 255, 255, 1);
  flex-shrink: 0;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
  justify-content: start;
}

.container .card .flag {
  width: 100%;
  height: 150px;
  border-radius: 10px 10px 0px 0px;
  background-color: rgb(0, 0, 0, 0.5);
}

.container .card .image_1 {
  background-image: url('@/assets/jpg/stars_1.jpg');
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}

.container .card .image_2 {
  background-image: url('@/assets/jpg/stars_2.jpg');
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}

.container .card .image_3 {
  background-image: url('@/assets/jpg/stars_3.jpg');
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}

.container .card .name {
  color: rgb(0, 0, 0);
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: left;
  font-size: 20px;
  box-sizing: border-box;
  font-weight: 500;
  font-family: sans-serif;
  padding-left: 20px;
  padding-right: 20px;
}

.container .card .intro {
  color: rgb(0, 0, 0, 0.5);
  width: 100%;
  height: 90px;
  font-size: 15px;
  box-sizing: border-box;
  line-height: 1.5;
  font-weight: 500;
  font-family: sans-serif;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
}

.container .card .button_row {
  width: 100%;
  height: 60px;
  display: flex;
  box-sizing: border-box;
  align-items: start;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
  justify-content: left;
}

.container .card .button_row .button_1 {
  color: rgb(255, 255, 255);
  width: 75px;
  height: 35px;
  cursor: pointer;
  display: flex;
  font-size: 15px;
  align-items: center;
  font-family: sans-serif;
  border-radius: 25px;
  justify-content: center;
  background-color: rgb(0, 0, 0, 0.8);
}

.container .card .button_row .space {
  width: 10px;
}

.container .card .button_row .button_2 {
  color: rgb(0, 0, 0);
  width: 90px;
  height: 35px;
  border: rgb(0, 0, 0, 0.5) solid 0.5px;
  cursor: pointer;
  display: flex;
  font-size: 15px;
  box-sizing: border-box;
  align-items: center;
  font-family: sans-serif;
  border-radius: 25px;
  justify-content: center;
  background-color: rgb(255, 255, 255, 0.5);
}

.dialog_container {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  position: fixed;
  flex-shrink: 0;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(0, 0, 0, 0.8);
}
</style>

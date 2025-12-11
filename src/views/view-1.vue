<script setup lang="ts">
import waiting from '@/views/dialogs/WaitingDialog.vue'
import loading from '@/views/dialogs/LoadingDialog.vue'
import picking from '@/views/dialogs/PickingDialog.vue'
import warning from '@/views/dialogs/WarningDialog.vue'
import useTerm from '@/views/dialogs/UseTermDialog.vue'
import { onMounted, onUnmounted } from 'vue'
import { query, check, practice, tutorial } from '@/functions/view-1'
import FontFaceObserver from 'fontfaceobserver'
import {
  viewNames,
  dialogTypeOnView1,
  showDialogOnView1,
  nameOfTheCurrentView,
  displayedSolanaReadOnlyRPCURL,
} from '@/state'
import { closeDialog } from '@/box/L1/CloseDialog'

onMounted(() => {
  showDialogOnView1.value = true
  dialogTypeOnView1.value = 'logo'
  nameOfTheCurrentView.value = viewNames[1]
  const font_observer = new FontFaceObserver('MyConsolas')
  font_observer.load(null, 99999).then(() => {
    closeDialog()
  })
})

onUnmounted(() => {
  showDialogOnView1.value = false
})
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.star" v-for="index in 96" :key="index"></div>
    <div :class="$style.content">
      <div :class="$style.brand">Absolute Fairness</div>
      <div :class="$style.space_1"></div>
      <div :class="$style.slogan">100% Fair & Fully On-Chain Solana Games.</div>
      <div :class="$style.space_1"></div>
      <div :class="$style.inputs">
        <div :class="$style.inputs_1">Read-Only RPC URL</div>
        <input :class="$style.inputs_2" v-model="displayedSolanaReadOnlyRPCURL" />
      </div>
      <div :class="$style.prompt" @click="query()">What is it? How to customize it?</div>
      <div :class="$style.space_2"></div>
      <div :class="$style.button_1" @click="check()">Connect Web3 Wallet</div>
      <div :class="$style.space_2"></div>
      <div :class="$style.button_2" @click="tutorial()">Obtain the Document</div>
      <div :class="$style.space_2"></div>
      <div :class="$style.button_3" @click="practice()">Practice via Devnet</div>
    </div>
  </div>
  <div :class="$style.dialog_container" v-if="showDialogOnView1">
    <waiting v-if="dialogTypeOnView1 == 'logo'" />
    <loading v-else-if="dialogTypeOnView1 == 'loading'" />
    <warning v-else-if="dialogTypeOnView1 == 'warning'" />
    <picking v-else-if="dialogTypeOnView1 == 'picking'" />
    <useTerm v-else-if="dialogTypeOnView1 == 'u_terms'" />
  </div>
</template>

<style module lang="scss">
@use 'sass:math';
@use 'sass:list';

.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: rgb(24, 24, 48);
}

.container .star {
  z-index: 1;
  position: absolute;
  animation-name: spin;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  @for $i from 1 through 96 {
    $size: calc((4 + math.random(6)) * 10px);
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
      animation-delay: math.random(50) * (-1s);
      transform-origin: $bias $bias;
      animation-duration: 50s;
    }
  }
  @keyframes spin {
    100% {
      transform: translate3d(0px, 0px, 0px) rotate(360deg);
    }
  }
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.content .space_1 {
  height: 20px;
}

.content .space_2 {
  height: 15px;
}

.content .brand {
  color: rgb(255, 255, 255);
  z-index: 1;
  display: flex;
  min-width: 320px;
  font-size: 60px;
  text-align: center;
  line-height: 1;
  flex-shrink: 0;
  font-family: sans-serif;
  font-weight: 600;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}

@media (max-width: 600px) {
  .content .brand {
    font-size: 10vw;
  }
}

@media (max-width: 320px) {
  .content .brand {
    font-size: 32px;
  }
}

.content .slogan {
  color: rgb(255, 255, 255);
  z-index: 1;
  padding: 0px 10vw 0px 10vw;
  min-width: 320px;
  font-size: 20px;
  box-sizing: border-box;
  text-align: center;
  line-height: 1;
  flex-shrink: 0;
  font-family: sans-serif;
  font-weight: 400;
}

@media (max-width: 600px) {
  .content .slogan {
    font-size: calc((16 - 32 / 7) * 1px + 1 / 70 * 100vw);
  }
}

@media (max-width: 320px) {
  .content .slogan {
    font-size: 16px;
  }
  .content .slogan {
    padding: 0px 32px 0px 32px;
  }
}

.content .inputs {
  width: 330px;
  height: 54px;
  border: rgb(255, 255, 255, 1) solid 1px;
  display: flex;
  z-index: 1;
  margin-top: 10px;
  box-sizing: border-box;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(0, 0, 0, 0.5);
}

@media (max-width: 600px) {
  .content .inputs {
    margin-top: calc(100vw / 28 - 80 / 7 * 1px);
  }
}

@media (max-width: 400px) {
  .content .inputs {
    width: 82.5%;
  }
}

@media (max-width: 320px) {
  .content .inputs {
    margin-top: 0px;
  }
  .content .inputs {
    width: 264px;
  }
}

.content .prompt {
  color: rgb(255, 255, 255);
  width: 330px;
  cursor: pointer;
  z-index: 1;
  display: flex;
  padding: 0px 10px 0px 10px;
  font-size: 14px;
  margin-top: 6px;
  margin-bottom: 6px;
  box-sizing: border-box;
  font-family: sans-serif;
  align-items: end;
  justify-content: center;
  text-decoration: underline;
}

@media (max-width: 400px) {
  .content .prompt {
    width: 82.5%;
  }
}

@media (max-width: 320px) {
  .content .prompt {
    width: 264px;
  }
}

.content .button_1 {
  color: white;
  width: 240px;
  height: 40px;
  cursor: pointer;
  display: flex;
  z-index: 1;
  font-size: 16px;
  background: linear-gradient(135deg, #b06ab3 0%, #4568dc 100%);
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
}

.content .button_2:hover {
  border: 1px solid rgb(255, 255, 255, 1);
}

.content .button_2 {
  color: white;
  width: 240px;
  height: 40px;
  cursor: pointer;
  display: flex;
  z-index: 1;
  box-sizing: border-box;
  background-color: rgb(128, 128, 128, 0.5);
  font-size: 16px;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
}

.content .button_3:hover {
  border: 1px solid rgb(255, 255, 255, 1);
}

.content .button_3 {
  color: white;
  width: 240px;
  height: 40px;
  cursor: pointer;
  display: flex;
  z-index: 1;
  box-sizing: border-box;
  background-color: rgb(64, 64, 64, 0.25);
  font-size: 16px;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
}

.content .inputs .inputs_1 {
  color: rgb(255, 255, 255, 0.5);
  width: calc(100% - 20px);
  display: flex;
  z-index: 1;
  font-size: 12px;
  margin-top: 4px;
  line-height: 1;
  align-items: center;
  font-family: sans-serif;
  margin-bottom: 4px;
  flex-direction: row;
  justify-content: start;
}

.content .inputs .inputs_2 {
  color: rgb(255, 255, 255, 1);
  width: calc(100% - 20px);
  padding: 0px;
  border: none;
  display: flex;
  z-index: 1;
  font-size: 15px;
  line-height: 1;
  align-items: center;
  font-family: sans-serif;
  flex-direction: row;
  justify-content: start;
  background-color: transparent;
}

.content .inputs .inputs_2:focus {
  outline: none;
}

.dialog_container {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  position: fixed;
  flex-shrink: 0;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(0, 0, 0, 0.8);
}
</style>

<script setup lang="ts">
import {
  document_url,
  // nameOfTheCurrentView,
  // showDialogOnView1,
  // showDialogOnView2,
  // showDialogOnView3,
  // showDialogOnView4,
  // showDialogOnView5,
  // viewNames,
} from '@/state'
import { no, yes } from '@/functions/dialogs/TermsOfServices'

const url = document_url + '/docs/TermsOfServices.html'

// function closeDialog() {
//   if (nameOfTheCurrentView.value == viewNames[1]) {
//     showDialogOnView1.value = false
//   } else if (nameOfTheCurrentView.value == viewNames[2]) {
//     showDialogOnView2.value = false
//   } else if (nameOfTheCurrentView.value == viewNames[3]) {
//     showDialogOnView3.value = false
//   } else if (nameOfTheCurrentView.value == viewNames[4]) {
//     showDialogOnView4.value = false
//   } else if (nameOfTheCurrentView.value == viewNames[5]) {
//     showDialogOnView5.value = false
//   }
//   return null
// }
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.message">
      Do you accept and agree to our
      <a :class="$style.link" :href="url" target="_blank" rel="noopener noreferrer"
        >Terms of Service</a
      >?
    </div>
    <div :class="$style.buttons">
      <div :class="$style.no" @click="no()">No</div>
      <div :class="$style.space"></div>
      <div :class="$style.yes" @click="yes()">Yes</div>
    </div>
  </div>
</template>

<style module lang="scss">
$padding: 20px;

.container {
  width: calc(100% - 2 * $padding);
  border: 1px rgb(255, 255, 255) solid;
  display: flex;
  padding: $padding;
  min-width: 256px;
  max-width: 512px;
  box-sizing: border-box;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(15, 15, 15);
}

.message {
  color: rgb(255, 255, 255);
  font-size: 16px;
  line-height: 2;
  font-family: 'MyConsolas';
  margin-top: 0px;
  margin-bottom: 12px;
}

.link {
  color: rgba(255, 255, 255);
}

.buttons {
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}

.no {
  color: rgb(255, 255, 255);
  width: 57px;
  height: 100%;
  cursor: pointer;
  border: 1px rgb(255, 255, 255) solid;
  z-index: 3;
  display: flex;
  font-size: 15px;
  box-sizing: border-box;
  font-weight: 500;
  font-family: 'MyConsolas';
  align-items: center;
  border-radius: 32px;
  flex-direction: column;
  justify-content: center;
}

.space {
  width: 16px;
}

.yes {
  color: rgb(0, 0, 0);
  width: 57px;
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
  flex-direction: column;
  justify-content: center;
  background-color: rgb(255, 255, 255);
}
</style>

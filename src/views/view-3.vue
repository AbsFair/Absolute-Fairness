<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import {
  viewNames,
  showDialogOnView3,
  dialogTypeOnView3,
  moduleTypeOnView3,
  nameOfTheCurrentView,
} from '@/state'

import module_0 from '@/views/modules/0-RegisterPage.vue'
import module_1 from '@/views/modules/1-CreateProfile.vue'
import module_2 from '@/views/modules/2-PreGameSetup.vue'
import module_3 from '@/views/modules/3-WaitingPage.vue'
import module_4 from '@/views/modules/4-ConfirmationPage.vue'
import module_5 from '@/views/modules/6-SettlementPage1.vue'

import loading from '@/views/dialogs/LoadingDialog.vue'
import warning from '@/views/dialogs/WarningDialog.vue'

const all_modules = [module_0, module_1, module_2, module_3, module_4, module_5]

onMounted(() => {
  showDialogOnView3.value = false
  nameOfTheCurrentView.value = viewNames[3]
})

onUnmounted(() => {
  showDialogOnView3.value = false
})
</script>

<template>
  <div :class="$style.container">
    <component :is="all_modules[moduleTypeOnView3]"></component>
  </div>
  <div :class="$style.dialog_container" v-if="showDialogOnView3">
    <loading v-if="dialogTypeOnView3 == 'loading'" />
    <warning v-if="dialogTypeOnView3 == 'warning'" />
  </div>
</template>

<style module lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: relative;
  background-size: cover;
  background-image: url('@/assets/jpg/new_york.jpg');
  background-repeat: no-repeat;
  background-position: center;
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

<script setup lang="ts">
import {
  betAmountOfTheUser,
  bonusesTheUserWined,
  oppoDiceRolls1,
  oppoDiceRolls2,
  oppoDiceRolls3,
  oppoDiceRolls4,
  oppoDiceRolls5,
  opponentWeb3Address,
  theMostRecentBid,
  yourDiceRolls1,
  yourDiceRolls2,
  yourDiceRolls3,
  yourDiceRolls4,
  yourDiceRolls5,
  betAmountOfTheOppo,
} from '@/state'
import { tutorial, refresh, nextStep } from '@/functions/modules/6-SettlementPage2'
import { computed } from 'vue'

import dice_0 from '@/assets/svg/dice-0.svg'
import dice_1 from '@/assets/svg/dice-1.svg'
import dice_2 from '@/assets/svg/dice-2.svg'
import dice_3 from '@/assets/svg/dice-3.svg'
import dice_4 from '@/assets/svg/dice-4.svg'
import dice_5 from '@/assets/svg/dice-5.svg'
import dice_6 from '@/assets/svg/dice-6.svg'

const button_name = computed(() => {
  if (bonusesTheUserWined.value > 0) {
    return 'Withdraw'
  } else {
    return 'Go Back to Restart'
  }
})

// onMounted(() => {
//   showLoadingDialog()
//   if (nameOfTheCurrentView.value == viewNames[3]) {
//     setTimeout(() => {
//       refreshForThe2ndTimeForSimple(true)
//     }, 3000)
//   } else if (nameOfTheCurrentView.value == viewNames[4]) {
//     setTimeout(() => {
//       refreshForThe2ndTimeForBattle(true)
//     }, 3000)
//   }
// })
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <div :class="$style.title">Settlement Page</div>
      <div :class="$style.subtitle">The Final Bid</div>
      <div :class="$style.line_box">{{ theMostRecentBid }}</div>
      <div :class="$style.subtitle">Total Bets (SOL)</div>
      <div :class="$style.text_box">
        You: {{ betAmountOfTheUser }} + Opp: {{ betAmountOfTheOppo }}
      </div>
      <div :class="$style.subtitle">Rewards You Won</div>
      <div :class="$style.text_box">{{ bonusesTheUserWined }} SOL</div>
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
      <div :class="$style.subtitle">Your Opponent's Rolls</div>
      <div :class="$style.dice_box">
        <img :src="dice_0" :class="$style.dice" v-if="oppoDiceRolls1 == 0" />
        <img :src="dice_1" :class="$style.dice" v-else-if="oppoDiceRolls1 == 1" />
        <img :src="dice_2" :class="$style.dice" v-else-if="oppoDiceRolls1 == 2" />
        <img :src="dice_3" :class="$style.dice" v-else-if="oppoDiceRolls1 == 3" />
        <img :src="dice_4" :class="$style.dice" v-else-if="oppoDiceRolls1 == 4" />
        <img :src="dice_5" :class="$style.dice" v-else-if="oppoDiceRolls1 == 5" />
        <img :src="dice_6" :class="$style.dice" v-else-if="oppoDiceRolls1 == 6" />

        <img :src="dice_0" :class="$style.dice" v-if="oppoDiceRolls2 == 0" />
        <img :src="dice_1" :class="$style.dice" v-else-if="oppoDiceRolls2 == 1" />
        <img :src="dice_2" :class="$style.dice" v-else-if="oppoDiceRolls2 == 2" />
        <img :src="dice_3" :class="$style.dice" v-else-if="oppoDiceRolls2 == 3" />
        <img :src="dice_4" :class="$style.dice" v-else-if="oppoDiceRolls2 == 4" />
        <img :src="dice_5" :class="$style.dice" v-else-if="oppoDiceRolls2 == 5" />
        <img :src="dice_6" :class="$style.dice" v-else-if="oppoDiceRolls2 == 6" />

        <img :src="dice_0" :class="$style.dice" v-if="oppoDiceRolls3 == 0" />
        <img :src="dice_1" :class="$style.dice" v-else-if="oppoDiceRolls3 == 1" />
        <img :src="dice_2" :class="$style.dice" v-else-if="oppoDiceRolls3 == 2" />
        <img :src="dice_3" :class="$style.dice" v-else-if="oppoDiceRolls3 == 3" />
        <img :src="dice_4" :class="$style.dice" v-else-if="oppoDiceRolls3 == 4" />
        <img :src="dice_5" :class="$style.dice" v-else-if="oppoDiceRolls3 == 5" />
        <img :src="dice_6" :class="$style.dice" v-else-if="oppoDiceRolls3 == 6" />

        <img :src="dice_0" :class="$style.dice" v-if="oppoDiceRolls4 == 0" />
        <img :src="dice_1" :class="$style.dice" v-else-if="oppoDiceRolls4 == 1" />
        <img :src="dice_2" :class="$style.dice" v-else-if="oppoDiceRolls4 == 2" />
        <img :src="dice_3" :class="$style.dice" v-else-if="oppoDiceRolls4 == 3" />
        <img :src="dice_4" :class="$style.dice" v-else-if="oppoDiceRolls4 == 4" />
        <img :src="dice_5" :class="$style.dice" v-else-if="oppoDiceRolls4 == 5" />
        <img :src="dice_6" :class="$style.dice" v-else-if="oppoDiceRolls4 == 6" />

        <img :src="dice_0" :class="$style.dice" v-if="oppoDiceRolls5 == 0" />
        <img :src="dice_1" :class="$style.dice" v-else-if="oppoDiceRolls5 == 1" />
        <img :src="dice_2" :class="$style.dice" v-else-if="oppoDiceRolls5 == 2" />
        <img :src="dice_3" :class="$style.dice" v-else-if="oppoDiceRolls5 == 3" />
        <img :src="dice_4" :class="$style.dice" v-else-if="oppoDiceRolls5 == 4" />
        <img :src="dice_5" :class="$style.dice" v-else-if="oppoDiceRolls5 == 5" />
        <img :src="dice_6" :class="$style.dice" v-else-if="oppoDiceRolls5 == 6" />
      </div>
      <div :class="$style.subtitle">Your Opponent's Address</div>
      <div :class="$style.code_box">{{ opponentWeb3Address }}</div>
      <div :class="$style.button_1" @click="refresh()">Refresh</div>
      <div :class="$style.button_2" @click="tutorial()">Tutorial</div>
      <div :class="$style.button_3" @click="nextStep()">{{ button_name }}</div>
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

@media (max-height: 828px) {
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
  background-color: rgb(255, 255, 255, 0.2);
}

.container .content .line_box {
  color: rgb(255, 255, 255);
  width: 100%;
  border: 1px solid rgb(255, 255, 255);
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
  background-color: rgb(255, 255, 255, 0);
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
  background-color: rgb(255, 255, 255, 0.2);
}

.container .content .dice_box .dice {
  width: $dice_size;
  height: $dice_size;
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

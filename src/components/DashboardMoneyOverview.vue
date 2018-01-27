<template>
  <v-card 
    color="darken-1" 
    class="elevation-3"
  >
    <v-card-title class="subheader justify-center">MONEY OVERVIEW</v-card-title>
    <v-layout 
      class="money-left" 
      align-center
    >
      <v-flex xs6 style="text-align: center">
        <v-subheader class="text-center">Money spent this week</v-subheader>
        <v-progress-circular 
          size="90" 
          :width="10" 
          :rotate="90" 
          :value="weeklyPercentage" 
          color="cyan"
        >
          ${{ moneySpent.weeklySpent }}
        </v-progress-circular>
      </v-flex>
      <v-flex xs6 style="text-align: center">
        <v-subheader class="text-center">Money spent this month</v-subheader>
        <v-progress-circular 
          size="90" 
          :width="10" 
          :rotate="90" 
          :value="monthlyPercentage" 
          color="cyan"
        >
          ${{ moneySpent.monthlySpent }}
        </v-progress-circular>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
'use strict'

import { mapGetters, mapActions } from 'vuex'
import { divide, multiply } from 'ramda'

export default {
  name: 'money-overview',
  async mounted () {
    await this.getMoneySpent()
  },
  computed: {
    ...mapGetters('user', ['moneySpent', 'user']),
    monthlyPercentage () {
      const { monthlySpent } = this.moneySpent
      const { monthlyExpense } = this.user
      const decimal = divide(monthlySpent, monthlyExpense)
      return this.multiply100(decimal)
    },
    weeklyPercentage () {
      const { weeklySpent } = this.moneySpent
      const { weeklyExpense } = this.user
      const decimal = divide(weeklySpent, weeklyExpense)
      return this.multiply100(decimal)
    }
  },
  methods: {
    ...mapActions('user', ['getMoneySpent']),
    multiply100: multiply(100)
  }
}
</script>

<style lang="scss" scoped>
  .money-left {
    padding: 0em 0.5em 1em 0.5em;
  }
  .text-center {
    justify-content: center
  }
</style>

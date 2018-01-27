<template>
  <v-layout
    wrap
    class="content"
  >
    <v-flex 
      xs12 md8 
      offset-lg1
      offset-md2
    >
      <money-overview></money-overview>
    </v-flex>
    <v-flex       
      xs12 md8 
      offset-lg1
      offset-md2 
      style="margin-top: 2em"
    >
      <expenses-list></expenses-list>
    </v-flex>
  </v-layout>
</template>

<script>
'use strict'

import MoneyOverview from './DashboardMoneyOverview.vue'
import ExpensesList from './DashboardExpensesList'

export default {
  components: {
    MoneyOverview,
    ExpensesList
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

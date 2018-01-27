<template>
  <v-card class="ma-2 elevation-3">
    <v-card-title class="title grey lighten-2">
      <span>Money Control</span>
    </v-card-title>
    <div class="pa-5">
      <v-form v-model="valid">
        <v-alert type="error" v-model="hasError">
          {{ errorMessage }}
        </v-alert>
        <v-text-field 
          label="Money to spend per week" 
          v-model="weeklyExpense" 
          :rules="amountRules"
          prepend-icon="attach_money"
        ></v-text-field>
        <v-text-field 
          label="Money to spend per month" 
          v-model="monthlyExpense"
          :rules="amountRules" 
          prepend-icon="attach_money"
        ></v-text-field>
        <v-layout row align-center justify-center>
          <v-flex xs8 md6>
            <v-btn 
              color="grey lighten-2" 
              large 
              block 
              @click.prevent="sendMoneyControl"
              :disabled="!valid"
            >
              <span>Send</span>
            </v-btn>
          </v-flex>
      </v-layout>
      </v-form>
    </div>
  </v-card>
</template>

<script>
'use strict'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'money-control',
  data () {
    return {
      valid: false,
      weeklyExpense: '',
      monthlyExpense: '',
      amountRules: [
        (v) => !!v || 'This field can\'t be empty',
        (v) => /^\$?(?!0\d)(?:\d+|\d{1,3}(?:,\d{1,3})*)(?:\.\d{2})?$/.test(v) || 'Incorrect format for money'
      ],
      errorMessage: '',
      hasError: false
    }
  },
  mounted () {
    this.weeklyExpense = this.user.weeklyExpense
    this.monthlyExpense = this.user.monthlyExpense
  },
  computed: {
    ...mapGetters('user', ['user'])
  },
  methods: {
    ...mapActions('user', ['moneyControl']),
    async sendMoneyControl () {
      try {
        const { weeklyExpense, monthlyExpense } = this
        await this.moneyControl({ weeklyExpense, monthlyExpense })
      } catch (error) {
        this.errorMessage = error.message || error.detail
        this.hasError = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  justify-content: center;
  border-bottom: 1px #dddddd solid;
}
</style>

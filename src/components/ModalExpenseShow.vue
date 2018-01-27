<template>
  <v-dialog v-model="actualVisibity" full-width max-width="500">
    <v-card class="pa-3">
      <v-layout wrap>
        <v-flex xs6 md8>
          <v-card-title class="headline">
            {{ expense.description }}
          </v-card-title>
        </v-flex>
        <v-flex xs6 md4 class="text-xs-right">
          <span class="body-1 grey--text darken-4">
            {{ expense.date | formatDate }}
          </span>
          <v-chip
            class="mt-3" 
            color="cyan darken-3" 
            text-color="white"
          >
            <v-avatar>
              <v-icon>{{ categoryIcon(expense.category) }}</v-icon>
            </v-avatar>
            {{ expense.category }}
          </v-chip>
        </v-flex>
        <v-flex xs12 class="ma-2 pa-2">
          <span class="subheading">Amount:</span>
          <span class="body-2">${{ expense.amount }}</span>
        </v-flex>
        <v-flex xs12 class="ma-2 pa-2">
          <span class="subheading">Details:</span>
          <span class="body-2">{{ expense.details }}</span>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
'use strict'

import { when, equals } from 'ramda'

export default {
  name: 'modal-expense-show',
  props: {
    visibility: {
      type: Boolean,
      required: true
    },
    expense: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      actualVisibity: this.visibility
    }
  },
  methods: {
    categoryIcon (name) {
      return this.$store.getters['expense/categoryIcon'](name)
    }
  },
  watch: {
    actualVisibity (val) {
      const isClose = when(
        equals(false),
        () => this.$emit('close')
      )

      isClose(val)
    }
  }
}
</script>

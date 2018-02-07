<template>
  <v-dialog v-model="actualVisibility" full-width max-width="500" persistent>
    <v-card>
      <v-alert type="error" v-model="hasError">
        {{ errorMessage }}
      </v-alert>
      <v-card-title>
        <span class="headline">{{ edit ? 'Edit' : 'New' }} Expense</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form v-model="valid">
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field 
                  :rules="amountRules" 
                  prepend-icon="attach_money" 
                  label="Amount" 
                  v-model="amount"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field 
                  :rules="[notEmptyRule]" 
                  prepend-icon="description" 
                  label="Description" 
                  v-model="description"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field 
                  :rules="[notEmptyRule]" 
                  prepend-icon="info" 
                  label="Details" 
                  v-model="details"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select 
                  label="Category"
                  v-model="category" 
                  :items="categories"
                  item-text="name"
                  item-value="name"
                  item-avatar="icon"
                  chips
                  :rules="[notEmptyRule]"
                >
                  <template slot="selection" slot-scope="data">
                    <v-chip
                      @input="data.parent.selectItem(data.item)"
                      :selected="data.selected"
                      class="chip--select-multi"
                      :key="JSON.stringify(data.item)"
                      color="cyan darken-3" 
                      text-color="white"
                    >
                      <v-avatar>
                        <v-icon v-html="data.item.icon" small></v-icon>
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template slot="item" slot-scope="data">
                      <v-list-tile avatar>
                        <v-list-tile-avatar>
                          <v-icon v-html="data.item.icon"></v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>{{ data.item.name }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                  </template>
                </v-select>
              </v-flex>
              <v-flex xs12>
                <v-menu 
                  lazy 
                  :close-on-content-click="false" 
                  v-model="menuVisibility" 
                  transition="scale-transition"
                  offset-y 
                  full-width 
                  :nudge-right="40" 
                  max-width="290px" 
                  min-width="290px"
                  :disabled="edit"
                >
                  <v-text-field 
                    slot="activator" 
                    label="Date in M/D/Y format" 
                    v-model="dateFormated" 
                    prepend-icon="event" 
                    @blur="date = parseDate(dateFormated)"
                    :rules="[notEmptyRule]"
                    :disabled="edit"
                  ></v-text-field>
                  <v-date-picker 
                    v-model="date" 
                    @input="dateFormated = formatDate($event)" 
                    no-title scrollable 
                    actions
                  >
                    <template slot-scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          color="blue darken-1" 
          flat 
          @click.native="close()"
        >
          Close
        </v-btn>
        <v-btn 
          v-if="edit" 
          color="blue darken-1" 
          flat 
          @click.native="editExpense()" 
          :disabled="!valid"
        >
          Edit
        </v-btn>
        <v-btn 
          v-else 
          color="blue darken-1" 
          flat 
          @click.native="add()" 
          :disabled="!valid"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
'use strict'

import { split, ifElse, join, map, equals } from 'ramda'
import { mapActions, mapGetters } from 'vuex'
import modal from './mixins/modal'
import { amount } from './mixins/rules'

export default {
  name: 'modal-form-expense',
  mixins: [modal, amount],
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    expense: {
      type: Object,
      default: null
    }
  },
  mounted () {
    const changeValues = (expense) => {
      const { id, amount, description, details, date, category } = expense
      this.id = id
      this.amount = amount
      this.description = description
      this.details = details
      this.category = category
      this.date = date
      this.dateFormated = this.formatDate(date)
    }

    const isEdit = ifElse(
      equals(null),
      (expense) => expense,
      changeValues
    )

    isEdit(this.expense)
  },
  data () {
    return {
      id: null,
      amount: '',
      description: '',
      details: '',
      dateFormated: '',
      date: '',
      category: '',
      menuVisibility: false,
      valid: false,
      hasError: false,
      errorMessage: ''
    }
  },
  computed: {
    ...mapGetters('expense', ['categories'])
  },
  methods: {
    formatDate (date) {
      const splitAndJoin = (date) => {
        const [year, month, day] = split('-', date)
        return join('/', [month, day, year])
      }
      const formatCond = ifElse(
        (date) => !date,
        (date) => date,
        splitAndJoin
      )

      return formatCond(date)
    },
    parseDate (date) {
      const splitAndJoin = (date) => {
        const dateSplited = split('/', date)
        const [month, day, year] = map((e) => e.padStart(2, '0'), dateSplited)

        return join('-', [year, month, day])
      }

      const parseCond = ifElse(
        (date) => !date,
        (date) => date,
        splitAndJoin
      )
      return parseCond(date)
    },
    notEmptyRule: (v) => !!v || 'This field can\'t be empty',
    async add () {
      try {
        const expense = {
          amount: this.amount,
          description: this.description,
          details: this.details,
          date: this.date,
          category: this.category
        }
        await this.create(expense)
        await this.getMoneySpent()
        this.close()
      } catch (error) {
        this.errorMessage = error.errorMessage || error.detail
        this.hasError = true
      }
    },
    async editExpense () {
      try {
        const expense = {
          id: this.id,
          amount: this.amount,
          description: this.description,
          details: this.details,
          date: this.date,
          category: this.category
        }

        await this.update(expense)
        await this.getMoneySpent()
        this.close()
      } catch (error) {
        this.errorMessage = error.errorMessage || error.detail
        this.hasError = true
      }
    },
    ...mapActions('expense', ['create', 'update']),
    ...mapActions('user', ['getMoneySpent'])
  }
}
</script>

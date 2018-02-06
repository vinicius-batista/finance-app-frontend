<template>
  <div   >
    <v-list 
      three-line 
      class="elevation-3"
    >
      <v-list-tile
        avatar 
        v-for="expense in expenses" 
        :key="expense.id" 
        @click.stop="showExpense(expense)"
      >
        <v-list-tile-avatar>
          <v-icon>{{ categoryIcon(expense.category) }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ expense.description }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ expense.date | formatDate }}</v-list-tile-sub-title>
          <v-list-tile-sub-title>${{ expense.amount }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action @click.stop>
          <v-menu bottom left>
              <v-btn icon slot="activator">
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile @click.stop="editExpense(expense)">
                  <v-icon>edit</v-icon>
                </v-list-tile>
                <v-list-tile @click.stop="deleteExpense(expense.id)">
                  <v-icon>delete</v-icon>
                </v-list-tile>
              </v-list>
          </v-menu>
        </v-list-tile-action>
      </v-list-tile>
      <infinite-loading
        ref="loader"
        @infinite="loadMore" 
        spinner="spiral"
      >
        <span slot="no-more">
          There is no more expenses
        </span>
      </infinite-loading>
    </v-list>
    <modal-expense-delete
      v-if="deleteVisibility"
      :visibility="deleteVisibility"
      :id="idForDelete"
      @close="deleteVisibility = false"
    ></modal-expense-delete>
    <modal-expense-form
      v-if="editVisibility"
      :visibility="editVisibility"
      edit
      :expense="expenseForEdit"
      @close="editVisibility = false"
    ></modal-expense-form>
    <modal-expense-show
      v-if="showVisibility"
      :visibility="showVisibility"
      :expense="expenseForShow"
      @close="showVisibility = false"
    ></modal-expense-show>
  </div>
</template>

<script>
'use strict'

import { mapGetters, mapActions } from 'vuex'
import ModalExpenseDelete from './ModalExpenseDelete.vue'
import ModalExpenseForm from './ModalExpenseForm.vue'
import ModalExpenseShow from './ModalExpenseShow.vue'
import InfiniteLoading from 'vue-infinite-loading'
import { ifElse, gt, isEmpty, when } from 'ramda'

export default {
  name: 'expenses-list',
  components: {
    ModalExpenseDelete,
    ModalExpenseForm,
    ModalExpenseShow,
    InfiniteLoading
  },
  data () {
    return {
      deleteVisibility: false,
      idForDelete: null,
      editVisibility: false,
      expenseForEdit: null,
      showVisibility: false,
      expenseForShow: null,
      reload: false
    }
  },
  beforeDestroy () {
    this.$refs.loader.stateChanger.reset()
  },
  computed: {
    ...mapGetters('expense', ['expenses', 'currentPage', 'lastPage', 'nextPage'])
  },
  methods: {
    ...mapActions('expense', ['getPage']),
    categoryIcon (name) {
      return this.$store.getters['expense/categoryIcon'](name)
    },
    deleteExpense (id) {
      this.idForDelete = id
      this.deleteVisibility = true
    },
    editExpense (expense) {
      this.expenseForEdit = expense
      this.editVisibility = true
    },
    showExpense (expense) {
      this.expenseForShow = expense
      this.showVisibility = true
    },
    async loadMore ($state) {
      const fetchNewPage = async () => {
        await this.getPage(this.nextPage)
        $state.loaded()
      }
      const isNotLastPage = ifElse(
        gt(this.lastPage),
        fetchNewPage,
        async () => $state.complete()
      )
      await isNotLastPage(this.currentPage)
    }
  },
  watch: {
    expenses (val) {
      const expensesReset = when(
        isEmpty,
        () => this.$refs.loader.stateChanger.reset()
      )
      expensesReset(val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

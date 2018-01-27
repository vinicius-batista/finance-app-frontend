<template>
  <v-toolbar fixed app clipped-left class="cyan">
    <v-toolbar-side-icon
      dark 
      @click.native="changeDrawer()"
    >
    </v-toolbar-side-icon>
    <v-spacer></v-spacer>
    <v-spacer class="hidden-md-and-down"></v-spacer>
    <v-toolbar-title v-text="title" class="white--text"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn 
      icon 
      dark 
      @click.native.stop="modalVisibility = true"
    >
      <v-icon>fa-plus</v-icon>
    </v-btn>
    <v-spacer class="hidden-md-and-down"></v-spacer>
    <modal-expense-form
      v-if="modalVisibility"
      :visibility="modalVisibility"
      @close="modalVisibility = false"
    ></modal-expense-form>
  </v-toolbar>
</template>

<script>
'use strict'

import { mapMutations } from 'vuex'
import ModalExpenseForm from './ModalExpenseForm.vue'

export default {
  name: 'the-nav-bar',
  components: {
    ModalExpenseForm
  },
  data () {
    return {
      title: 'Finance app',
      modalVisibility: false
    }
  },
  methods: {
    ...mapMutations('base', {
      changeDrawer: 'CHANGE_DRAWER'
    })
  }
}
</script>

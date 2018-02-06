<template>
  <v-dialog v-model="actualVisibility" max-width="400">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>
        <v-card-text>Do you really want to delete this expense? This process cannot be undone..</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" flat="flat" @click.native="close">Cancel</v-btn>
          <v-btn color="red darken-1" flat="flat" @click.native="destroy">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
'use strict'

import { mapActions } from 'vuex'
import modal from './mixins/modal.js'

export default {
  name: 'modal-delete-expense',
  mixins: [modal],
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions('expense', ['remove']),
    async destroy () {
      await this.remove(this.id)
      this.close()
    }
  }
}
</script>

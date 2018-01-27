<template>
</template>

<script>
'use strict'

import { mapActions } from 'vuex'

export default {
  async mounted () {
    await this.logout()
    this.$router.push({ name: 'home' })
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>


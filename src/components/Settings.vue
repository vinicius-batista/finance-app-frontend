<template>
  <v-layout wrap>
    <v-flex      
      xs12 md8 
      offset-lg1
      offset-md2
    >
      <reset-password></reset-password>
    </v-flex>
  </v-layout>
</template>

<script>
'use strict'

import ResetPassword from './SettingsResetPassword'

export default {
  components: {
    ResetPassword
  }
}
</script>

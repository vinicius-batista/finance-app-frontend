<template>
  <v-layout wrap>
    <v-flex      
      xs12 md8 
      offset-lg1
      offset-md2
    >
     <money-control></money-control>
    </v-flex>
    <v-flex
      xs12 md8 
      offset-lg1
      offset-md2
    >
      <user-info></user-info>
    </v-flex>
  </v-layout>
</template>

<script>
'use strict'

import MoneyControl from './ProfileMoneyControl'
import UserInfo from './ProfileUserInfo'

export default {
  components: {
    MoneyControl,
    UserInfo
  }
}
</script>

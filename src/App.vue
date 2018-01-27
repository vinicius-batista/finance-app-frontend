<template>
  <v-app light>
    <the-side-bar v-if="isLogged"></the-side-bar>
    <the-nav-bar v-if="isLogged"></the-nav-bar>
    <v-content>
      <v-container grid-list-xs fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
'use strict'

import TheNavBar from '@/components/TheNavBar.vue'
import TheSideBar from '@/components/TheSideBar.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    TheNavBar,
    TheSideBar
  },
  computed: {
    ...mapGetters('auth', ['isLogged'])
  }
}
</script>

<style lang="scss" scoped>
  .content {
    padding-top: 2em;
    background-color: #ffffff;
  }
</style>

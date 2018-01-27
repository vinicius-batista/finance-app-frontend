<template>
  <v-navigation-drawer 
    fixed 
    v-model="drawer" 
    app 
    :clipped="!isMobile"
  >
    <v-container fluid class="cyan ligthen-4 profile">
      <v-layout align-center wrap v-if="loaded">
        <v-flex xs3>
          <v-avatar class="teal">
            <span class="white--text headline">{{ user.name.charAt(0).toUpperCase() }}</span>
          </v-avatar>
        </v-flex>
        <v-flex xs9>
          <strong class="white--text ">{{ user.name }}</strong>
        </v-flex>
        <v-flex xs9 offset-xs3>
          <strong class="white--text ">{{ user.email }}</strong>
        </v-flex>
      </v-layout>
    </v-container>
    <v-list class="pt-0" dense>
      <v-list-tile 
        class="black--text"
        v-for="item in items" 
        :key="item.title" 
        :to="{ name: item.route }"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
'use strict'

import { mapGetters, mapActions } from 'vuex'
import { lt } from 'ramda'

export default {
  name: 'the-side-bar',
  data () {
    return {
      items: [
        { icon: 'dashboard', title: 'Dashboard', route: 'dashboard' },
        { icon: 'account_circle', title: 'Profile', route: 'profile' },
        { icon: 'settings', title: 'Settings', route: 'settings' },
        { icon: 'exit_to_app', title: 'Logout', route: 'logout' }
      ],
      loaded: false
    }
  },
  async mounted () {
    await this.getUser()
    this.loaded = true
  },
  computed: {
    ...mapGetters('base', ['drawer']),
    ...mapGetters('user', ['user']),
    isMobile: () => lt(screen.availWidth, 1264)
  },
  methods: {
    ...mapActions('user', ['getUser'])
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    padding: 2em 1em 2em 1em;
  }
</style>

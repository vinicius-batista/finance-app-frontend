<template>
  <v-card class="ma-2 elevation-3">
    <v-card-title class="title grey lighten-2">
      <span>Personal info</span>
    </v-card-title>
    <div class="pa-5">
      <v-form v-model="valid">
        <v-alert type="error" v-model="hasError">
          {{ errorMessage }}
        </v-alert>
          <v-text-field
            label="Name"
            v-model="name"
            :rules="nameRules"
            prepend-icon="person"
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="email"
            :rules="emailRules"
            prepend-icon="email"
          ></v-text-field>
        <v-layout row align-center justify-center>
          <v-flex xs8 md6>
            <v-btn 
              color="grey lighten-2" 
              large 
              block 
              @click.prevent="sendUpdateUser"
              :disabled="!valid"
            >
              <span>Send</span>
            </v-btn>
          </v-flex>
      </v-layout>
      </v-form>
    </div>
  </v-card>
</template>

<script>
'use strict'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'user-info',
  data () {
    return {
      name: '',
      email: '',
      nameRules: [
        (v) => !!v || 'Name is required'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      valid: false,
      errorMessage: '',
      hasError: false
    }
  },
  mounted () {
    this.name = this.user.name
    this.email = this.user.email
  },
  computed: {
    ...mapGetters('user', ['user'])
  },
  methods: {
    ...mapActions('user', ['updateUser']),
    async sendUpdateUser () {
      try {
        const { name, email } = this
        await this.updateUser({ name, email })
      } catch (error) {
        this.errorMessage = error.message || error.detail
        this.hasError = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  justify-content: center;
  border-bottom: 1px #dddddd solid;
}
</style>

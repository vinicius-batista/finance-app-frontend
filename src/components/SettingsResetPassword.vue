<template>
  <v-card class="ma-2 elevation-3">
    <v-card-title class="title grey lighten-2">
      <span>Reset password</span>
    </v-card-title>
    <div class="pa-5">
      <v-form v-model="valid" ref="form">
        <v-alert type="error" v-model="hasError">
          {{ errorMessage }}
        </v-alert>
        <v-alert type="success" v-model="hasSuccess">
          {{ successMessage }}
        </v-alert>
        <v-text-field
          type="password"
          label="Old password"
          v-model="oldPassword"
          :rules="oldPasswordRules"
          prepend-icon="lock"
        ></v-text-field>
        <v-text-field
          type="password"
          label="New password"
          v-model="newPassword"
          :rules="passwordRules"
          prepend-icon="lock"
        ></v-text-field>
        <v-layout row align-center justify-center>
          <v-flex xs8 md6>
            <v-btn 
              color="grey lighten-2" 
              large 
              block 
              @click.prevent="resetPassword"
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

import { mapActions } from 'vuex'
import { password } from './mixins/rules'

export default {
  name: 'reset-password',
  mixins: [password],
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      oldPasswordRules: [
        (v) => !!v || 'Old password is required'
      ],
      valid: false,
      errorMessage: '',
      hasError: false,
      successMessage: '',
      hasSuccess: false
    }
  },
  methods: {
    ...mapActions('auth', ['resetPass']),
    async resetPassword () {
      try {
        const { oldPassword, newPassword } = this
        const response = await this.resetPass({ oldPassword, newPassword })

        this.successMessage = response.data.message
        this.hasSuccess = true
        this.$refs.form.reset()
      } catch (error) {
        this.errorMessage = error.response.data.message
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

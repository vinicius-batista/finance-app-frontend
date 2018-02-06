<template>
  <v-layout row align-center justify-center class="mt-5">
    <v-flex xs10 md6>
      <v-card class="card-login">
        <v-card-title class="title"><span class="white--text">LOGIN</span></v-card-title>
        <div class="content">
          <v-form v-model="valid" >
            <v-alert type="error" v-model="hasError">
              {{ errorMessage }}
            </v-alert>
            <v-text-field
              label="Email"
              v-model="email"
              :rules="emailRules"
              prepend-icon="email"
            ></v-text-field>
            <v-text-field
              type="password"
              label="Password"
              v-model="password"
              :rules="passwordRules"
              prepend-icon="lock"
            ></v-text-field>
          </v-form>
        <v-layout row align-center justify-center>
          <v-flex xs8 md6>
            <v-btn
              color="cyan darken-1"
              large
              block
              :disabled="!valid"
              @click.prevent="loginUser"
            >
              <span class="white--text">Login</span> 
            </v-btn>
          </v-flex>
        </v-layout>
        </div>
        <v-layout align-center justify-center>
          <v-flex xs12 md6>
            <v-subheader 
              class="grey--text text--darken-1 register-text"
              @click.prevent="changeRoute('auth.register')"
            >
              Don't have an account yet? Register now
            </v-subheader>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
'use strict'

import { mapActions } from 'vuex'
import { email } from './mixins/rules'

export default {
  mixins: [email],
  data () {
    return {
      email: '',
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required'
      ],
      valid: false,
      errorMessage: 'test',
      hasError: false
    }
  },
  methods: {
    changeRoute (name) {
      this.$router.push({ name })
    },
    async loginUser () {
      try {
        const { email, password } = this
        await this.login({ email, password })
        this.changeRoute('dashboard')
      } catch (error) {
        this.errorMessage = error[0].message
        this.hasError = true
      }
    },
    ...mapActions('auth', ['login'])
  }
}
</script>

<style lang="scss" scoped>
  .card-login {
    vertical-align: middle;
    .title {
      background-color: #00acc1;
      justify-content: center;
      border-bottom: 1px #dddddd solid;
    }
    .content {
      padding: 1em 4em 1em 4em;
    }
    .register-text {
      cursor: pointer;
      margin: 2em 0 1em 0;
      justify-content: center;
    }
  }
</style>

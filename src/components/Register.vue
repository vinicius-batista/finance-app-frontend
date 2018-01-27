<template>
    <v-layout row align-center justify-center class="mt-5">
    <v-flex xs10 md6>
      <v-card class="card-register">
        <v-card-title class="title"><span class="white--text">REGISTER</span></v-card-title>
        <div class="content">
          <v-form v-model="valid" >
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
              @click.native="registerUser"
            >
              <span class="white--text">REGISTER</span>
            </v-btn>
          </v-flex>
        </v-layout>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
'use strict'

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      nameRules: [
        (v) => !!v || 'Name is required'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 8 || 'Password must has at least 8 digits',
        (v) => /^(?=.*[a-z]).+$/.test(v) || 'At least one character in lower case',
        (v) => /^(?=.*[A-Z]).+$/.test(v) || 'At least one character in upper case',
        (v) => /^(?=.*[0-9]).+$/.test(v) || 'At least one number'
      ],
      valid: false,
      errorMessage: '',
      hasError: false
    }
  },
  methods: {
    ...mapActions('auth', ['register']),
    async registerUser () {
      try {
        const { name, email, password } = this
        await this.register({ name, email, password })
        this.$router.push({ name: 'auth.login' })
      } catch (error) {
        this.errorMessage = error.detail
        this.hasError = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-register {
    vertical-align: middle;
    .title {
      background-color: #00acc1;
      justify-content: center;
      border-bottom: 1px #dddddd solid;
    }
    .content {
      padding: 1em 4em 1em 4em;
    }
  }
</style>

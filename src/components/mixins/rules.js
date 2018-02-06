import { test } from 'ramda'

export const email = {
  data () {
    return {
      emailRegex: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => test(this.emailRegex, v) || 'E-mail must be valid'
      ]
    }
  }
}

export const password = {
  data () {
    return {
      passwordRules: [
        (v) => !!v || 'New password is required',
        (v) => v.length >= 8 || 'Password must has at least 8 digits',
        (v) => test(/^(?=.*[a-z]).+$/, v) || 'At least one character in lower case',
        (v) => test(/^(?=.*[A-Z]).+$/, v) || 'At least one character in upper case',
        (v) => test(/^(?=.*[0-9]).+$/, v) || 'At least one number'
      ]
    }
  }
}

export const amount = {
  data () {
    return {
      amountRegex: /^\$?(?!0\d)(?:\d+|\d{1,3}(?:,\d{1,3})*)(?:\.\d{2})?$/,
      amountRules: [
        (v) => !!v || 'This field can\'t be empty',
        (v) => test(this.amountRegex, v) || 'Incorrect format for money'
      ]
    }
  }
}

export const name = {
  data () {
    return {
      nameRules: [
        (v) => !!v || 'Name is required'
      ]
    }
  }
}

import { when, equals } from 'ramda'

export default {
  props: {
    visibility: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      actualVisibility: this.visibility
    }
  },
  methods: {
    close () {
      this.actualVisibity = false
      this.$emit('close')
    }
  },
  watch: {
    actualVisibility (val) {
      const isClose = when(
        equals(false),
        this.close
      )
      isClose(val)
    }
  }
}

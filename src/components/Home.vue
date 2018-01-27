<<template>
  <div>
    <v-parallax src="/static/img/home-parallax.jpg">
      <v-layout row>
        <v-flex offset-xs6 offset-lg10 xs3>
          <v-btn 
            flat 
            color="grey lighten-3"
            :to="{ name: 'auth.login' }"
          >
            LOGIN
          </v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn 
            flat 
            color="grey lighten-3"
            :to="{ name: 'auth.register' }"     
          >
            REGISTER
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout column align-center justify-center>
        <h1 class="white--text">Finance app</h1>
      </v-layout>
    </v-parallax>
  
    <v-layout column wrap class="my-5" align-center>
      <v-flex xs12 sm4 class="my-3">
        <div class="text-xs-center">
          <h2 class="headline">The best way to control your finance</h2>
        </div>
      </v-flex>
    </v-layout>
  
    <v-layout row wrap >
      <v-flex 
        offset-xs1 xs10 
        offset-md2 md4
      >
        <v-card class="elevation-0 transparent">
          <v-card-text class="text-xs-center">
            <v-icon x-large color="teal darken-2" >trending_up</v-icon>
          </v-card-text>
          <v-card-title primary-title class="layout justify-center">
            <div class="headline">Simple and intuitive</div>
          </v-card-title>
          <v-card-text>
            {{ text }}
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex 
        offset-xs1 xs10 
        offset-md0 md4
      >
        <v-card class="elevation-0 transparent">
          <v-card-text class="text-xs-center">
            <v-icon x-large color="teal darken-2">build</v-icon>
          </v-card-text>
          <v-card-title primary-title class="layout justify-center">
            <div class="headline">Completely Open Sourced</div>
          </v-card-title>
          <v-card-text>
            {{ text }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
'use strict'

export default {
  data () {
    return {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dapibus nunc ut felis volutpat porta nec at nunc. Vivamus tellus leo, tempor sit amet tincidunt eleifend, commodo sed libero. Sed vulputate non dui sit amet viverra. Cras ornare mi eu diam gravida, laoreet laoreet erat feugiat. Ut erat neque, finibus ac quam vitae, pulvinar dictum lectus.'
    }
  }
}
</script>

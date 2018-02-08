
<template>
  <v-app light id="app">
    <app-drawer></app-drawer>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppDrawer from './components/NavigationDrawer.vue'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    'app-drawer': AppDrawer,
    'app-footer': Footer
  }
}
</script>


<template>
  <v-app light id="app">
    <app-drawer></app-drawer>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppDrawer from './components/NavigationDrawer.vue'
export default {
  name: 'App',
  components: {
    'app-drawer': AppDrawer
  }
}
</script>

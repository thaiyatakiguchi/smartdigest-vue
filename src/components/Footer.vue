<template>
  <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div class="mr-3">© {{ items.text }} </div>
    <div> {{ items.date }}</div>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    items: {
      text: 'Powered by ISL. ',
      date: new Date().getFullYear()
    }
  })
}
</script>

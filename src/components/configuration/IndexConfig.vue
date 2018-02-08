<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12 >
        <v-card class="elevation-4">
          <v-card-text>
            <v-toolbar color="white" flat>
              <v-icon>fa-search</v-icon>
              <v-toolbar-title class="grey--text text--darken-4">Search Instant</v-toolbar-title>
            </v-toolbar>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
              label="Find Instant"
              v-model="inputKeyword"
              :counter="50"
              ></v-text-field>

              <v-btn
              type="submit"
              color="primary"
              :loading="loading4"
              @click.native="loader = 'loading4'"
              @click="submit"
              :disabled="loading4"
              >
              Search
              <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
              </v-btn>
              <v-btn @click="clear">clear</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
    </v-flex>
    <v-flex xs8 sm8 md8>
      <v-card class="mt-3">
        <v-card-text>
          <v-data-table
          v-bind:headers="headers"
          :items="items"
          class="elevation-1"
          >
            <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                  <span slot="activator">
                  {{ props.header.text }}
                  </span>
                  <span>
                  {{ props.header.text }}
                  </span>
              </v-tooltip>
            </template>
            <template slot="items" slot-scope="props">
              <td class="text-xs-right">{{ props.item.domain }}</td>
              <td class="text-xs-right">{{ props.item.keyword }}</td>
              <td class="text-xs-right">{{ props.item.frequency }}</td>
              <td class="text-xs-right"><v-btn>More</v-btn></td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    loader: null,
    loading: false,
    loading4: false,
    inputKeyword: '',
    headers: [
      { text: 'Instant Name', value: 'instant' },
      { text: 'Domain', value: 'domain' },
      { text: 'Action', value: 'action' }
    ],
    items: []
  })
}
</script>

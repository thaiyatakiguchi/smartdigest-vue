<template>
    <v-layout row wrap>
        <v-flex xs12 sm12 md12 >
            <v-card class="elevation-4">
              <v-card-text>
                <v-toolbar color="white" flat>
                  <v-icon>fa-book</v-icon>
                  <v-toolbar-title class="grey--text text--darken-4">Form</v-toolbar-title>
                </v-toolbar>
                <hr>
                <v-form v-model="valid" ref="form" lazy-validation>
                    <v-text-field
                    label="See how often you have been mentioned"
                    v-model="inputKeyword"
                    :rules="keywordRules"
                    :counter="50"
                    required
                    ></v-text-field>

                    <v-btn
                    type="submit"
                    color="primary"
                    :loading="loading4"
                    @click.native="loader = 'loading4'"
                    @click="submit"
                    :disabled="!valid, loading4"
                    >
                    submit
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
                <v-toolbar color="white" flat>
                  <v-icon>fa-chart-area</v-icon>
                  <v-toolbar-title class="grey--text text--darken-4">Frequency Line Chart</v-toolbar-title>
                </v-toolbar>
                <hr>
                <line-chart :options="{responsive: false, maintainAspectRatio: false}" :width="400" :height="200" :chart-data="dataCollection"></line-chart>
              </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-card class="ml-3 mt-3">
              <v-card-text>
                <v-toolbar color="white" flat>
                  <v-icon>fa-chart-pie</v-icon>
                  <v-toolbar-title class="grey--text text--darken-4">Frequency Pie Chart</v-toolbar-title>
                </v-toolbar>
                <v-card>
                  <v-card-text>
                    <doughnut-chart  :chart-data="doughnutCollection"></doughnut-chart>
                  </v-card-text>
                </v-card>
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
import FrequencyService from '../services/FrequencyService'
import Chart from './LineChart'
import Doughnut from './DoughnutChart'

export default {
  components: {
    'line-chart': Chart,
    'doughnut-chart': Doughnut
  },
  data: () => ({
    valid: true,
    loader: null,
    loading: false,
    loading4: false,
    inputKeyword: '',
    keywordRules: [
      (v) => !!v || 'Keyword is required',
      (v) => (v && v.length <= 50) || 'Name must be less than 50 characters'
    ],
    headers: [
      { text: 'Domain', value: 'domain' },
      { text: 'Keyword', value: 'keyword' },
      { text: 'Frequency', value: 'frequency' },
      { text: 'Action', value: 'action' }
    ],
    items: [],
    dataCollection: {},
    doughnutCollection: {
      labels: [],
      datasets: [{
        backgroundColor: [],
        data: []
      }]
    }
  }),
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 2000)

      this.loader = null
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
      // Native form submission is not yet supported
        FrequencyService.getFrequency(this.inputKeyword).then(response => {
          // this.items = []
          var dates = response.date
          dates.forEach((date, idx) => {
            var obj = {
              domain: response.domain[date],
              date: date,
              keyword: response.your_keyword,
              frequency: response.frequency[idx]
            }
            this.items.push(obj)
            console.log(date, idx)
          })
          this.dataCollection = {
            labels: dates,
            datasets: [{
              label: response.domain,
              backgroundColor: '#17b5d6',
              data: response.frequency
            },
            {
              label: response.domain,
              backgroundColor: '#3d9a73',
              data: ['13', '20', '2', '10', '12']
            }]
          }
          // this is just for old database
          var total = 0
          for (var n = 0; n < response.frequency.length; n++) {
            total += response.frequency[n] << 0
          }
          this.doughnutCollection = {
            labels: response.domain,
            datasets: [{
              backgroundColor: ['#17b5d6', '#3d9a73', '#be594c', '#834e9c'],
              data: [total]
            }]
          }
          console.log('this is labels data: ', this.dataCollection)
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

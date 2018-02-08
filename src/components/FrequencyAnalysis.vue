<template>
    <v-layout row wrap>
        <v-flex xs12 sm12 md12 >
            <v-card>
                <v-card-text>
                    <v-form v-model="valid" ref="form" lazy-validation>
                        <v-text-field
                        label="See how often you have been mentioned"
                        v-model="inputKeyword"
                        :rules="keywordRules"
                        :counter="50"
                        required
                        ></v-text-field>

                        <v-btn
                        @click="submit"
                        :disabled="!valid"
                        >
                        submit
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
                            <td class="text-xs-right">{{ props.item.date }}</td>
                            <td class="text-xs-right">{{ props.item.keyword }}</td>
                            <td class="text-xs-right">{{ props.item.frequency }}</td>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs4 sm4 md4>
            <v-card class="ml-3 mt-3">
                <v-card-text>
                    <line-chart :chart-data="dataCollection"></line-chart>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import FrequencyService from '../services/FrequencyService'
import Chart from './Chartjs'

export default {
  components: {
    'line-chart': Chart
  },
  data: () => ({
    valid: true,
    inputKeyword: '',
    keywordRules: [
      (v) => !!v || 'Keyword is required',
      (v) => (v && v.length <= 50) || 'Name must be less than 50 characters'
    ],
    headers: [
      { text: 'Domain', value: 'domain' },
      { text: 'Keyword', value: 'keyword' },
      { text: 'Action', value: 'action' }
    ],
    items: [],
    dataCollection: {
      labels: [],
      datasets: [{
        label: 'Frequency Analysis',
        backgroundColor: '#f87979',
        data: []
      }]
    }
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
      // Native form submission is not yet supported
        FrequencyService.getFrequency(this.inputKeyword).then(response => {
          // this.items = []
          var dates = response.date
          dates.forEach((date, idx) => {
            var obj = {
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
              label: 'Frequency',
              backgroundColor: '#f87979',
              data: response.frequency
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

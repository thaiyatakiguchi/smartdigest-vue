
<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  name: 'DoughnutChart',
  mixins: [reactiveProp],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData)
  }
}
</script>

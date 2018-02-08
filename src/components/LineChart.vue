
<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  name: 'LineChart',
  mixins: [reactiveProp],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData)
  }
}
</script>

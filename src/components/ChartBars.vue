<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.renderChart(
      {
        labels: this.team.players.map(player => player.name),
        datasets: [
          {
            label: "Victories",
            backgroundColor: "#ec8506",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>

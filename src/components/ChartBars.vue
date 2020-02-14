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
        labels: this.getPlayers(),
        datasets: [
          {
            label: "Victories",
            backgroundColor: "#ec8506",
            data: this.cookData()
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
  methods: {
    cookData() {
      const players = this.getPlayers();
      const rounds = this.team.rounds;
      const data = players.map(player => {
        let playerRes = 0;
        let formattedPlayer = player.toLowerCase();
        Object.keys(rounds).forEach(round => {
          if (rounds[round][formattedPlayer]) {
            playerRes++;
          }
        });
        return playerRes;
      });

      let top = Math.round(Math.max.apply(null, data) + 10 / 10);
      return [...data, 0, top];
    },
    getPlayers() {
      return this.team.players.map(player => player.name);
    }
  }
};
</script>


<style scoped lang="scss">
canvas#bar-chart {
  background-color: $light-grey;
}
</style>
<script>
import { mapGetters } from "vuex";
import { VIcon } from "vuetify/lib";

export default {
  computed: {
    ...mapGetters(["backTitle"])
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  },
  render(h) {
    return h(
      "div",
      {
        class: "d-flex align-center go-back",
        on: {
          click: this.goBack
        }
      },
      [
        h(
          VIcon,
          {
            attrs: {
              name: "v-icon"
            },
            class: "mr-2",
            props: {
              color: "secondary",
              dark: true
            }
          },
          "mdi-arrow-left"
        ),
        this.backTitle
          ? h(
              "span",
              {
                class: [
                  "header-title",
                  { truncate: this.$vuetify.breakpoint.xsOnly }
                ]
              },
              this.backTitle
            )
          : ""
      ]
    );
  }
};
</script>

<style scoped lang="scss">
.go-back {
  cursor: pointer;
}
</style>
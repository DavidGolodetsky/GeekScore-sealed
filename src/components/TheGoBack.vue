<script>
import { VIcon } from "vuetify/lib";

export default {
  functional: true,
  props: {
    title: String
  },
  render(h, ctx) {
    const title = ctx.props.title;
    const media = ctx.parent.$vuetify.breakpoint.xsOnly;
    return h(
      "div",
      {
        class: "d-flex align-center go-back",
        on: {
          click: () => this.$router.go(-1)
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
        title
          ? h(
              "span",
              {
                class: ["header-title", { truncate: media }]
              },
              title
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
import { ButtonStylesParams, MantineThemeOverride } from "@mantine/core";

const themeExample: MantineThemeOverride = {
  colorScheme: "dark",
  colors: {
    brandGreen: [
      "#e4fcf7",
      "#c1f0e7",
      "#9ce5d7",
      "#76dbc8",
      "#54d1b8",
      "#3db89e",
      "#2e8f7b",
      "#206658",
      "#0f3e35",
      "#001612",
    ],
    brandMango: [
      "#fffedb",
      "#fef4af",
      "#fce880",
      "#fad94f",
      "#f9c720",
      "#dfa706",
      "#ae8d01",
      "#7c6d00",
      "#4b4700",
      "#1c1a00",
    ],
  },
  primaryColor: "brandMango",
  primaryShade: 5,
  globalStyles: (theme) => ({
    body: {
      backgroundColor: theme.colorScheme === "dark" ? "black" : "white",
    },
  }),
  components: {
    Button: {
      styles: (theme, params: ButtonStylesParams) => ({
        root: {
          backgroundColor:
            params.variant === "filled"
              ? theme.colors[params.color || theme.primaryColor][7]
              : undefined,
        },
        custom: {},
      }),
    },
  },
};

export default themeExample;

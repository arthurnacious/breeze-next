import { ButtonStylesParams, MantineThemeOverride } from "@mantine/core";

const globalTheme: MantineThemeOverride = {
  colorScheme: "light",
  primaryColor: "yellow",
  primaryShade: { light: 6, dark: 4 },
  fontFamily: "Open Sans",
  headings: {
    fontFamily: "Raleway",
  },
  components: {
    Button: {
      styles: (theme, params: ButtonStylesParams) => ({
        root: {
          color:
            params.variant === "filled" && theme.colorScheme == "dark"
              ? theme.fn.darken(theme.fn.primaryColor(), 0.6)
              : undefined,
          "&:hover": {
            backgroundColor:
              params.variant === "subtle" && theme.colorScheme === "dark"
                ? theme.fn.darken(theme.fn.primaryColor(), 0.35)
                : undefined,
            color:
              params.variant === "subtle" && theme.colorScheme === "dark"
                ? theme.colors.gray[0]
                : undefined,
          },
        },
      }),
    },
  },
};

export default globalTheme;

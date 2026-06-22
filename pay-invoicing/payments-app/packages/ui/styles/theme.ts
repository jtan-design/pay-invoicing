import { createTheme } from "@mui/material/styles";
import type { TypeText, TypeBackground } from "@mui/material/styles";

export type Spacing = "lg" | "md" | "sm" | "xs";

export const SpacingMap: ReadonlyMap<Spacing, number> = new Map([
  ["lg", 40],
  ["md", 32],
  ["sm", 24],
  ["xs", 16],
]);

interface GetSpacingConfig {
  defaultSpacing: number;
}

interface TextColors extends TypeText {
  dark: string;
  contrastText: string;
}

interface BackgroundColors extends TypeBackground {
  background: string;
  paper: string;
  default: string;
  linearGradient: string;
}

// Extend MUI theme interfaces
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxs: true;
    tablet: true;
  }

  interface PaletteColor {
    shade4p?: string;
    shade8p?: string;
    shade12p?: string;
    shade20p?: string;
    shade30p?: string;
    shade30pRipple?: string;
    shade50p?: string;
    shade70p?: string;
    shade160p?: string;
    shade190p?: string;
  }

  interface SimplePaletteColorOptions {
    shade4p?: string;
    shade8p?: string;
    shade12p?: string;
    shade20p?: string;
    shade30p?: string;
    shade30pRipple?: string;
    shade50p?: string;
    shade70p?: string;
    shade160p?: string;
    shade190p?: string;
  }

  interface Palette {
    misc: {
      divider: string;
      outlineBorder: string;
      standardInputLine: string;
      backdropOverlay: string;
      ratingActive: string;
      snackbarBackground: string;
    };
    fill: {
      blue: string;
      grey: string;
      green: string;
      yellow: string;
      contrastText: string;
      red: string;
    };
  }

  interface PaletteOptions {
    misc?: {
      divider?: string;
      outlineBorder?: string;
      standardInputLine?: string;
      backdropOverlay?: string;
      ratingActive?: string;
      snackbarBackground?: string;
    };
    fill?: {
      blue?: string;
      grey?: string;
      green?: string;
      yellow?: string;
      contrastText?: string;
      red?: string;
    };
  }

  interface PaperPropsVariantOverrides {
    shadowSlight: true;
    shadowMedium: true;
    shadowStrong: true;
  }

  interface TypeAction {
    shade54p?: string;
  }

  interface TypographyVariants {
    link: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    link?: React.CSSProperties;
  }

  // eslint-disable-next-line no-unused-vars
  interface Components {
    MuiDataGrid?: {
      styleOverrides?: {
        row?: {
          "&.Mui-selected"?: {
            backgroundColor?: string;
          };
        };
      };
    };
    ToggleChip?: {
      defaultProps?: Record<string, any>;
      styleOverrides?: Record<string, any>;
      variants?: Record<string, any>;
    };
  }
}

/**
 * Get the spacing in pixels for a given spacing preset
 * @param {Spacing|number} spacing - Spacing preset or the number of pixels
 * @param {GetSpacingConfig} [config.defaultSpacing=40] - Default spacing is set to 40px
 * @returns {string} The pixel string value
 */
export const getSpacing = (
  spacing: Spacing | number,
  config: GetSpacingConfig = { defaultSpacing: 40 }
): string => {
  if (typeof spacing === "number") {
    return spacing + "px";
  }
  const spacingVal = SpacingMap.get(spacing);
  return (spacingVal || config.defaultSpacing) + "px";
};

export const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0,
      xs: 375,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      tablet: 760,
    },
  },
  palette: {
    primary: {
      light: "#6E93E2",
      main: "#3866B0",
      dark: "#003C80",
      shade4p: "#F9FBFE",
      shade8p: "#F3F6FD",
      shade12p: "#EEF2FC",
      shade20p: "#E2E9F9",
      shade30p: "#D3DFF6",
      shade30pRipple: "#D3DFF6",
      shade50p: "#B7C9F0",
      shade70p: "#9AB3EB",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00375F",
      dark: "#001135",
      light: "#3C618D",
      shade4p: "#F7F9FA",
      shade8p: "#EFF2F6",
      shade12p: "#E8ECF1",
      shade20p: "#D8DFE8",
      shade30p: "#C5D0DD",
      shade30pRipple: "#C5D0DD",
      shade50p: "#9DB0C6",
      shade70p: "#7790AF",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#D03643",
      dark: "#98001C",
      light: "#FD5C69",
      shade4p: "#FDF7F7",
      shade12p: "#F9E7E8",
      shade30p: "#F1C3C7",
      shade30pRipple: "#F1C3C7",
      shade50p: "#E79BA1",
      shade160p: "#53171C",
      shade190p: "#FAEBEC",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFA117",
      dark: "#9C5E09",
      light: "#FFC46F",
      shade4p: "#FFFBF6",
      shade12p: "#FFF4E3",
      shade30p: "#FFE3B9",
      shade30pRipple: "#FFE3B9",
      shade50p: "#FFD08B",
      shade160p: "#664009",
      shade190p: "#FFF6E8",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#3A81F4",
      dark: "#285AAA",
      light: "#619AF6",
      shade4p: "#F7FAFF",
      shade12p: "#E7F0FE",
      shade30p: "#C4D9FC",
      shade30pRipple: "#C4D9FC",
      shade50p: "#9CC0F9",
      shade160p: "#173462",
      shade190p: "#EBF2FE",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#30D891",
      dark: "#0D7E51",
      light: "#62ECB2",
      shade4p: "#F7FDFB",
      shade12p: "#E6FAF2",
      shade30p: "#C1F3DE",
      shade30pRipple: "#C1F3DE",
      shade50p: "#97EBC8",
      shade160p: "#13563B",
      shade190p: "#EAFBF4",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FCFCFC",
      paper: "#FFFFFF",
      linearGradient:
        "linear-gradient(258deg, rgba(48,103,202,1) 0%, rgba(46,62,127,1) 100%)",
    } as BackgroundColors,
    misc: {
      divider: "#E0E0E0",
      outlineBorder: "#C4C4C4",
      standardInputLine: "#949494",
      backdropOverlay: "#808080",
      ratingActive: "#FFB400",
      snackbarBackground: "#323232",
    },
    fill: {
      blue: "#F0F6FF",
      grey: "#F4F4F5",
      green: "#EDF6F6",
      yellow: "#FFF5E3",
      contrastText: "#283E48",
      red: "#FDF7F7",
    },
    text: {
      primary: "#283E48",
      secondary: "#526973",
      dark: "#001821",
      disabled: "#BDBDBD",
    } as TextColors,
    action: {
      active: "#757575",
      hover: "#F5F5F5",
      selected: "#EBEBEB",
      disabled: "#BDBDBD",
      disabledBackground: "#E0E0E0",
      focus: "#E0E0E0",
      shade54p: "#707070",
    },
  },
  typography: {
    fontFamily: '"Pay", "Helvetica Neue", Helvetica, Arial, sans-serif',
    link: {
      textDecoration: "none",
      color: "#3866B0",
      cursor: "pointer",
    },
    h1: {
      fontFamily: "inherit",
      fontSize: "34px",
      fontWeight: 700,
      lineHeight: "120%",
      letterSpacing: "0.2px",
      "@media (max-width: 600px)": {
        fontSize: "24px",
      },
    },
    h2: {
      fontFamily: "inherit",
      fontSize: "28px",
      fontWeight: 700,
      lineHeight: "120%",
      letterSpacing: "0.2px",
      "@media (max-width: 600px)": {
        fontSize: "22px",
      },
    },
    h3: {
      fontFamily: "inherit",
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "120%",
      letterSpacing: "0.2px",
      "@media (max-width: 600px)": {
        fontSize: "20px",
      },
    },
    h4: {
      fontFamily: "inherit",
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: "120%",
      letterSpacing: "0.2px",
    },
    h5: {
      fontFamily: "inherit",
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "120%",
      letterSpacing: "0.3px",
    },
    h6: {
      fontFamily: "inherit",
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "120%",
      letterSpacing: "0.3px",
    },
    body1: {
      fontFamily: "inherit",
      fontSize: "16px",
      lineHeight: "160%",
      letterSpacing: "0px",
    },
    body2: {
      fontFamily: "inherit",
      fontSize: "14px",
      lineHeight: "160%",
      letterSpacing: "0px",
    },
    subtitle1: {
      fontFamily: "inherit",
      fontSize: "16px",
      lineHeight: "175%",
      letterSpacing: "0.5px",
    },
    subtitle2: {
      fontFamily: "inherit",
      fontSize: "14px",
      lineHeight: "160%",
      letterSpacing: "0.2px",
    },
    overline: {
      fontFamily: "inherit",
      fontSize: "12px",
      lineHeight: "266%",
      letterSpacing: "1px",
    },
    caption: {
      fontFamily: "inherit",
      fontSize: "12px",
      lineHeight: "166%",
      letterSpacing: "0.4px",
    },
  },
  components: {
    // Global font inheritance for all MUI components
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Europa';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Europa-Regular'), local('Europa'), 
               local('Helvetica Neue'), local('Helvetica');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Europa';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('Europa-Bold'), local('Europa Bold'), 
               local('Helvetica Neue Bold'), local('Helvetica-Bold');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        * {
          font-family: "Europa", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
        }
        body {
          background-color: #fcfcfc;
          font-family: "Europa", "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        .MuiTypography-root {
          font-family: "Europa", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
        }
        .MuiButton-root {
          font-family: "Europa", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
        }
        .MuiCardContent-root {
          font-family: "Europa", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
        }
        .MuiAccordionSummary-root {
          font-family: "Europa", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
        }
        .MuiAccordionDetails-root {
          font-family: "Europa", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
        }
      `,
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          gap: 5,
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "6px",
            height: "56px",
            borderWidth: "1px !important",
          },
          "& .MuiFormHelperText-root": {
            marginLeft: 0,
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        rounded: {
          borderRadius: "6px",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        row: {
          "&.Mui-selected": {
            backgroundColor: "#F9FBFE",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          boxShadow:
            "0px 1px 3px 1px rgba(0, 0, 0, 0.05), 0px 1px 3px 0px rgba(0, 0, 0, 0.03)",

          "& .MuiAlert-message": {
            width: "100%",
          },
        },
        outlinedSuccess: {
          background:
            "linear-gradient(0deg, #F7FDFB, #F7FDFB), linear-gradient(0deg, #97EBC8, #97EBC8)",
          border: "1px solid rgb(151, 235, 200)",
          color: "#0D7E51",
        },
        outlinedInfo: {
          background:
            "linear-gradient(0deg, #F7FAFF, #F7FAFF), linear-gradient(0deg, #9CC0F9, #9CC0F9)",
          border: "1px solid rgb(156, 192, 249)",
          color: "#285AAA",
        },
        outlinedWarning: {
          background:
            " linear-gradient(0deg, #FFFBF6, #FFFBF6), linear-gradient(0deg, #FFD08B, #FFD08B)",
          border: "1px solid rgba(255, 208, 139, 1)",
          color: "#9C5E09",
        },
        outlinedError: {
          background:
            "linear-gradient(0deg, #FDF7F7, #FDF7F7),linear-gradient(0deg, #E79BA1, #E79BA1)",
          border: "1px solid rgba(231, 155, 161, 1)",
          color: "#D03643",
        },
      },
    },
    MuiRadio: {
      variants: [
        {
          props: { size: "small" },
          style: {
            padding: "9px",
            lineHeight: "160%",
            alignItems: "center",
            display: "flex",
            gap: 8,
            height: "24px",
            width: "24px",
          },
        },
        {
          props: { size: "medium" },
          style: {
            svg: {
              fontSize: "1.75rem",
            },
          },
        },
      ],
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          height: "24px",
          width: "24px",
          "&.Mui-disabled": {
            color: "action.disabled",
          },
        },
      },
      variants: [
        {
          props: { size: "small" },
          style: {
            height: "24px",
            width: "24px",
          },
        },
      ],
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
          gap: 4,
          color: "text.primary.light",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          lineHeight: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        },
      },
    },
    MuiSvgIcon: {
      variants: [
        {
          props: { fontSize: "small" },
          style: {
            fontSize: "1.2rem",
          },
        },
      ],
    },
  },
});

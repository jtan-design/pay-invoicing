import { Box, Typography, Divider as MuiDivider } from "@mui/material";
import { Button } from "../atoms/button";
import { Card, CardContent } from "../atoms/card";
import { useTheme } from "@mui/material/styles";
import { formatRawNumberToK } from "../../../lib/format-numbers/formatNumbers";

const PointsActivity = () => {
  const theme = useTheme();
  const commonFontSx = (fontKey: string, color?: string) => ({
    fontFamily: `var(--${fontKey}-font-family)`,
    fontSize: `var(--${fontKey}-font-size)`,
    fontWeight: `var(--${fontKey}-font-weight)`,
    letterSpacing: `var(--${fontKey}-letter-spacing)`,
    lineHeight: `var(--${fontKey}-line-height)`,
    fontStyle: `var(--${fontKey}-font-style)`,
    color: color
      ? color.startsWith("#") || color.startsWith("rgba")
        ? color
        : `var(--${color})`
      : undefined,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "flex-start",
        gap: theme.spacing(2),
        alignSelf: "stretch",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={commonFontSx("desktop-h4", "#283e48")}
        >
          Points activity
        </Typography>
        <Button
          variant="ghost"
          sx={{
            fontFamily: "'Europa-Bold', Helvetica",
            fontWeight: "bold",
            color: "#3866b0",
            fontSize: "0.875rem",
            letterSpacing: "0.50px",
            lineHeight: "1.5rem",
            padding: 0,
          }}
        >
          See all
        </Button>
      </Box>

      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: theme.spacing(2),
          padding: theme.spacing(2),
          flexGrow: 1,
          width: "100%",
          backgroundColor: "var(--commonwhite-10-0p)",
          borderRadius: "6px",
          border: "1px solid var(--lightotherdivider)",
          boxShadow: "none",
        }}
      >
        <CardContent
          sx={{
            padding: "0",
            width: "100%",
          }}
        >
          <Typography sx={commonFontSx("components-helper-text", "#526973")}>
            Last 30 days
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: theme.spacing(2),
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: theme.spacing(1),
              }}
            >
              <Typography
                sx={commonFontSx("components-input-text-new", "#526973")}
              >
                Earned
              </Typography>
              <Typography sx={commonFontSx("desktop-h2", "#283e48")}>
                {formatRawNumberToK(300000)}
              </Typography>
            </Box>

            <MuiDivider
              orientation="vertical"
              flexItem
              sx={{
                height: "auto",
                marginX: theme.spacing(2),
                backgroundColor: "rgba(0,0,0,0.12)",
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: theme.spacing(1),
              }}
            >
              <Typography
                sx={{
                  ...commonFontSx("components-input-text-new", "#526973"),
                  textAlign: "right",
                }}
              >
                Redeemed
              </Typography>
              <Typography
                sx={{
                  ...commonFontSx("desktop-h2", "#283e48"),
                  textAlign: "right",
                }}
              >
                {formatRawNumberToK(45208)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PointsActivity;

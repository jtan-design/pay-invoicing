import { Box, Typography } from "@mui/material";

export const ReadOnly = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 0.5,
      }}
    >
      <Typography
        variant="body2"
        color={"text.secondary"}
        sx={{
          width: { xs: "100%", md: "100%" },
        }}
        mb={0.5}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        fontWeight="700"
        sx={{
          width: { xs: "100%", md: "100%" },
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

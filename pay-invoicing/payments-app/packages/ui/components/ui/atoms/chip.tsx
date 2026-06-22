import {
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import type { StackProps } from "@mui/material";
import { useChipsFilter } from "../../../hooks/useChipsFilter";

interface ChipsFilterProps {
  options: Record<string, { label: string; icon?: React.ReactElement }>;
  rootProps?: StackProps;
}

export const ChipsFilter = <K extends string>({
  options,
  rootProps = {},
}: ChipsFilterProps) => {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));
  const firstKey = Object.keys(options)[0] as K;
  const { selectedChip, handleChipSelect } = useChipsFilter(firstKey);

  return (
    <Stack
      direction="row"
      flexWrap="nowrap"
      overflow="auto"
      gap={1.5}
      sx={{ ...rootProps.sx, whiteSpace: "nowrap" }}
    >
      {Object.entries(options).map(([key, value]) => {
        const { label, icon } = value;
        const typedKey = key as K;
        const isSelected =
          selectedChip && selectedChip.toLowerCase() === key.toLowerCase();

        return (
          <Chip
            variant="outlined"
            key={key}
            sx={{
              px: downSm ? 0.25 : 0.5,
              fontSize: downSm ? "12px" : "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
              borderColor: "primary.main",
              color: isSelected ? "white" : "primary.main",
              backgroundColor: isSelected ? "primary.main" : "white",
              border: `1px solid ${theme.palette.primary.main}`,
              "&&:hover": {
                backgroundColor: isSelected
                  ? "primary.dark"
                  : "primary.shade12p",
                border: `1px solid ${theme.palette.primary.dark}`,
              },
              "& .MuiChip-icon": {
                color: isSelected
                  ? theme.palette.common.white
                  : theme.palette.primary.main,
                fontSize: downSm ? "16px" : "18px",
              },
            }}
            label={label}
            {...(icon && { icon })}
            onClick={() => handleChipSelect(typedKey)}
          />
        );
      })}
    </Stack>
  );
};

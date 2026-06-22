import { Box, useTheme } from "@mui/material";

interface RewardsIconProps {
  height: number;
  width: number;
  color?: string;
  isActive?: boolean;
}

export const RewardsIcon = ({ height, width, color, isActive }: RewardsIconProps) => {
  const theme = useTheme();

  // Determine which icon to use based on isActive prop or color fallback
  const shouldShowActive = isActive || 
    color === theme.palette.primary.contrastText || 
    color === "white";
    
  const iconSrc = shouldShowActive
    ? "/icons/rewards/icon-rewards.svg"
    : "/icons/rewards/icon-earn-rewards-secondary.svg";

  return (
    <Box
      component="img"
      src={iconSrc}
      alt="Rewards"
      sx={{
        width: width,
        height: height,
        objectFit: "contain",
      }}
    />
  );
};

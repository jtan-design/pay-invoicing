import { Box, useTheme } from "@mui/material";

interface HotelIconProps {
  height: number;
  width: number;
  color?: string;
  isActive?: boolean;
}

export const HotelIcon = ({ height, width, color, isActive }: HotelIconProps) => {
  const theme = useTheme();

  // Determine which icon to use based on isActive prop or color fallback
  const shouldShowActive = isActive || 
    color === theme.palette.primary.contrastText || 
    color === "white";
    
  const iconSrc = shouldShowActive
    ? "/icons/hotel/icon-hotel.svg"
    : "/icons/hotel/icon-hotel-secondary.svg";

  return (
    <Box
      component="img"
      src={iconSrc}
      alt="Hotel"
      sx={{
        width: width,
        height: height,
        objectFit: "contain",
      }}
    />
  );
};

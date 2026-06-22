
import { useTheme } from "@mui/material/styles";
import { cloneElement } from "react";
import { Tab } from "@mui/material";
import { Box } from "@mui/material";

interface TabButtonProps {
  label: string;
  value: number;
  isActive: boolean;
  icon: React.ReactElement;
  onClick: (value: number) => void;
}

export const TabButton = ({
  label,
  value,
  isActive,
  icon,
  onClick,
}: TabButtonProps) => {
  const theme = useTheme();

  const handleClick = () => {
    onClick(value);
  };

  // Clone the icon and pass the appropriate color
  const iconWithColor = cloneElement(icon as React.ReactElement<any>, {
    color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
  });

  return (
    <Tab
      onClick={handleClick}
      label={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {iconWithColor}
          {label}
        </Box>
      }
      sx={{
        width: "100%",
        height: "100%",
        textTransform: "none",
      }}
    />
  );
};

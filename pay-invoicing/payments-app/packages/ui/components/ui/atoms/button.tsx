import {
  Button as MuiButton,
  useTheme,
} from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";
import * as React from "react";

type CustomButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type CustomButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends Omit<MuiButtonProps, "variant" | "size"> {
  variant?: CustomButtonVariant;
  size?: CustomButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", sx, ...props }, ref) => {
    const theme = useTheme();
    const { color: _color, ...body1Typography } = theme.typography.body1;
    const getMuiVariant = (
      variant: CustomButtonVariant,
    ): MuiButtonProps["variant"] => {
      switch (variant) {
        case "default":
        case "destructive":
        case "secondary":
          return "contained";
        case "outline":
          return "outlined";
        case "ghost":
        case "link":
          return "text";
        default:
          return "contained";
      }
    };

    const getMuiColor = (
      variant: CustomButtonVariant,
    ): MuiButtonProps["color"] => {
      switch (variant) {
        case "default":
          return "primary";
        case "destructive":
          return "error";
        case "secondary":
          return "secondary";
        default:
          return "inherit";
      }
    };

    const getMuiSize = (size: CustomButtonSize): MuiButtonProps["size"] => {
      switch (size) {
        case "sm":
          return "small";
        case "lg":
          return "large";
        case "default":
        case "icon":
        default:
          return "medium";
      }
    };

    const muiVariant = getMuiVariant(variant);
    const muiColor = getMuiColor(variant);
    const muiSize = getMuiSize(size);

    const iconStyles =
      size === "icon"
        ? {
          minWidth: "auto",
          width: "2.25rem", // w-9
          height: "2.25rem", // h-9
          padding: 0,
        }
        : {};

    const linkStyles =
      variant === "link"
        ? {
          textUnderlineOffset: "4px",
          "&:hover": {
            textDecoration: "underline",
          },
        }
        : {};

    const ghostStyles =
      variant === "ghost"
        ? {
          color: "primary.main",
        }
        : {};

    return (
      <MuiButton
        ref={ref}
        variant={muiVariant}
        color={muiColor}
        size={muiSize}
        sx={{
          ...body1Typography,
          ...iconStyles,
          ...linkStyles,
          ...ghostStyles,
          ...sx,
          fontWeight: 700,
          textTransform: "none",
          borderRadius: "6px",
        }}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };

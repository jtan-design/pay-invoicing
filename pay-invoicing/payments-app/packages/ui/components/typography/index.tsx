import { useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

type TypographyProps = {
  children: React.ReactNode;
  fontBold?: boolean;
  alignText?: "left" | "center" | "right";
  fontSecondary?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
};

const H1 = ({
  children,
  fontBold,
  alignText,
  fontSecondary,
  className,
  sx,
}: TypographyProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h1"
      className={className}
      sx={{
        ...(fontBold && { fontWeight: theme.typography.h1.fontWeight }),
        textAlign: alignText,
        color: fontSecondary
          ? theme.palette.text.secondary
          : theme.palette.text.primary,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

const H2 = ({
  children,
  fontBold,
  alignText,
  fontSecondary,
  className,
  sx,
}: TypographyProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h2"
      className={className}
      sx={{
        ...(fontBold && { fontWeight: theme.typography.h2.fontWeight }),
        textAlign: alignText,
        color: fontSecondary
          ? theme.palette.text.secondary
          : theme.palette.text.primary,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

const H3 = ({
  children,
  fontBold,
  alignText,
  fontSecondary,
  className,
  sx,
}: TypographyProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h3"
      className={className}
      sx={{
        ...(fontBold && { fontWeight: theme.typography.h3.fontWeight }),
        textAlign: alignText,
        width: "100%",
        color: fontSecondary
          ? theme.palette.text.secondary
          : theme.palette.text.primary,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

const H4 = ({
  children,
  fontBold,
  alignText,
  fontSecondary,
  className,
  sx,
}: TypographyProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      className={className}
      sx={{
        ...(fontBold && { fontWeight: theme.typography.h4.fontWeight }),
        textAlign: alignText,
        color: fontSecondary
          ? theme.palette.text.secondary
          : theme.palette.text.primary,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

const H5 = ({
  children,
  fontBold,
  alignText,
  fontSecondary,
  className,
  sx,
}: TypographyProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h5"
      className={className}
      sx={{
        ...(fontBold && { fontWeight: theme.typography.h5.fontWeight }),
        textAlign: alignText,
        color: fontSecondary
          ? theme.palette.text.secondary
          : theme.palette.text.primary,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

const Body1 = ({
  children,
  fontBold,
  alignText,
  fontSecondary,
  className,
  sx,
}: TypographyProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="body1"
      className={className}
      sx={{
        ...(fontBold && { fontWeight: 700 }),
        textAlign: alignText,
        color: fontSecondary
          ? theme.palette.text.secondary
          : theme.palette.text.primary,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

const Body2 = ({
  children,
  fontBold,
  alignText,
  fontSecondary,
  className,
  sx,
}: TypographyProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="body2"
      className={className}
      sx={{
        ...(fontBold && { fontWeight: 700 }),
        textAlign: alignText,
        color: fontSecondary
          ? theme.palette.text.secondary
          : theme.palette.text.primary,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

const Caption = ({
  children,
  fontBold,
  alignText,
  fontSecondary,
  className,
  sx,
}: TypographyProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="caption"
      className={className}
      sx={{
        ...(fontBold && { fontWeight: 700 }),
        textAlign: alignText,
        color: fontSecondary
          ? theme.palette.text.secondary
          : theme.palette.text.primary,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export { H1, H2, H3, H4, H5, Body1, Body2, Caption };

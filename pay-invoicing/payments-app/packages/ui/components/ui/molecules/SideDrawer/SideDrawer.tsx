import type { ReactNode } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { SideDrawerModalContainer } from './styles';

export interface SideDrawerModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number | string;
  sx?: SxProps<Theme>;
}

export const SideDrawer = ({
  width = 494,
  open,
  onClose,
  children,
  sx,
  ...rest
}: SideDrawerModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SideDrawerModalContainer
      anchor="right"
      open={open}
      onClose={onClose}
      width={isMobile ? '100%' : width}
      sx={sx}
      {...rest}
    >
      {children}
    </SideDrawerModalContainer>
  );
};